import { Test, TestingModule } from '@nestjs/testing';
import { ApiResponserService } from './api-responser.service';

describe('ApiResponserService', () => {
  let service: ApiResponserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiResponserService],
    }).compile();

    service = module.get<ApiResponserService>(ApiResponserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
