import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Medecin } from 'src/medecin/medecin.entity';
import { Patient } from 'src/patient/patient.entity';
import { Receptionniste } from 'src/receptionniste/receptionniste.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ExtraDataInput } from './dto/extra-data-input.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<Patient>,

        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,

        @InjectRepository(Medecin)
        private readonly medecinRepository: Repository<Medecin>,

        @InjectRepository(Receptionniste)
        private readonly receptionnisteRepository: Repository<Receptionniste>,
    ) {}

    async register(
    username: string,
    email: string,
    password: string,
    role: string,
    dateNaissance: string,
    firstName: string,
    lastName: string,
    extraData?: ExtraDataInput,
  ): Promise<string> {
    try {
      // 1️⃣ Obtenir un token admin depuis Keycloak
      const tokenParams = new URLSearchParams();
      tokenParams.append('client_id', 'nest-api');
      tokenParams.append('client_secret', process.env.KEYCLOAK_CLIENT_SECRET || '');
      tokenParams.append('grant_type', 'client_credentials');

      const tokenRes = await axios.post(
        'http://localhost:8080/realms/medFlow/protocol/openid-connect/token',
        tokenParams.toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      );

      const adminToken = tokenRes.data.access_token;

      // 2️⃣ Créer l'utilisateur dans Keycloak
      await axios.post(
        'http://localhost:8080/admin/realms/medFlow/users',
        {
          username,
          email,
          firstName,
          lastName,
          enabled: true,
          credentials: [{ type: 'password', value: password, temporary: false }],
          attributes: { dateNaissance },
        },
        { headers: { Authorization: `Bearer ${adminToken}` } },
      );

      // 3️⃣ Récupérer l’utilisateur Keycloak
      const usersRes = await axios.get(
        `http://localhost:8080/admin/realms/medFlow/users?username=${username}`,
        { headers: { Authorization: `Bearer ${adminToken}` } },
      );
      const userKeycloak = usersRes.data[0];
      const keycloakId = userKeycloak.id;

      // 4️⃣ Attribuer le rôle Keycloak
      const roleRes = await axios.get(
        `http://localhost:8080/admin/realms/medFlow/roles/${role}`,
        { headers: { Authorization: `Bearer ${adminToken}` } },
      );

      await axios.post(
        `http://localhost:8080/admin/realms/medFlow/users/${keycloakId}/role-mappings/realm`,
        [roleRes.data],
        { headers: { Authorization: `Bearer ${adminToken}` } },
      );

      // 5️⃣ Sauvegarde en base locale
      if (role === 'medecin') {
        await this.medecinRepository.save({
            keycloak_id: keycloakId,
            role,
            specialite: extraData?.specialite || '',
            disponibilite: extraData?.disponibilite ?? true,
        });
        } else if (role === 'patient') {
        await this.patientRepository.save({
            keycloak_id: keycloakId,
            role,
            dateNaissance,
            historiqueMedical: extraData?.historiqueMedical || '',
        });
        } else if (role === 'receptionniste') {
        await this.receptionnisteRepository.save({
            keycloak_id: keycloakId,
            role,
            poste: extraData?.poste || '',
            horaires: extraData?.horaires || '',
        });
        }

      return `✅ Utilisateur ${username} créé avec succès et rôle ${role} assigné`;
    } catch (error) {
      console.error('Erreur register:', error.response?.data || error.message);
      throw new Error('❌ Échec de la création de l’utilisateur');
    }
  }
}
