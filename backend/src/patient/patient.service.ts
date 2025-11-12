import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Repository } from 'typeorm';
import { KeycloakAdminService } from 'src/keycloak/keycloak-admin.service';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private readonly keycloakAdmin: KeycloakAdminService,
  ) {}

  async findAll(): Promise<any[]> {
    const patients = await this.patientRepository.find();

    const fullPatient = await Promise.all(
      patients.map(async (p) => {
        try {
          const kcUser = await this.keycloakAdmin.getUserById(p.keycloak_id);
          return {
            ...p,
            firstName: kcUser.firstName,
            lastName: kcUser.lastName,
            email: kcUser.email,
            phoneNumber: kcUser.attributes.phoneNumber[0],
            dateNaissance: kcUser.attributes.dateNaissance[0],
          };
        } catch (err) {
          console.error(`Could not fetch user ${p.keycloak_id}:`, err.message);
          return p;
        }
      }),
    );

    return fullPatient;
  }
}
