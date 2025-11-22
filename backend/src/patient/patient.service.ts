import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Repository } from 'typeorm';
import { KeycloakAdminService } from 'src/keycloak/keycloak-admin.service';
import { CreatePatientInput } from './dto/patient.input';

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

  async create(input: CreatePatientInput): Promise<Patient> {
    // Create user in Keycloak
    const kcUser = await this.keycloakAdmin.createUser({
      username: input.username,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: input.password,
      role: 'patient',
      attributes: {
        phoneNumber: [input.phoneNumber],
        dateNaissance: [input.dateNaissance],
      },
    });

    // Extract user ID from Keycloak
    const keycloakId = kcUser.id;

    // Create patient in database
    const patient = this.patientRepository.create({
      keycloak_id: keycloakId,
      role: 'patient',
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phoneNumber: input.phoneNumber,
      dateNaissance: input.dateNaissance,
      historiqueMedical: input.historiqueMedical,
      gender: input.gender,
      bloodType: input.bloodType,
      address: input.address,
      emergencyName: input.emergencyName,
      emergencyPhone: input.emergencyPhone,
      allergies: input.allergies,
    });

    return this.patientRepository.save(patient);
  }
}
