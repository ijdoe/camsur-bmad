import { Test, TestingModule } from '@nestjs/testing';
import { ThreatAnalysisService } from './threat-analysis.service';

describe('ThreatAnalysisService', () => {
  let service: ThreatAnalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThreatAnalysisService],
    }).compile();

    service = module.get<ThreatAnalysisService>(ThreatAnalysisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
