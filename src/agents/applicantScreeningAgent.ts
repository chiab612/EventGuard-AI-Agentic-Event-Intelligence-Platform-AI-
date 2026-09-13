import { Applicant, EventConfig, WeightConfig } from '../types';
import { AIProvider } from '../services/aiProvider';

export class ApplicantScreeningAgent {
  private provider: AIProvider;

  constructor(provider: AIProvider) {
    this.provider = provider;
  }

  public setProvider(provider: AIProvider) {
    this.provider = provider;
  }

  async screenSingleApplicant(
    applicant: Applicant,
    eventConfig: EventConfig,
    weights: WeightConfig
  ): Promise<Applicant> {
    const result = await this.provider.screenApplicant(applicant, eventConfig, weights);
    return {
      ...applicant,
      overallScore: result.overallScore,
      scoreBreakdown: result.scoreBreakdown,
      recommendationTier: result.recommendationTier,
      aiAnalysis: result.aiAnalysis,
      whyRecommendation: result.whyRecommendation,
      potentialCollaboration: result.potentialCollaboration,
      dataQualityNotes: result.dataQualityNotes
    };
  }

  async screenBatch(
    applicants: Applicant[],
    eventConfig: EventConfig,
    weights: WeightConfig
  ): Promise<Applicant[]> {
    return Promise.all(
      applicants.map(app => this.screenSingleApplicant(app, eventConfig, weights))
    );
  }
}
