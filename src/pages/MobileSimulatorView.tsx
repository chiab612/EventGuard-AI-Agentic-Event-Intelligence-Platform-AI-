import React, { useState } from 'react';
import { 
  Home, 
  Calendar, 
  Users, 
  Cpu, 
  BarChart2, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle, 
  HelpCircle, 
  AlertCircle,
  ArrowRight,
  Wifi,
  Battery,
  Signal,
  Check,
  Building2,
  Briefcase
} from 'lucide-react';
import { 
  Applicant, 
  EventConfig, 
  EventMetrics, 
  RecruitmentGapItem, 
  StrategyRecommendation, 
  AgentStep,
  WeightConfig,
  OrganizerDecision
} from '../types';
import { AskAgentBar } from '../components/AskAgentBar';
import { WeightsEditor } from '../components/WeightsEditor';

interface MobileSimulatorViewProps {
  eventConfig: EventConfig;
  metrics: EventMetrics;
  applicants: Applicant[];
  gaps: RecruitmentGapItem[];
  recommendations: StrategyRecommendation[];
  steps: AgentStep[];
  weights: WeightConfig;
  onChangeWeights: (newWeights: WeightConfig) => void;
  onResetWeights: () => void;
  onSelectApplicant: (applicant: Applicant) => void;
  onMakeDecision: (applicantId: string, decision: OrganizerDecision) => void;
  onExecutePrompt: (prompt: string) => Promise<void>;
  isProcessing: boolean;
  agentStatusText?: string;
  onRunWorkflow: () => void;
}

export const MobileSimulatorView: React.FC<MobileSimulatorViewProps> = ({
  eventConfig,
  metrics,
  applicants,
  gaps,
  recommendations,
  steps,
  weights,
  onChangeWeights,
  onResetWeights,
  onSelectApplicant,
  onMakeDecision,
  onExecutePrompt,
  isProcessing,
  agentStatusText,
  onRunWorkflow
}) => {
  const [mobileTab, setMobileTab] = useState<'home' | 'events' | 'applicants' | 'agents' | 'insights'>('home');
  const [applicantFilter, setApplicantFilter] = useState<'all' | 'high_priority' | 'review' | 'data_quality'>('all');

  const filteredApplicants = applicants.filter(a => {
    if (applicantFilter === 'high_priority') return a.recommendationTier === 'high_priority';
    if (applicantFilter === 'review') return a.recommendationTier === 'human_review';
    if (applicantFilter === 'data_quality') return a.recommendationTier === 'data_quality_review';
    return true;
  });

  const topGap = gaps.find(g => g.status === 'critical_deficit') || gaps[0];

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      
      {/* Simulation Info Badge */}
      <div className="mb-4 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-white shadow-sm border border-slate-700">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          Mobile App Demo Simulator (點擊畫面內任一按鈕皆可直接操作)
        </span>
      </div>

      {/* Phone Frame */}
      <div className="relative w-full max-w-[390px] h-[812px] bg-slate-950 rounded-[48px] p-3 shadow-2xl ring-12 ring-slate-800/80 border-4 border-slate-700/60 flex flex-col overflow-hidden">
        
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-between px-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
          <div className="w-2 h-2 rounded-full bg-blue-500/80 animate-pulse" />
        </div>

        {/* Screen Bezel / Container */}
        <div className="relative flex-1 bg-slate-50 rounded-[38px] overflow-hidden flex flex-col">
          
          {/* Top Status Bar */}
          <div className="pt-2 px-6 pb-2 flex items-center justify-between text-[11px] font-semibold text-slate-800 shrink-0 bg-white border-b border-slate-100">
            <span>9:41</span>
            <div className="flex items-center space-x-1.5 text-slate-700">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* App Header */}
          <div className="px-4 py-2.5 bg-slate-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xs">
                EG
              </div>
              <div>
                <span className="font-bold text-xs">EventGuard AI</span>
                <p className="text-[9px] text-blue-300">Agentic Intelligence</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
              Granite Ready
            </span>
          </div>

          {/* Scrollable Screen Content */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-4 no-scrollbar">
            
            {/* TAB: HOME */}
            {mobileTab === 'home' && (
              <div className="space-y-3.5">
                {/* Active Event Card */}
                <div className="bg-slate-900 text-white rounded-xl p-3.5 space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="bg-blue-600 font-bold px-1.5 py-0.2 rounded uppercase">
                      ACTIVE EVENT
                    </span>
                    <span className="text-slate-400 font-mono">126 Analyzed</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{eventConfig.name}</h3>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    {eventConfig.description}
                  </p>
                </div>

                {/* Metric Grid */}
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-white border border-emerald-200 rounded-xl p-2.5">
                    <span className="text-[10px] text-emerald-800 font-bold uppercase">High Priority</span>
                    <div className="text-xl font-extrabold text-slate-900">{metrics.highPriorityCount}</div>
                    <span className="text-[9px] text-slate-500">優先邀請</span>
                  </div>
                  <div className="bg-white border border-amber-200 rounded-xl p-2.5">
                    <span className="text-[10px] text-amber-800 font-bold uppercase">Human Review</span>
                    <div className="text-xl font-extrabold text-slate-900">{metrics.humanReviewCount}</div>
                    <span className="text-[9px] text-slate-500">需人工確認</span>
                  </div>
                </div>

                {/* Natural Language Ask Agent in Mobile */}
                <AskAgentBar
                  onExecutePrompt={onExecutePrompt}
                  isProcessing={isProcessing}
                  agentStatusText={agentStatusText}
                />

                {/* Recruitment Gap Preview */}
                {topGap && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-200 px-1.5 py-0.2 rounded">
                        GAP ALERT
                      </span>
                      <span className="text-[10px] text-rose-600 font-bold font-mono">
                        Deficit: {topGap.gapPercentage}%
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">{topGap.roleCategory}</h4>
                    <p className="text-[10px] text-slate-600 leading-tight">
                      現有僅 {topGap.currentPercentage}% (目標 {topGap.recommendedPercentage}%)，建議補強決策高管。
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB: EVENTS */}
            {mobileTab === 'events' && (
              <div className="space-y-3.5">
                <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-2 text-xs">
                  <h3 className="font-bold text-slate-900">Event Overview</h3>
                  <div className="space-y-1 text-slate-600 text-[11px]">
                    <p><strong>名稱：</strong>{eventConfig.name}</p>
                    <p><strong>類型：</strong>{eventConfig.type}</p>
                    <p><strong>時間：</strong>{eventConfig.date}</p>
                    <p><strong>容納：</strong>{eventConfig.capacity} 席 (報名: {metrics.totalApplicants})</p>
                  </div>
                </div>

                <WeightsEditor
                  weights={weights}
                  onChangeWeights={onChangeWeights}
                  onResetWeights={onResetWeights}
                />
              </div>
            )}

            {/* TAB: APPLICANTS */}
            {mobileTab === 'applicants' && (
              <div className="space-y-3">
                {/* Mobile Filter Tabs */}
                <div className="flex space-x-1 overflow-x-auto no-scrollbar pb-1">
                  <button
                    onClick={() => setApplicantFilter('all')}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap ${
                      applicantFilter === 'all'
                        ? 'bg-slate-900 text-white'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    全部 ({applicants.length})
                  </button>
                  <button
                    onClick={() => setApplicantFilter('high_priority')}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap ${
                      applicantFilter === 'high_priority'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    優先 ({metrics.highPriorityCount})
                  </button>
                  <button
                    onClick={() => setApplicantFilter('review')}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap ${
                      applicantFilter === 'review'
                        ? 'bg-amber-600 text-white'
                        : 'bg-white text-amber-800 border border-amber-200'
                    }`}
                  >
                    覆核 ({metrics.humanReviewCount})
                  </button>
                </div>

                {/* Cards */}
                <div className="space-y-2">
                  {filteredApplicants.map(app => (
                    <div
                      key={app.id}
                      className="bg-white border border-slate-200 rounded-xl p-3 space-y-2 shadow-2xs"
                    >
                      <div 
                        onClick={() => onSelectApplicant(app)}
                        className="cursor-pointer"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">{app.name}</h4>
                            <p className="text-[10px] text-slate-500 truncate">{app.company}</p>
                          </div>
                          <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                            {app.overallScore} 分
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-600 mt-1">
                          {app.jobTitle} • {app.industry} ({app.experienceYears}年)
                        </p>
                      </div>

                      {/* Decision buttons */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
                        <button
                          onClick={() => onSelectApplicant(app)}
                          className="text-blue-600 font-semibold"
                        >
                          Explain AI →
                        </button>

                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => onMakeDecision(app.id, 'priority_invite')}
                            className={`px-2 py-0.5 rounded font-bold ${
                              app.organizerDecision === 'priority_invite'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            }`}
                          >
                            Priority
                          </button>
                          <button
                            onClick={() => onMakeDecision(app.id, 'general_invite')}
                            className={`px-2 py-0.5 rounded font-bold ${
                              app.organizerDecision === 'general_invite'
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-50 text-blue-800 border border-blue-200'
                            }`}
                          >
                            General
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: AGENTS */}
            {mobileTab === 'agents' && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-slate-900">Agent Activity</h3>
                  <button
                    onClick={onRunWorkflow}
                    disabled={isProcessing}
                    className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded border border-blue-200"
                  >
                    Run Agent
                  </button>
                </div>

                <div className="space-y-2">
                  {steps.map(s => (
                    <div key={s.id} className="bg-white border border-slate-200 rounded-xl p-2.5 text-[11px] space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900">{s.title}</span>
                        <span className="text-[9px] font-mono text-emerald-600">✓ Done</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-tight">{s.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: INSIGHTS */}
            {mobileTab === 'insights' && (
              <div className="space-y-3.5">
                <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2">
                  <h4 className="text-xs font-bold text-slate-900">Participant Industry Mix</h4>
                  <div className="space-y-1.5 text-[10px]">
                    <div>
                      <div className="flex justify-between text-slate-700">
                        <span>AI / Software</span>
                        <span>42%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-[42%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-slate-700">
                        <span>Enterprise IT</span>
                        <span>28%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 w-[28%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-slate-700">
                        <span>Startup</span>
                        <span>15%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 w-[15%]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2">
                  <h4 className="text-xs font-bold text-slate-900">Top Strategy</h4>
                  <p className="text-[10px] text-slate-600 leading-relaxed">
                    <strong>#1 增加企業決策者比例：</strong>針對已報名 VIP 高階主管開放專屬圓桌通道，補齊 11% 缺口。
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Mobile Navigation Bar (Required: Home, Events, Applicants, Agents, Insights) */}
          <div className="h-14 bg-white border-t border-slate-200 px-2 flex items-center justify-around shrink-0">
            <button
              onClick={() => setMobileTab('home')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                mobileTab === 'home' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="text-[9px] mt-0.5">Home</span>
            </button>

            <button
              onClick={() => setMobileTab('events')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                mobileTab === 'events' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span className="text-[9px] mt-0.5">Events</span>
            </button>

            <button
              onClick={() => setMobileTab('applicants')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                mobileTab === 'applicants' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Users className="w-4 h-4" />
              <span className="text-[9px] mt-0.5">Applicants</span>
            </button>

            <button
              onClick={() => setMobileTab('agents')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                mobileTab === 'agents' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span className="text-[9px] mt-0.5">Agents</span>
            </button>

            <button
              onClick={() => setMobileTab('insights')}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                mobileTab === 'insights' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span className="text-[9px] mt-0.5">Insights</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
