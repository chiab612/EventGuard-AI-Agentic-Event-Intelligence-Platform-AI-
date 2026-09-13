import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  HelpCircle, 
  AlertCircle, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Building2, 
  Briefcase,
  Layers
} from 'lucide-react';
import { Applicant, EventConfig, EventMetrics, RecruitmentGapItem, StrategyRecommendation } from '../types';
import { AskAgentBar } from '../components/AskAgentBar';

interface DashboardPageProps {
  eventConfig: EventConfig;
  metrics: EventMetrics;
  applicants: Applicant[];
  gaps: RecruitmentGapItem[];
  recommendations: StrategyRecommendation[];
  onSelectApplicant: (applicant: Applicant) => void;
  onNavigateTab: (tab: string) => void;
  onExecutePrompt: (prompt: string) => Promise<void>;
  isProcessing: boolean;
  agentStatusText?: string;
  onRunWorkflow: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  eventConfig,
  metrics,
  applicants,
  gaps,
  recommendations,
  onSelectApplicant,
  onNavigateTab,
  onExecutePrompt,
  isProcessing,
  agentStatusText,
  onRunWorkflow
}) => {
  const highPriorityApplicants = applicants
    .filter(a => a.recommendationTier === 'high_priority')
    .slice(0, 6);

  const topGap = gaps.find(g => g.status === 'critical_deficit') || gaps[0];

  return (
    <div className="space-y-6">
      
      {/* Top Hero Banner: Active Event & Status */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 shadow-md border border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-blue-600 text-white font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              ACTIVE EVENT
            </span>
            <span className="text-xs text-slate-300 font-medium bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700">
              {eventConfig.type}
            </span>
            <span className="text-xs text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60 flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-3 h-3" />
              AI Analyzed: 126 / 126 (100%)
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {eventConfig.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {eventConfig.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              {eventConfig.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              場地容量：80 席 (目前報名: {metrics.totalApplicants} 人)
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
          <button
            onClick={() => onNavigateTab('applicants')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-blue-600/30 transition-colors flex items-center justify-center gap-2"
          >
            <span>檢視全部 126 位報名者</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigateTab('gap')}
            className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <span>深入缺口診斷 (Gap Analysis)</span>
          </button>
        </div>
      </div>

      {/* 4 Dashboard Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* High Priority */}
        <div 
          onClick={() => onNavigateTab('applicants')}
          className="bg-white rounded-xl border border-emerald-200 p-4 shadow-xs hover:border-emerald-400 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">High Priority</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{metrics.highPriorityCount}</span>
            <span className="text-xs text-slate-500 ml-1">/ 126</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1">
            極高度契合目標受眾，建議優先發放邀請函
          </p>
        </div>

        {/* Human Review */}
        <div 
          onClick={() => onNavigateTab('applicants')}
          className="bg-white rounded-xl border border-amber-200 p-4 shadow-xs hover:border-amber-400 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Human Review</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{metrics.humanReviewCount}</span>
            <span className="text-xs text-slate-500 ml-1">/ 126</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1">
            邊界案例或特殊背景，需由主辦方評估決定
          </p>
        </div>

        {/* General */}
        <div 
          onClick={() => onNavigateTab('applicants')}
          className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">General</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{metrics.generalCount}</span>
            <span className="text-xs text-slate-500 ml-1">/ 126</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1">
            符合一般標準或社群成員，視剩餘名額邀請
          </p>
        </div>

        {/* Data Quality Review */}
        <div 
          onClick={() => onNavigateTab('applicants')}
          className="bg-white rounded-xl border border-rose-200 p-4 shadow-xs hover:border-rose-400 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-800 uppercase tracking-wider">Data Quality Review</span>
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{metrics.dataQualityReviewCount}</span>
            <span className="text-xs text-slate-500 ml-1">/ 126</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1">
            資料欄位缺漏或重複登記，需人工核實身分
          </p>
        </div>
      </div>

      {/* Ask EventGuard Agent Component */}
      <AskAgentBar
        onExecutePrompt={onExecutePrompt}
        isProcessing={isProcessing}
        agentStatusText={agentStatusText}
      />

      {/* 2-Column Section: Health & Gaps + Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3): Health Metrics + Top Gap Alert */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Health & Fit Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Event Health & Participant Fit</h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Optimal Zone
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                <div className="flex justify-between items-center text-xs text-slate-600 mb-1.5">
                  <span className="font-semibold">活動健康度指標 (Event Health)</span>
                  <span className="font-bold text-base text-slate-900">{metrics.eventHealthScore} / 100</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${metrics.eventHealthScore}%` }} />
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  指標涵蓋報名總量、資料完整度、行業代表性與主動決策比例。
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                <div className="flex justify-between items-center text-xs text-slate-600 mb-1.5">
                  <span className="font-semibold">受眾目標適配度 (Participant Fit)</span>
                  <span className="font-bold text-base text-slate-900">{metrics.participantFitScore} / 100</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${metrics.participantFitScore}%` }} />
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  比對報名者之公司產業、職級深度與大會 4 大商業合作目標。
                </p>
              </div>
            </div>
          </div>

          {/* Recruitment Gap Highlight Banner */}
          {topGap && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50/70 border border-amber-300/80 rounded-xl p-5 shadow-xs">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded">
                        DETECTED GAP (招募缺口警訊)
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{topGap.roleCategory}</h4>
                    </div>
                    <div className="flex items-center space-x-3 my-2 text-xs font-mono">
                      <span className="text-slate-700">
                        Current: <strong className="text-rose-600 text-sm font-bold">{topGap.currentPercentage}%</strong>
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-700">
                        Recommended: <strong className="text-emerald-700 text-sm font-bold">{topGap.recommendedPercentage}%</strong>
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-rose-700 font-bold bg-rose-100 px-2 py-0.5 rounded">
                        Deficit: {topGap.gapPercentage}% (缺 {topGap.targetCountNeeded} 人)
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {topGap.recommendation}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateTab('gap')}
                  className="shrink-0 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1"
                >
                  <span>查看缺口報告</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* High Priority Applicants Preview */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Top Priority Applicants (高優先名單摘要)
                </h3>
                <p className="text-xs text-slate-500">
                  AI 篩選出最契合活動商務與技術目標的企業高階決策者
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('applicants')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
              >
                <span>查看全部 32 人</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highPriorityApplicants.map(app => (
                <div
                  key={app.id}
                  onClick={() => onSelectApplicant(app)}
                  className="bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 rounded-xl p-3.5 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {app.name}
                        </h4>
                        <p className="text-[11px] text-slate-600 flex items-center gap-1 mt-0.5 truncate">
                          <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{app.company}</span>
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {app.overallScore} 分
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                      <Briefcase className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{app.jobTitle}</span>
                    </p>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 truncate max-w-[170px]">
                      {app.industry} • {app.experienceYears}年
                    </span>
                    <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      <span>Explain</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (1/3): AI Recommendations */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">AI Strategy Recommendations</h3>
              </div>
              <button
                onClick={() => onNavigateTab('strategy')}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {recommendations.slice(0, 3).map(rec => (
                <div
                  key={rec.id}
                  onClick={() => onNavigateTab('strategy')}
                  className="bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg p-3 space-y-1.5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      #{rec.number}
                    </span>
                    <h5 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {rec.title}
                    </h5>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                    {rec.suggestedAction}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>{rec.category}</span>
                    <span className="text-blue-600 font-semibold">Impact: {rec.expectedImpact.slice(0, 16)}...</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Architecture Box */}
          <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Agentic Architecture
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              EventGuard AI 透過 5 組專業 Agent 协同工作，整合報名者篩選、結構智慧分析、資料品質覆核與戰略推薦。
            </p>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">Status: Orchestrator Idle</span>
              <button
                onClick={() => onNavigateTab('activity')}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
              >
                <span>Live Activity Log</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
