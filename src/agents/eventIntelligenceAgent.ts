import { Applicant, EventConfig } from '../types';
import { AIProvider } from '../services/aiProvider';

export class EventIntelligenceAgent {
  private provider: AIProvider;

  constructor(provider: AIProvider) {
    this.provider = provider;
  }

  public setProvider(provider: AIProvider) {
    this.provider = provider;
  }

  async analyzeDemographicMix(applicants: Applicant[], eventConfig: EventConfig) {
    return this.provider.analyzeEventIntelligence(applicants, eventConfig);
  }
}
