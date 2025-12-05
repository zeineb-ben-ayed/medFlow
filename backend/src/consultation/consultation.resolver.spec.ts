import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationResolver } from './consultation.resolver';

describe('ConsultationResolver', () => {
  let resolver: ConsultationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultationResolver],
    }).compile();

    resolver = module.get<ConsultationResolver>(ConsultationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
