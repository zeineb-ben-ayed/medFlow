import { Test, TestingModule } from '@nestjs/testing';
import { MedecinResolver } from './medecin.resolver';

describe('MedecinResolver', () => {
  let resolver: MedecinResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedecinResolver],
    }).compile();

    resolver = module.get<MedecinResolver>(MedecinResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
