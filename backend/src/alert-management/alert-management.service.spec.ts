import { Test, TestingModule } from '@nestjs/testing';
import { AlertManagementService } from './alert-management.service';

describe('AlertManagementService', () => {
  let service: AlertManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlertManagementService],
    }).compile();

    service = module.get<AlertManagementService>(AlertManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
