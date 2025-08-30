import { Test, TestingModule } from '@nestjs/testing';
import { AlertManagementController } from './alert-management.controller';

describe('AlertManagementController', () => {
  let controller: AlertManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlertManagementController],
    }).compile();

    controller = module.get<AlertManagementController>(AlertManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
