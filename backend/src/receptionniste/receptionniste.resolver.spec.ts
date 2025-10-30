import { Test, TestingModule } from '@nestjs/testing';
import { ReceptionnisteResolver } from './receptionniste.resolver';

describe('ReceptionnisteResolver', () => {
  let resolver: ReceptionnisteResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceptionnisteResolver],
    }).compile();

    resolver = module.get<ReceptionnisteResolver>(ReceptionnisteResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
