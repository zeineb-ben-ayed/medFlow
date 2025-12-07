import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Receptionniste } from 'src/receptionniste/receptionniste.entity';
import { Medecin } from 'src/medecin/medecin.entity';
import { KeycloakAdminService } from 'src/keycloak/keycloak-admin.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly keycloakAdmin: KeycloakAdminService,
    ) { }

    async findAllMedecinsAndReceptionnistes(): Promise<User[]> {
        const users = await this.userRepository.find({
            where: [
                { role: 'medecin' },
                { role: 'receptionniste' },
            ],
        });

        const fulluser = await Promise.all(
            users.map(async (p) => {
                try {
                    const kcUser = await this.keycloakAdmin.getUserById(p.keycloak_id);
                    return {
                        ...p,
                        firstName: kcUser.firstName,
                        lastName: kcUser.lastName,
                        email: kcUser.email,
                        phoneNumber: kcUser.attributes?.phoneNumber?.[0] || null,
                        dateNaissance: kcUser.attributes?.dateNaissance?.[0] || null
                    };
                } catch (err) {
                    console.error(`Could not fetch user ${p.keycloak_id}:, err.message`);
                    return p;
                }
            }),
        );

        return fulluser.map(fulluser => {
            if (fulluser.role === 'medecin') {
                const med = new Medecin();
                Object.assign(med, fulluser);
                return med;
            }

            if (fulluser.role === 'receptionniste') {
                const rec = new Receptionniste();
                Object.assign(rec, fulluser);
                return rec;
            }
            return fulluser;
        });
    }

    async deleteUserById(id: number): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        await this.keycloakAdmin.deleteUser(user.keycloak_id);
        await this.userRepository.delete(id);
    }

    async findByKeycloakId(keycloakId: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { keycloak_id: keycloakId },
        });

        if (!user) {
            throw new NotFoundException('User not found in local database');
        }
        return user;
    }
}
