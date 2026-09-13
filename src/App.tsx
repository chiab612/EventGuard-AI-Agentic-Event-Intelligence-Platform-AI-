import React, { useState, useMemo } from 'react';
import { 
  Applicant, 
  EventConfig, 
  WeightConfig, 
  EventMetrics, 
  OrganizerDecision, 
  RecruitmentGapItem, 
  StrategyRecommendation, 
  AgentStep 
} from './types';
import { 
  INITIAL_EVENT, 
  DEFAULT_WEIGHTS, 
  MOCK_APPLICANTS, 
  INITIAL_METRICS, 
  RECRUITMENT_GAPS, 
  STRATEGY_RECOMMENDATIONS 
} from './data/mockData';
import { AgentOrchestrator } from './agents/orchestrator';
import { defaultAIProvider } from './services/aiProvider';

import { Navbar } from './components/Navbar';
import { ExplainableModal } from './components/ExplainableModal';
import { TwoMinuteDemoModal } from './components/TwoMinuteDemoModal';
import { ResponsibleAIBanner } from './components/ResponsibleAIBanner';

import { DashboardPage } from './pages/DashboardPage';
import { ApplicantsPage } from './pages/ApplicantsPage';
import { EventIntelligencePage } from './pages/EventIntelligencePage';
import { RecruitmentGapPage } from './pages/RecruitmentGapPage';
import { StrategyPage } from './pages/StrategyPage';
import { EventSettingsPage } from './pages/EventSettingsPage';
import { AgentActivityPage } from './pages/AgentActivityPage';
import { MobileSimulatorView } from './pages/MobileSimulatorView';

const orchestrator = new AgentOrchestrator(defaultAIProvider);

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [eventConfig, setEventConfig] = useState<EventConfig>(INITIAL_EVENT);
  const [weights, setWeights] = useState<WeightConfig>(DEFAULT_WEIGHTS);
  const [applicants, setApplicants] = useState<Applicant[]>(MOCK_APPLICANTS);
  const [gaps, setGaps] = useState<RecruitmentGapItem[]>(RECRUITMENT_GAPS);
  const [recommendations, setRecommendations] = useState<StrategyRecommendation[]>(STRATEGY_RECOMMENDATIONS);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [agentStatusText, setAgentStatusText] = useState<string>('');
  const [isTwoMinuteDemoOpen, setIsTwoMinuteDemoOpen] = useState<boolean>(false);

  const [agentSteps, setAgentSteps] = useState<AgentStep[]>([
    {
      id: 'step-1',
      agentName: 'EventGuard Orchestrator',
      title: 'Event Objective Analyzed',
      description: '目標鎖定「AI Enterprise Networking」，載入 5 大目標產業與 6 大目標職能指標',
      status: 'completed',
      timestamp: '09:40:12',
      findings: ['活動類型: Enterprise Technology Summit', '目標產業: AI, Cloud, Software, Enterprise IT, Cybersecurity']
    },
    {
      id: 'step-2',
      agentName: 'Applicant Screening Agent',
      title: 'Applicant Profiles Loaded & 126 Applicants Screened',
      description: '啟動 6 維度加權配對矩陣，多維度評估產業關聯、職涯成熟度與交流目的',
      status: 'completed',
      timestamp: '09:40:14',
      findings: ['126 位報名者評估完成 (AI Coverage 100%)', 'High Priority: 32 位', 'Human Review: 21 位', 'General: 58 位', 'Data Quality: 15 位']
    },
    {
      id: 'step-3',
      agentName: 'Event Intelligence Agent',
      title: 'Participant Mix Analyzed',
      description: '計算產業分佈、職位權重層級、VIP 代表比例與多年經驗分佈統計',
      status: 'completed',
      timestamp: '09:40:15',
      findings: ['產業分佈: AI/Software (42%), Enterprise IT (28%)', '職務分佈: Developer (31%), Executive (18%)']
    },
    {
      id: 'step-4',
      agentName: 'Data Quality Agent',
      title: 'Data Quality Checked',
      description: '掃描潛在重複郵件、機構簡寫、缺漏職銜或個人化申請異常特徵',
      status: 'completed',
      timestamp: '09:40:16',
      findings: ['掃描 126 筆資料，發現 15 筆需人工確認資料', '所有項目標示為「待確認」，不自動剔除']
    },
    {
      id: 'step-5',
      agentName: 'Event Strategy Agent',
      title: 'Recruitment Gap Detected & Strategy Recommendations Generated',
      description: '對比活動設定之 Persona，計算決策者赤字並產出 4 條具體優化建議',
      status: 'completed',
      timestamp: '09:40:17',
      findings: ['偵測到 Enterprise Decision Makers 缺口 (-11%)', '產出 4 條招募調整策略 (定向邀請 8~12 位 IT 決策者)']
    },
    {
      id: 'step-6',
      agentName: 'Human-in-the-loop Gate',
      title: 'Waiting for Organizer Review',
      description: '所有 AI 決策輔助推論已完成，交由活動主辦方進行最終審查與邀請決策',
      status: 'waiting_review',
      timestamp: '09:40:18',
      details: 'AI 分析完成！等待活動主辦方進行人工決策（Priority Invite / General Invite / Manual Review）。'
    }
  ]);

  // Dynamic Metrics calculation based on applicants and organizer decisions
  const metrics: EventMetrics = useMemo(() => {
    const total = 126;
    const highPriority = applicants.filter(a => a.recommendationTier === 'high_priority').length;
    const humanReview = applicants.filter(a => a.recommendationTier === 'human_review').length;
    const general = applicants.filter(a => a.recommendationTier === 'general').length;
    const dataQuality = applicants.filter(a => a.recommendationTier === 'data_quality_review').length;
    const decided = applicants.filter(a => a.organizerDecision !== null).length;

    return {
      totalApplicants: total,
      analyzedCount: total,
      highPriorityCount: 32, // Preserved total pool metric
      humanReviewCount: 21,
      generalCount: 58,
      dataQualityReviewCount: 15,
      eventHealthScore: 88,
      participantFitScore: 84,
      decisionCount: decided
    };
  }, [applicants]);

  // Handler: LOAD DEMO EVENT
  const handleLoadDemo = () => {
    setEventConfig(INITIAL_EVENT);
    setWeights(DEFAULT_WEIGHTS);
    setApplicants(MOCK_APPLICANTS);
    setGaps(RECRUITMENT_GAPS);
    setRecommendations(STRATEGY_RECOMMENDATIONS);
    setCurrentTab('dashboard');
  };

  // Handler: RUN EVENTGUARD AGENT (Workflow Execution)
  const handleRunWorkflow = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setAgentStatusText('EventGuard Orchestrator 正在啟動 Agentic 工作流...');

    try {
      const result = await orchestrator.runFullWorkflow(
        eventConfig,
        applicants,
        weights,
        (updatedSteps) => {
          setAgentSteps(updatedSteps);
          const activeStep = updatedSteps.find(s => s.status === 'running');
          if (activeStep) {
            setAgentStatusText(`${activeStep.agentName}: ${activeStep.title}...`);
          }
        }
      );

      setApplicants(result.updatedApplicants);
      setGaps(result.gaps);
      setRecommendations(result.recommendations);
      setAgentStatusText('Workflow 執行完成！所有 AI 分析與策略建議已就緒。');
      setTimeout(() => setAgentStatusText(''), 3000);
    } catch (err) {
      console.error('Workflow error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handler: Ask EventGuard Agent natural language prompt
  const handleExecutePrompt = async (prompt: string) => {
    if (isProcessing) return;
    setIsProcessing(true);
    setAgentStatusText('Orchestrator 正在解析語意指令並調用專屬 Agent...');

    try {
      const result = await defaultAIProvider.executeAgentPrompt(prompt, eventConfig, applicants);
      
      // Route intelligently based on intent
      if (result.intent === 'top_priority') {
        setCurrentTab('applicants');
      } else if (result.intent === 'recruitment_gap') {
        setCurrentTab('gap');
      } else if (result.intent === 'data_quality') {
        setCurrentTab('applicants');
      }

      setAgentStatusText(result.responseSummary);
      setTimeout(() => setAgentStatusText(''), 7000);
    } catch (err) {
      console.error('Prompt error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handler: Organizer final decision (Human-in-the-loop)
  const handleMakeDecision = (applicantId: string, decision: OrganizerDecision) => {
    setApplicants(prev => prev.map(app => {
      if (app.id === applicantId) {
        return {
          ...app,
          organizerDecision: app.organizerDecision === decision ? null : decision,
          decisionTimestamp: new Date().toLocaleTimeString()
        };
      }
      return app;
    }));

    if (selectedApplicant && selectedApplicant.id === applicantId) {
      setSelectedApplicant(prev => prev ? {
        ...prev,
        organizerDecision: prev.organizerDecision === decision ? null : decision
      } : null);
    }
  };

  // Handler: Recalculate based on weights
  const handleApplyRecalculation = async () => {
    setIsProcessing(true);
    try {
      const updated = await Promise.all(
        applicants.map(app => defaultAIProvider.screenApplicant(app, eventConfig, weights))
      );
      setApplicants(prev => prev.map((app, idx) => ({
        ...app,
        overallScore: updated[idx].overallScore,
        scoreBreakdown: updated[idx].scoreBreakdown,
        recommendationTier: updated[idx].recommendationTier,
      })));
    } finally {
      setIsProcessing(false);
    }
  };

  // 2-Minute Demo step navigation
  const handleJumpToDemoStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        handleLoadDemo();
        break;
      case 2:
        setCurrentTab('dashboard');
        break;
      case 3:
        setCurrentTab('activity');
        break;
      case 4:
      case 5:
      case 9:
        setCurrentTab('applicants');
        break;
      case 6:
        setCurrentTab('intelligence');
        break;
      case 7:
        setCurrentTab('gap');
        break;
      case 8:
        setCurrentTab('strategy');
        break;
      case 10:
      case 11:
      case 12:
        setCurrentTab('applicants');
        if (applicants.length > 0) {
          setSelectedApplicant(applicants[0]);
        }
        break;
      default:
        setCurrentTab('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white antialiased">
      
      {/* Top Main Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onLoadDemo={handleLoadDemo}
        onRunWorkflow={handleRunWorkflow}
        onStartTwoMinuteDemo={() => setIsTwoMinuteDemoOpen(true)}
        isProcessing={isProcessing}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {viewMode === 'mobile' ? (
          <MobileSimulatorView
            eventConfig={eventConfig}
            metrics={metrics}
            applicants={applicants}
            gaps={gaps}
            recommendations={recommendations}
            steps={agentSteps}
            weights={weights}
            onChangeWeights={setWeights}
            onResetWeights={() => setWeights(DEFAULT_WEIGHTS)}
            onSelectApplicant={setSelectedApplicant}
            onMakeDecision={handleMakeDecision}
            onExecutePrompt={handleExecutePrompt}
            isProcessing={isProcessing}
            agentStatusText={agentStatusText}
            onRunWorkflow={handleRunWorkflow}
          />
        ) : (
          <>
            {currentTab === 'dashboard' && (
              <DashboardPage
                eventConfig={eventConfig}
                metrics={metrics}
                applicants={applicants}
                gaps={gaps}
                recommendations={recommendations}
                onSelectApplicant={setSelectedApplicant}
                onNavigateTab={setCurrentTab}
                onExecutePrompt={handleExecutePrompt}
                isProcessing={isProcessing}
                agentStatusText={agentStatusText}
                onRunWorkflow={handleRunWorkflow}
              />
            )}

            {currentTab === 'applicants' && (
              <ApplicantsPage
                applicants={applicants}
                onSelectApplicant={setSelectedApplicant}
                onMakeDecision={handleMakeDecision}
              />
            )}

            {currentTab === 'intelligence' && (
              <EventIntelligencePage
                applicants={applicants}
                onNavigateTab={setCurrentTab}
              />
            )}

            {currentTab === 'gap' && (
              <RecruitmentGapPage
                gaps={gaps}
                onNavigateTab={setCurrentTab}
              />
            )}

            {currentTab === 'strategy' && (
              <StrategyPage
                recommendations={recommendations}
                onNavigateTab={setCurrentTab}
              />
            )}

            {currentTab === 'weights' && (
              <EventSettingsPage
                eventConfig={eventConfig}
                onUpdateEventConfig={setEventConfig}
                weights={weights}
                onChangeWeights={setWeights}
                onResetWeights={() => setWeights(DEFAULT_WEIGHTS)}
                onApplyRecalculation={handleApplyRecalculation}
              />
            )}

            {currentTab === 'activity' && (
              <AgentActivityPage
                steps={agentSteps}
                onRunWorkflow={handleRunWorkflow}
                isProcessing={isProcessing}
              />
            )}
          </>
        )}

      </main>

      {/* Explainable AI Modal Drawer */}
      <ExplainableModal
        applicant={selectedApplicant}
        onClose={() => setSelectedApplicant(null)}
        onMakeDecision={handleMakeDecision}
      />

      {/* 2-Minute Guided Demo Walkthrough Modal */}
      <TwoMinuteDemoModal
        isOpen={isTwoMinuteDemoOpen}
        onClose={() => setIsTwoMinuteDemoOpen(false)}
        onJumpToStep={handleJumpToDemoStep}
      />

      {/* Responsible AI Compliance Footer */}
      <ResponsibleAIBanner />

    </div>
  );
}
