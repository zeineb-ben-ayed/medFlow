import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Roles } from 'nest-keycloak-connect';
import { ConsultationService } from './consultation.service';
import { CreateConsultationInput } from './dto/create-consultation.input';
import { Consultation } from './consultation.entity';

@Resolver()
export class ConsultationResolver {
  constructor(private readonly consultationService: ConsultationService) {}

  @Mutation(() => Consultation)
  @Roles({ roles: ['realm:medecin'] })
  async createConsultation(
    @Args('data') data: CreateConsultationInput,
  ): Promise<Consultation> {
    return this.consultationService.create(data);
  }
}
