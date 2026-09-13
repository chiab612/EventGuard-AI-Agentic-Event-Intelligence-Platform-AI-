import React, { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  Users, 
  ShieldAlert, 
  TrendingUp, 
  UserCheck 
} from 'lucide-react';

interface TwoMinuteDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToStep: (stepNumber: number) => void;
}

interface DemoStep {
  step: number;
  title: string;
  agent: string;
  description: string;
  targetTab: string;
  actionText?: string;
  icon: any;
}

export const TwoMinuteDemoModal: React.FC<TwoMinuteDemoModalProps> = ({
  isOpen,
  onClose,
  onJumpToStep
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  if (!isOpen) return null;

  const steps: DemoStep[] = [
    {
      step: 1,
      title: 'Load Demo Event (載入展示活動)',
      agent: 'System Manager',
      description: '載入預設活動「AI Enterprise Networking」及 126 位企業活動報名者資料與目標受眾設定。',
      targetTab: 'dashboard',
      actionText: '查看 Dashboard 首頁總覽',
      icon: Play
    },
    {
      step: 2,
      title: 'Ask EventGuard Agent (自然語言指令)',
      agent: 'EventGuard Orchestrator',
      description: '在首頁輸入：「找出最值得優先邀請的 20 位參與者，並分析目前活動還缺少什麼類型的人。」',
      targetTab: 'dashboard',
      actionText: '體驗自然語言指令輸入',
      icon: Sparkles
    },
    {
      step: 3,
      title: 'Agent Orchestrator 開始工作',
      agent: 'EventGuard Orchestrator',
      description: 'Orchestrator 解析意圖，動態調度並協調 4 大專屬 Agent 執行工具呼叫 (Tool Calling)。',
      targetTab: 'activity',
      actionText: '檢視 Agent 實時執行軌跡',
      icon: Cpu
    },
    {
      step: 4,
      title: 'Applicant Screening Agent (評估 126 位報名者)',
      agent: 'Applicant Screening Agent',
      description: '根據 6 維度權重計算 Overall Match Score (0~100) 與分層 (High Priority, General, Review)。',
      targetTab: 'applicants',
      actionText: '查看報名者智能分層清單',
      icon: Users
    },
    {
      step: 5,
      title: 'Data Quality Agent (資料品質稽核)',
      agent: 'Data Quality Agent',
      description: '掃描機構名稱缺漏、文字雷同（疑似代報名）等 15 筆異常資料，標示為「待人工確認」，不自動剔除。',
      targetTab: 'applicants',
      actionText: '查看資料品質覆核名單',
      icon: ShieldAlert
    },
    {
      step: 6,
      title: 'Event Intelligence Agent (參與者結構分析)',
      agent: 'Event Intelligence Agent',
      description: '產出產業分佈 (AI/Software 42%, IT 28%)、職務階層 (Dev 31%, Exec 18%) 與資歷分佈圖表。',
      targetTab: 'intelligence',
      actionText: '查看活動智能統計畫布',
      icon: TrendingUp
    },
    {
      step: 7,
      title: '發現：Enterprise Decision Maker Gap',
      agent: 'Recruitment Gap Analyzer',
      description: '自動比對目標受眾：目前高階決策者僅佔 9%，顯著低於目標 20%，偵測到 -11% 核心缺口！',
      targetTab: 'gap',
      actionText: '查看招募缺口 (Gap) 診斷',
      icon: TrendingUp
    },
    {
      step: 8,
      title: 'Event Strategy Agent (提出策略建議)',
      agent: 'Event Strategy Agent',
      description: '自動產出 4 條具體招募與席位分配策略（含定向補強 8~12 位 IT 決策者、暫緩基層開發者擴招）。',
      targetTab: 'strategy',
      actionText: '查看 4 條 AI 活動策略建議',
      icon: Sparkles
    },
    {
      step: 9,
      title: '顯示 Top 20 Applicants (高優先名單)',
      agent: 'Applicant Screening Agent',
      description: '切換至篩選清單，查看高分企業 CIO、CTO 與創辦人名單，平均評分達 89+。',
      targetTab: 'applicants',
      actionText: '查看 Top 優先推薦人選',
      icon: Users
    },
    {
      step: 10,
      title: '點擊其中一位報名者',
      agent: 'Human-in-the-loop Interface',
      description: '點選任意名片（例如金融科技 CIO 林書豪或雲端 CTO 張家瑋），開啟深入決策面板。',
      targetTab: 'applicants',
      actionText: '點選名單卡片查看明細',
      icon: UserCheck
    },
    {
      step: 11,
      title: '查看 Explainable AI (可解釋 AI 推理)',
      agent: 'Explainable AI Engine',
      description: '閱讀「Why this recommendation?」具體決策理由、雷達分數、商業綜效及完整背景。',
      targetTab: 'applicants',
      actionText: '檢視可解釋性分析報告',
      icon: Sparkles
    },
    {
      step: 12,
      title: 'Organizer 做最後決定 (Human-in-the-loop)',
      agent: 'Human Decision Gate',
      description: '由活動主辦方點擊「Priority Invite / General Invite / Manual Review」，AI 永遠不直接自動拒絕！',
      targetTab: 'applicants',
      actionText: '主辦方完成最終裁決',
      icon: CheckCircle2
    }
  ];

  const activeStep = steps.find(s => s.step === currentStep) || steps[0];

  const handleNext = () => {
    if (currentStep < 12) {
      const next = currentStep + 1;
      setCurrentStep(next);
      onJumpToStep(next);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      onJumpToStep(prev);
    }
  };

  const handleGoToTarget = () => {
    onJumpToStep(currentStep);
    onClose();
  };

  const IconComp = activeStep.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden animate-in fade-in duration-150">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <Play className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">2-Minute Hackathon Demo Flow</h3>
              <p className="text-[11px] text-slate-400">完整體驗 EventGuard AI 的 12 個核心 Agentic 流程</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Pills */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 overflow-x-auto no-scrollbar flex items-center space-x-1.5">
          {steps.map(s => (
            <button
              key={s.step}
              onClick={() => {
                setCurrentStep(s.step);
                onJumpToStep(s.step);
              }}
              className={`w-7 h-7 rounded-full text-xs font-bold transition-all flex items-center justify-center ${
                s.step === currentStep
                  ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                  : s.step < currentStep
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {s.step}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
              STEP {activeStep.step} OF 12
            </span>
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
              <Cpu className="w-3.5 h-3.5 text-slate-600" />
              {activeStep.agent}
            </span>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
              <IconComp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">{activeStep.title}</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {activeStep.description}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">跳轉頁面：</span>
            <button
              onClick={handleGoToTarget}
              className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 hover:underline"
            >
              <span>{activeStep.actionText}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Footer controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors disabled:opacity-30 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>上一步</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleGoToTarget}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-200 transition-colors"
            >
              直接前往本步驟畫面
            </button>

            {currentStep < 12 ? (
              <button
                onClick={handleNext}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-1 shadow-sm"
              >
                <span>下一步 (Step {currentStep + 1})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center gap-1 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>完成 2 分鐘展示導覽</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
