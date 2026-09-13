import { Applicant, EventConfig, RecruitmentGapItem, StrategyRecommendation } from '../types';
import { AIProvider } from '../services/aiProvider';

export class EventStrategyAgent {
  private provider: AIProvider;

  constructor(provider: AIProvider) {
    this.provider = provider;
  }

  public setProvider(provider: AIProvider) {
    this.provider = provider;
  }

  async analyzeRecruitmentGaps(
    applicants: Applicant[],
    eventConfig: EventConfig
  ): Promise<RecruitmentGapItem[]> {
    return this.provider.detectRecruitmentGaps(applicants, eventConfig);
  }

  async generateStrategyRecommendations(
    gaps: RecruitmentGapItem[],
    applicants: Applicant[],
    eventConfig: EventConfig
  ): Promise<StrategyRecommendation[]> {
    return this.provider.generateStrategyRecommendations(gaps, applicants, eventConfig);
  }
}
