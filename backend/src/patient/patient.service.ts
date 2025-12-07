import { Injectable, NotFoundException } from '@nestjs/common';
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
      username: input.username!,
      firstName: input.firstName!,
      lastName: input.lastName!,
      email: input.email!,
      password: input.password!,
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
  async getPatientProfile(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({ where: { id } });

    if (!patient) {
      throw new NotFoundException(`Patient with id ${id} not found`);
    }

    try {
      const kcUser = await this.keycloakAdmin.getUserById(patient.keycloak_id);
      return {
        ...patient,
        firstName: kcUser.firstName,
        lastName: kcUser.lastName,
        email: kcUser.email,
        phoneNumber: kcUser.attributes?.phoneNumber?.[0],
        dateNaissance: kcUser.attributes?.dateNaissance?.[0],
      };
    } catch (err) {
      console.error(
        `Could not fetch Keycloak user ${patient.keycloak_id}:`,
        err.message,
      );
      return patient;
    }
  }

  async update(input: CreatePatientInput): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { id: input.id },
    });

    if (!patient) throw new Error('Patient not found');
    const kcUser = await this.keycloakAdmin.getUserById(patient.keycloak_id);

    const currentKeycloakData = {
      firstName: kcUser.firstName,
      lastName: kcUser.lastName,
      email: kcUser.email,
      phoneNumber: kcUser.attributes?.phoneNumber?.[0],
      dateNaissance: kcUser.attributes?.dateNaissance?.[0],
    };
    // Sync Keycloak profile
    await this.keycloakAdmin.updateUser(patient.keycloak_id, {
      firstName: input.firstName ?? currentKeycloakData.firstName,
      lastName: input.lastName ?? currentKeycloakData.lastName,
      email: input.email ?? currentKeycloakData.email,
      attributes: {
        phoneNumber: input.phoneNumber ?? currentKeycloakData.phoneNumber,
        dateNaissance: input.dateNaissance ?? currentKeycloakData.dateNaissance,
      },
    });

    // Update DB fields
    Object.assign(patient, {
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

  async findById(id: number): Promise<any> {
    const patient = await this.patientRepository.findOne({ where: { id } });

    if (!patient) {
      throw new Error('Patient not found');
    }

    // Fetch user from Keycloak
    const keycloakUser = await this.keycloakAdmin.getUserById(
      patient.keycloak_id,
    );

    const attributes = keycloakUser.attributes || {};

    // Merge DB + Keycloak fields
    return {
      ...patient,

      // Keycloak
      username: keycloakUser.username,
      firstName: keycloakUser.firstName,
      lastName: keycloakUser.lastName,
      email: keycloakUser.email,

      // Custom attributes
      phoneNumber: attributes.phoneNumber?.[0] ?? patient.phoneNumber,
      dateNaissance: attributes.dateNaissance?.[0] ?? patient.dateNaissance,
    };
  }

  async deletePatientById(id: number): Promise<void> {
    const user = await this.patientRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.keycloakAdmin.deleteUser(user.keycloak_id);
    await this.patientRepository.delete(id);
  }
}
