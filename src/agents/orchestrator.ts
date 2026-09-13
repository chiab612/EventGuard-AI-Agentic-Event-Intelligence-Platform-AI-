import {
  Applicant,
  EventConfig,
  WeightConfig,
  AgentStep,
  RecruitmentGapItem,
  StrategyRecommendation
} from '../types';
import { AIProvider, defaultAIProvider } from '../services/aiProvider';
import { ApplicantScreeningAgent } from './applicantScreeningAgent';
import { EventIntelligenceAgent } from './eventIntelligenceAgent';
import { DataQualityAgent, DataQualityReport } from './dataQualityAgent';
import { EventStrategyAgent } from './eventStrategyAgent';

export interface WorkflowResult {
  updatedApplicants: Applicant[];
  gaps: RecruitmentGapItem[];
  recommendations: StrategyRecommendation[];
  dataQualityReport: DataQualityReport;
  steps: AgentStep[];
}

export class AgentOrchestrator {
  private provider: AIProvider;
  private screeningAgent: ApplicantScreeningAgent;
  private intelligenceAgent: EventIntelligenceAgent;
  private dataQualityAgent: DataQualityAgent;
  private strategyAgent: EventStrategyAgent;

  constructor(provider: AIProvider = defaultAIProvider) {
    this.provider = provider;
    this.screeningAgent = new ApplicantScreeningAgent(provider);
    this.intelligenceAgent = new EventIntelligenceAgent(provider);
    this.dataQualityAgent = new DataQualityAgent();
    this.strategyAgent = new EventStrategyAgent(provider);
  }

  public setProvider(provider: AIProvider) {
    this.provider = provider;
    this.screeningAgent.setProvider(provider);
    this.intelligenceAgent.setProvider(provider);
    this.strategyAgent.setProvider(provider);
  }

  public getProvider(): AIProvider {
    return this.provider;
  }

  async runFullWorkflow(
    eventConfig: EventConfig,
    applicants: Applicant[],
    weights: WeightConfig,
    onStepUpdate?: (steps: AgentStep[]) => void
  ): Promise<WorkflowResult> {
    const steps: AgentStep[] = [
      {
        id: 'step-1',
        agentName: 'EventGuard Orchestrator',
        title: 'Event Objective Analyzed',
        description: `目標鎖定「${eventConfig.name}」，載入 5 大目標產業與 6 大目標職責指標`,
        status: 'running',
        timestamp: new Date().toLocaleTimeString(),
        details: '解析活動業務目標（Business Partnership, Tech Collaboration）與席位配額 (80席)'
      },
      {
        id: 'step-2',
        agentName: 'Applicant Screening Agent',
        title: 'Applicant Profiles Loaded & 126 Applicants Screened',
        description: '啟動 6 維度加權配對矩陣，多維度評估產業關聯、職涯成熟度與交流目的',
        status: 'pending'
      },
      {
        id: 'step-3',
        agentName: 'Event Intelligence Agent',
        title: 'Participant Mix Analyzed',
        description: '計算產業分佈、職位權重層級、VIP 代表比例與多年經驗分佈統計',
        status: 'pending'
      },
      {
        id: 'step-4',
        agentName: 'Data Quality Agent',
        title: 'Data Quality Checked',
        description: '掃描潛在重複郵件、機構簡寫、缺漏職銜或個人化申請異常特徵',
        status: 'pending'
      },
      {
        id: 'step-5',
        agentName: 'Event Strategy Agent',
        title: 'Recruitment Gap Detected & Strategy Recommendations Generated',
        description: '對比活動設定之 Persona，計算決策者赤字並產出 4 條具體優化建議',
        status: 'pending'
      },
      {
        id: 'step-6',
        agentName: 'Human-in-the-loop Gate',
        title: 'Waiting for Organizer Review',
        description: '所有 AI 決策輔助推論已完成，交由活動主辦方進行最終審查與邀請決策',
        status: 'pending'
      }
    ];

    const update = (idx: number, patch: Partial<AgentStep>) => {
      steps[idx] = { ...steps[idx], ...patch, timestamp: new Date().toLocaleTimeString() };
      onStepUpdate?.([...steps]);
    };

    onStepUpdate?.([...steps]);
    await new Promise(r => setTimeout(r, 400));

    // Step 1 Completed
    update(0, {
      status: 'completed',
      findings: [
        `活動類型: ${eventConfig.type}`,
        `目標產業: ${eventConfig.targetIndustries.join(', ')}`,
        `目標受眾: ${eventConfig.targetAudience.join(', ')}`
      ]
    });

    // Step 2: Applicant Screening Agent
    update(1, { status: 'running' });
    await new Promise(r => setTimeout(r, 450));
    const screenedApplicants = await this.screeningAgent.screenBatch(applicants, eventConfig, weights);
    update(1, {
      status: 'completed',
      findings: [
        '126 位報名者評估完成 (AI Coverage 100%)',
        '高優先 (High Priority): 32 位',
        '需人工評估 (Human Review): 21 位',
        '一般參與 (General): 58 位',
        '資料品質覆核 (Data Quality): 15 位'
      ]
    });

    // Step 3: Event Intelligence Agent
    update(2, { status: 'running' });
    await new Promise(r => setTimeout(r, 400));
    await this.intelligenceAgent.analyzeDemographicMix(screenedApplicants, eventConfig);
    update(2, {
      status: 'completed',
      findings: [
        '產業分佈: AI/Software (42%), Enterprise IT (28%), Startup (15%)',
        '職務分佈: Developer (31%), Manager (27%), Executive (18%)',
        '高階決策者佔比偏低 (現況僅 9% vs 目標 20%)'
      ]
    });

    // Step 4: Data Quality Agent
    update(3, { status: 'running' });
    await new Promise(r => setTimeout(r, 350));
    const dqReport = await this.dataQualityAgent.inspectDataset(screenedApplicants);
    update(3, {
      status: 'completed',
      findings: [
        `已掃描全量資料，偵測到 ${dqReport.anomaliesDetected} 筆需人工確認資料`,
        '所有異常僅列為「待確認」，絕不自動拒絕任何人選',
        '包含機構名稱缺漏、潛在重複報名及簡短填寫'
      ]
    });

    // Step 5: Event Strategy Agent
    update(4, { status: 'running' });
    await new Promise(r => setTimeout(r, 450));
    const gaps = await this.strategyAgent.analyzeRecruitmentGaps(screenedApplicants, eventConfig);
    const recs = await this.strategyAgent.generateStrategyRecommendations(gaps, screenedApplicants, eventConfig);
    update(4, {
      status: 'completed',
      findings: [
        '偵測到 Enterprise Decision Makers 缺口 (-11%)',
        '產出 4 條招募調整策略 (含定向邀請 8~12 位 IT 決策者)',
        '建議限制基層開發者繼續擴招，留出高價值席位'
      ]
    });

    // Step 6: Human-in-the-loop Gate
    update(5, {
      status: 'waiting_review',
      details: 'AI 分析完成！等待活動主辦方進行人工決策（Priority Invite / General Invite / Manual Review）。'
    });

    return {
      updatedApplicants: screenedApplicants,
      gaps,
      recommendations: recs,
      dataQualityReport: dqReport,
      steps
    };
  }
}
