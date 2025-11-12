import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Receptionniste } from 'src/receptionniste/receptionniste.entity';
import { Medecin } from 'src/medecin/medecin.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findAllMedecinsAndReceptionnistes(): Promise<User[]> {
        const users = await this.userRepository.find({
            where: [
            { role: 'medecin' },
            { role: 'receptionniste' },
            ],
        });

        return users.map(user => {
            if (user.role === 'medecin') {
                const med = new Medecin();
                Object.assign(med, user);
                return med;
            }

            if (user.role === 'receptionniste') {
                const rec = new Receptionniste();
                Object.assign(rec, user);
                return rec;
            }
            
            return user;
        });
    }
}
