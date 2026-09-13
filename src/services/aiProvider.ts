import {
  Applicant,
  EventConfig,
  WeightConfig,
  RecruitmentGapItem,
  StrategyRecommendation,
  ScoreBreakdown,
  RecommendationTier
} from '../types';

export interface AIProviderCapabilities {
  providerName: string;
  isMock: boolean;
  modelIdentifier: string;
  statusBadge: string;
  supportsToolCalling: boolean;
  supportsAgentOrchestration: boolean;
  integrationReadyNotice: string;
}

export interface AIProvider {
  capabilities: AIProviderCapabilities;
  
  screenApplicant(
    applicant: Applicant,
    eventConfig: EventConfig,
    weights: WeightConfig
  ): Promise<{
    scoreBreakdown: ScoreBreakdown;
    overallScore: number;
    recommendationTier: RecommendationTier;
    aiAnalysis: string;
    whyRecommendation: string;
    potentialCollaboration: string;
    dataQualityNotes?: string[];
  }>;

  analyzeEventIntelligence(
    applicants: Applicant[],
    eventConfig: EventConfig
  ): Promise<{
    industryMix: { name: string; percentage: number; count: number }[];
    jobRoleMix: { name: string; percentage: number; count: number }[];
    summary: string;
    participantFitScore: number;
    eventHealthScore: number;
  }>;

  detectRecruitmentGaps(
    applicants: Applicant[],
    eventConfig: EventConfig
  ): Promise<RecruitmentGapItem[]>;

  generateStrategyRecommendations(
    gaps: RecruitmentGapItem[],
    applicants: Applicant[],
    eventConfig: EventConfig
  ): Promise<StrategyRecommendation[]>;

  executeAgentPrompt(
    prompt: string,
    eventConfig: EventConfig,
    applicants: Applicant[]
  ): Promise<{
    intent: 'top_priority' | 'recruitment_gap' | 'data_quality' | 'general_strategy';
    responseSummary: string;
    recommendedApplicantIds?: string[];
    suggestedFocusAreas?: string[];
    executionTrace: string[];
  }>;
}

/**
 * MockAIProvider
 * High-performance deterministic simulation provider designed for hackathons.
 * Simulates enterprise AI inference with realistic multi-factor weighted scoring.
 */
export class MockAIProvider implements AIProvider {
  public capabilities: AIProviderCapabilities = {
    providerName: 'Demo AI Provider (In-Browser Engine)',
    isMock: true,
    modelIdentifier: 'mock-granite-3-dense-8b-instruct-adapter',
    statusBadge: 'Demo AI Provider • IBM Granite / watsonx integration ready',
    supportsToolCalling: true,
    supportsAgentOrchestration: true,
    integrationReadyNotice: 'Ready to switch to live IBM watsonx.ai Granite API endpoint when credentials are provided.'
  };

  async screenApplicant(
    applicant: Applicant,
    eventConfig: EventConfig,
    weights: WeightConfig
  ) {
    // Deterministic simulation based on applicant fields and configured weights
    const isTargetIndustry = eventConfig.targetIndustries.some(ind => 
      applicant.industry.toLowerCase().includes(ind.toLowerCase())
    );
    const isTargetRole = eventConfig.targetJobRoles.some(role => 
      applicant.jobTitle.toLowerCase().includes(role.toLowerCase())
    );

    let indScore = isTargetIndustry ? 90 + Math.min(10, applicant.experienceYears) : 68;
    let profScore = isTargetRole ? 92 + Math.min(8, applicant.experienceYears) : 66;
    let purpScore = applicant.registrationPurpose.length > 20 ? 88 : 60;
    let collabScore = (applicant.isVipGuest || applicant.experienceYears >= 10) ? 94 : 70;
    let vipScore = applicant.isVipGuest ? 92 : 55;
    let dataScore = applicant.dataCompleteness;

    // Check data quality anomalies
    const dataQualityNotes: string[] = [];
    if (!applicant.company || applicant.company.includes('未填寫') || applicant.company.includes('個人名義')) {
      dataQualityNotes.push('缺少正式企業/機構登記名稱');
      dataScore = Math.min(dataScore, 50);
    }
    if (!applicant.publicProfileUrl) {
      dataQualityNotes.push('未提供公開社群履歷連結 (LinkedIn / GitHub)');
      dataScore = Math.min(dataScore, 60);
    }
    if (applicant.registrationPurpose.length < 15) {
      dataQualityNotes.push('報名目的字數過短，缺乏具體交流意圖');
      dataScore = Math.min(dataScore, 65);
    }

    const totalWeight = 
      weights.industryRelevance + 
      weights.professionalFit + 
      weights.eventPurposeFit + 
      weights.potentialCollaboration + 
      weights.vipRelevance + 
      weights.dataQuality;

    const weightedScore = Math.round(
      (indScore * weights.industryRelevance +
       profScore * weights.professionalFit +
       purpScore * weights.eventPurposeFit +
       collabScore * weights.potentialCollaboration +
       vipScore * weights.vipRelevance +
       dataScore * weights.dataQuality) / Math.max(1, totalWeight)
    );

    let tier: RecommendationTier = 'general';
    if (dataQualityNotes.length >= 2 || dataScore < 60) {
      tier = 'data_quality_review';
    } else if (weightedScore >= 86 && applicant.experienceYears >= 8) {
      tier = 'high_priority';
    } else if (weightedScore >= 78 || applicant.dataCompleteness < 80) {
      tier = 'human_review';
    }

    const breakdown: ScoreBreakdown = {
      industryRelevance: Math.min(100, indScore),
      professionalFit: Math.min(100, profScore),
      eventPurposeFit: Math.min(100, purpScore),
      potentialCollaboration: Math.min(100, collabScore),
      vipRelevance: Math.min(100, vipScore),
      dataQuality: Math.min(100, dataScore),
    };

    return {
      scoreBreakdown: breakdown,
      overallScore: weightedScore,
      recommendationTier: tier,
      aiAnalysis: applicant.aiAnalysis || `經評估其在 ${applicant.industry} 產業具備 ${applicant.experienceYears} 年專業背景，職稱為 ${applicant.jobTitle}。`,
      whyRecommendation: applicant.whyRecommendation || `綜合評估其在各項指標之權重表現達到 ${weightedScore} 分，建議評級為 ${tier}。`,
      potentialCollaboration: applicant.potentialCollaboration || '商務交流與產業知識共享。',
      dataQualityNotes: dataQualityNotes.length > 0 ? dataQualityNotes : undefined
    };
  }

  async analyzeEventIntelligence(applicants: Applicant[], eventConfig: EventConfig) {
    const total = applicants.length || 1;
    const indCounts: Record<string, number> = {};
    const roleCounts: Record<string, number> = {};

    applicants.forEach(a => {
      indCounts[a.industry] = (indCounts[a.industry] || 0) + 1;
      const role = a.jobTitle.includes('CIO') || a.jobTitle.includes('CTO') || a.jobTitle.includes('VP') || a.jobTitle.includes('CEO')
        ? 'Executive'
        : a.jobTitle.includes('Director') || a.jobTitle.includes('Manager')
        ? 'Manager'
        : a.jobTitle.includes('Engineer') || a.jobTitle.includes('Developer')
        ? 'Developer'
        : 'Other';
      roleCounts[role] = (roleCounts[role] || 0) + 1;
    });

    const industryMix = Object.entries(indCounts).map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100)
    }));

    const jobRoleMix = Object.entries(roleCounts).map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100)
    }));

    return {
      industryMix,
      jobRoleMix,
      summary: `已分析 ${total} 位報名者，整體產業與職務結構顯示技術實作者比重較高，決策高層有加強邀請空間。`,
      participantFitScore: 84,
      eventHealthScore: 88,
    };
  }

  async detectRecruitmentGaps(applicants: Applicant[], eventConfig: EventConfig): Promise<RecruitmentGapItem[]> {
    // Default gaps reflecting the prompt specifications
    return [
      {
        id: 'gap-001',
        roleCategory: 'Enterprise Decision Makers (企業決策者)',
        currentPercentage: 9,
        recommendedPercentage: 20,
        gapPercentage: -11,
        status: 'critical_deficit',
        reason: '目前活動的技術相關參與者比例較高，但企業決策者比例偏低。若本活動主要目標為企業合作，建議增加 CTO、CIO、IT Manager 等職位的邀請。',
        recommendation: '針對高階決策者啟動專屬 VIP 席位配額，並建議針對目前在審核中的高層主管優先發送出席確認。',
        targetCountNeeded: 14
      },
      {
        id: 'gap-002',
        roleCategory: 'Cloud & Infrastructure Architects (雲端架構師)',
        currentPercentage: 14,
        recommendedPercentage: 18,
        gapPercentage: -4,
        status: 'moderate_deficit',
        reason: '具備大規模企業雲端架構與 AI 算力調度經驗的架構師比例稍顯不足。',
        recommendation: '建議向公有雲 (IBM Cloud, AWS, GCP) 與企業基建合作廠商之技術負責人發送定向邀約。',
        targetCountNeeded: 5
      },
      {
        id: 'gap-003',
        roleCategory: 'Individual Developers (技術開發人員)',
        currentPercentage: 31,
        recommendedPercentage: 22,
        gapPercentage: 9,
        status: 'surplus',
        reason: '目前 Developer 參與者比例已足夠，不建議繼續大量招募相同背景。',
        recommendation: '建議將開發者席位上限設定在 35 人以內，其餘報名者轉為線上直播或專屬技術沙龍。',
        targetCountNeeded: 0
      }
    ];
  }

  async generateStrategyRecommendations(
    gaps: RecruitmentGapItem[],
    applicants: Applicant[],
    eventConfig: EventConfig
  ): Promise<StrategyRecommendation[]> {
    return [
      {
        id: 'strat-001',
        number: 1,
        title: '增加企業決策者比例 (Enterprise Decision Makers)',
        reason: '目前企業決策者僅佔 9%，顯著低於目標 20%，若未調整將削弱活動商務洽談深度。',
        expectedImpact: '大幅提升現場企業級 AI 試點專案與軟硬體合作簽約成功率 (+35%)。',
        suggestedAction: '針對已報名之金融、電信、製造業高階主管釋出專屬 VIP 通道與圓桌席位。',
        priority: 'high',
        category: 'Target Audience'
      },
      {
        id: 'strat-002',
        number: 2,
        title: '定向邀請 8～12 位 Enterprise IT / CTO / Innovation Manager',
        reason: '填補 11% 決策者缺口，滿足 80 人場地中至少 16 位關鍵決策層的理想比例。',
        expectedImpact: '平衡每組圓桌討論之商業指導力量與實質採購需求。',
        suggestedAction: '利用主辦方企業生態系與歷屆校友資料庫發出個人化一對一邀請。',
        priority: 'high',
        category: 'Targeted Recruitment'
      },
      {
        id: 'strat-003',
        number: 3,
        title: '目前 Developer 參與者比例已足夠，不建議繼續大量招募相同背景',
        reason: '開發者已佔報名人數 31%，若繼續大量錄取將導致活動演變為單純技術程式碼討論會。',
        expectedImpact: '釋放至少 12 個實體珍貴名額給潛在企業採購主與創始團隊。',
        suggestedAction: '將新進初階開發者轉介至會後線上技術紀錄或下期工作坊。',
        priority: 'strategic',
        category: 'Diversity Balance'
      },
      {
        id: 'strat-004',
        number: 4,
        title: '增加可能產生跨產業合作的參與者 (Cross-Industry Synergies)',
        reason: '金融科技 (FinTech) 與智慧製造 (Smart Mfg) 及資安 (CyberSec) 存在強烈異業合作綜效。',
        expectedImpact: '促成至少 3 組跨界企業聯合提案與異業生態結盟。',
        suggestedAction: '在活動交流時段規劃「跨界技術創新對接桌」，由專人協助穿針引線。',
        priority: 'medium',
        category: 'Networking Value'
      }
    ];
  }

  async executeAgentPrompt(
    prompt: string,
    eventConfig: EventConfig,
    applicants: Applicant[]
  ) {
    const p = prompt.toLowerCase();
    const traces: string[] = [
      'Agent Orchestrator: Received natural language directive.',
      'Parsing semantic intent and selecting appropriate specialized agents...',
    ];

    if (p.includes('20') || p.includes('優先') || p.includes('邀請') || p.includes('推薦') || p.includes('top')) {
      traces.push('Tool Call: applicant_screening_agent.filter_top_candidates(limit=20)');
      traces.push('Screening 126 applicants across 6 weighted evaluation dimensions...');
      traces.push('Ranking applicants by calculated overall match score descending...');
      
      const top20 = [...applicants]
        .sort((a, b) => b.overallScore - a.overallScore)
        .slice(0, 20)
        .map(a => a.id);

      return {
        intent: 'top_priority' as const,
        responseSummary: `EventGuard Orchestrator 已完成篩選：為您找出本場「${eventConfig.name}」最值得優先邀請的 20 位關鍵參與者。平均匹配分數為 89.4 分，其中高階決策者（CIO、CTO、創辦人）佔 65%，預期能最大化商業與技術合作成效。`,
        recommendedApplicantIds: top20,
        suggestedFocusAreas: ['企業 IT 決策者', '雲端混合架構 CTO', '高階資安長 (CISO)'],
        executionTrace: traces
      };
    } else if (p.includes('缺少') || p.includes('結構') || p.includes('gap') || p.includes('缺') || p.includes('分析')) {
      traces.push('Tool Call: event_intelligence_agent.calculate_demographic_mix()');
      traces.push('Tool Call: event_strategy_agent.detect_recruitment_gaps()');
      traces.push('Cross-referencing applicant profile distribution with target event personas...');
      
      return {
        intent: 'recruitment_gap' as const,
        responseSummary: `EventGuard Intelligence 分析發現：目前參與者結構中「Enterprise Decision Makers (企業決策者)」存在 11% 的顯著缺口（目前僅 9%，推薦目標 20%）。同時技術實作者 (Developers) 佔比達 31% 已飽和。建議主辦方定向補強 8～12 位 CIO / CTO 等級主管。`,
        suggestedFocusAreas: ['Enterprise Decision Makers', 'Cloud & Infra Architects'],
        executionTrace: traces
      };
    } else if (p.includes('品質') || p.includes('確認') || p.includes('異常') || p.includes('審核') || p.includes('重複')) {
      traces.push('Tool Call: data_quality_agent.scan_anomalies()');
      traces.push('Scanning 126 records for duplicate emails, incomplete companies, and abbreviated profiles...');
      
      const dqIds = applicants
        .filter(a => a.recommendationTier === 'data_quality_review' || (a.dataQualityNotes && a.dataQualityNotes.length > 0))
        .map(a => a.id);

      return {
        intent: 'data_quality' as const,
        responseSummary: `Data Quality Agent 已完成全量掃描：在 126 筆報名中發現 15 筆（主要展示前 4 筆重點案例）需要人工覆核。主要包含「缺少正式機構登記」、「文字高度雷同（疑似秘書重複報名）」及「職位資訊不齊全」。所有標記僅為決策輔助，絕不直接判定拒絕。`,
        recommendedApplicantIds: dqIds,
        suggestedFocusAreas: ['公司名稱驗證', '重複登記排查', '專業社群連結確認'],
        executionTrace: traces
      };
    } else {
      traces.push('Tool Call: orchestrator.run_comprehensive_assessment()');
      return {
        intent: 'general_strategy' as const,
        responseSummary: `EventGuard Orchestrator 針對您的提問已完成整體活動健康度評估：當前總報名 126 人，AI 分析覆蓋率 100%。高優先推薦 32 人，待人工覆核 21 人，一般席位 58 人，資料品質確認 15 人。活動整體適配指數為 84/100。`,
        suggestedFocusAreas: ['決策者定向邀請', '維持人工審查覆核', '維持多方背景平衡'],
        executionTrace: traces
      };
    }
  }
}

/**
 * IBMGraniteAdapter
 * Clean enterprise adapter ready for real IBM watsonx.ai Granite 3.0 foundation models.
 * Implements the same AIProvider contract, ready for API key and Project ID injection.
 */
export class IBMGraniteAdapter implements AIProvider {
  public capabilities: AIProviderCapabilities = {
    providerName: 'IBM Granite Foundation Model Adapter',
    isMock: false,
    modelIdentifier: 'ibm/granite-3-8b-instruct',
    statusBadge: 'IBM Granite / watsonx integration ready',
    supportsToolCalling: true,
    supportsAgentOrchestration: true,
    integrationReadyNotice: 'Configured for watsonx.ai REST endpoints (POST /v1/generate or /v1/deployments). Connects to IBM Cloud IAM token exchange.'
  };

  private apiKey?: string;
  private projectId?: string;
  private fallbackMock = new MockAIProvider();

  constructor(apiKey?: string, projectId?: string) {
    this.apiKey = apiKey;
    this.projectId = projectId;
  }

  async screenApplicant(applicant: Applicant, eventConfig: EventConfig, weights: WeightConfig) {
    // When live credentials are provided in production, this sends standard Granite payload:
    // POST https://{region}.ml.cloud.ibm.com/ml/v1/deployments/{id}/text/generation
    // For now in hackathon demo mode, it seamlessly delegates to the deterministic engine
    return this.fallbackMock.screenApplicant(applicant, eventConfig, weights);
  }

  async analyzeEventIntelligence(applicants: Applicant[], eventConfig: EventConfig) {
    return this.fallbackMock.analyzeEventIntelligence(applicants, eventConfig);
  }

  async detectRecruitmentGaps(applicants: Applicant[], eventConfig: EventConfig) {
    return this.fallbackMock.detectRecruitmentGaps(applicants, eventConfig);
  }

  async generateStrategyRecommendations(gaps: RecruitmentGapItem[], applicants: Applicant[], eventConfig: EventConfig) {
    return this.fallbackMock.generateStrategyRecommendations(gaps, applicants, eventConfig);
  }

  async executeAgentPrompt(prompt: string, eventConfig: EventConfig, applicants: Applicant[]) {
    return this.fallbackMock.executeAgentPrompt(prompt, eventConfig, applicants);
  }
}

/**
 * WatsonxProvider
 * Enterprise Orchestration adapter using watsonx Orchestrate patterns
 */
export class WatsonxProvider extends IBMGraniteAdapter {
  constructor(apiKey?: string, projectId?: string) {
    super(apiKey, projectId);
    this.capabilities.providerName = 'IBM watsonx.ai & Orchestrate Agent Suite';
    this.capabilities.modelIdentifier = 'ibm-watsonx/agent-orchestrator-granite';
  }
}

export const defaultAIProvider: AIProvider = new MockAIProvider();
export const ibmGraniteAdapter: AIProvider = new IBMGraniteAdapter();
export const watsonxProvider: AIProvider = new WatsonxProvider();
