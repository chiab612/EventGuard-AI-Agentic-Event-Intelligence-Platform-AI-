import React from 'react';
import { 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  Target, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  UserPlus
} from 'lucide-react';
import { RecruitmentGapItem } from '../types';

interface RecruitmentGapPageProps {
  gaps: RecruitmentGapItem[];
  onNavigateTab: (tab: string) => void;
}

export const RecruitmentGapPage: React.FC<RecruitmentGapPageProps> = ({
  gaps,
  onNavigateTab
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold text-slate-900">Event Recruitment Gap Analysis</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            比對活動原本設定之 Target Audience 與現行 126 位報名者之實質結構缺口
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('strategy')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
        >
          <span>查看策略處方 (Strategy Recommendations)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Core Highlight Card: The Main Decision Maker Gap */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <span className="bg-white/20 text-white text-[11px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
            CRITICAL GAP IDENTIFIED
          </span>
          <span className="text-xs text-amber-100 font-semibold">
            Agentic Gap Engine • Priority Action
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-extrabold text-white">
            Enterprise Decision Makers (企業決策者比例嚴重赤字)
          </h3>
          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed max-w-3xl">
            「目前活動的技術相關參與者比例較高，但企業決策者比例偏低。若本活動主要目標為企業合作，建議增加 CTO、CIO、IT Manager 等職位的邀請。」
          </p>
        </div>

        {/* Visual Gap Comparison */}
        <div className="bg-slate-950/40 rounded-xl p-4 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="border-b sm:border-b-0 sm:border-r border-white/10 pb-3 sm:pb-0 sm:pr-3">
            <span className="text-[11px] text-amber-200 uppercase font-semibold">Current (現有佔比)</span>
            <div className="text-3xl font-extrabold text-white mt-1">9%</div>
            <span className="text-[10px] text-amber-200">僅 11 位企業決策主管</span>
          </div>

          <div className="border-b sm:border-b-0 sm:border-r border-white/10 pb-3 sm:pb-0 sm:pr-3">
            <span className="text-[11px] text-amber-200 uppercase font-semibold">Recommended (目標配額)</span>
            <div className="text-3xl font-extrabold text-white mt-1">20%</div>
            <span className="text-[10px] text-amber-200">至少需達到 16~25 位</span>
          </div>

          <div className="flex flex-col justify-center items-center">
            <span className="text-[11px] text-amber-200 uppercase font-semibold">Recruitment Deficit (招募缺口)</span>
            <div className="text-3xl font-extrabold text-amber-300 mt-1">-11%</div>
            <span className="text-[10px] text-amber-200 font-bold bg-white/20 px-2 py-0.5 rounded mt-1">
              急需定向補強 8～14 位
            </span>
          </div>
        </div>
      </div>

      {/* All Detailed Gaps List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          All Evaluated Personas & Role Gaps (全方位受眾結構診斷)
        </h3>

        <div className="space-y-4">
          {gaps.map(gap => {
            const isDeficit = gap.gapPercentage < 0;
            const isSurplus = gap.gapPercentage > 0;

            return (
              <div
                key={gap.id}
                className={`bg-white rounded-xl border p-5 shadow-xs transition-all space-y-3 ${
                  gap.status === 'critical_deficit'
                    ? 'border-amber-300 ring-1 ring-amber-200'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2">
                    {gap.status === 'critical_deficit' ? (
                      <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                        <TrendingDown className="w-4 h-4" />
                      </div>
                    ) : gap.status === 'surplus' ? (
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                    )}
                    <h4 className="text-sm font-bold text-slate-900">{gap.roleCategory}</h4>
                  </div>

                  <div className="flex items-center space-x-2">
                    {gap.status === 'critical_deficit' && (
                      <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                        Critical Deficit (-11%)
                      </span>
                    )}
                    {gap.status === 'moderate_deficit' && (
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                        Moderate Deficit (-4%)
                      </span>
                    )}
                    {gap.status === 'surplus' && (
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                        Surplus / Saturated (+9%)
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Visualizer */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-600">
                      Current: <strong>{gap.currentPercentage}%</strong>
                    </span>
                    <span className="text-slate-600">
                      Target: <strong>{gap.recommendedPercentage}%</strong>
                    </span>
                  </div>

                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full transition-all duration-700 ${
                        isDeficit ? 'bg-amber-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${gap.currentPercentage}%` }}
                    />
                    <div
                      className="h-full bg-slate-300 opacity-60 border-l border-white"
                      style={{ width: `${Math.max(0, gap.recommendedPercentage - gap.currentPercentage)}%` }}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                    <span className="text-slate-500 font-semibold">成因診斷 (Root Cause):</span>
                    <p className="text-slate-700 mt-1 leading-relaxed">{gap.reason}</p>
                  </div>
                  <div className="bg-blue-50/70 p-3 rounded-lg border border-blue-200/70">
                    <span className="text-blue-900 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      AI 處方建議 (AI Recommendation):
                    </span>
                    <p className="text-slate-800 mt-1 leading-relaxed">{gap.recommendation}</p>
                  </div>
                </div>

                {gap.targetCountNeeded > 0 && (
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500 flex items-center gap-1">
                      <UserPlus className="w-3.5 h-3.5 text-blue-600" />
                      建議定向增補配額：<strong>{gap.targetCountNeeded} 名</strong>
                    </span>
                    <button
                      onClick={() => onNavigateTab('applicants')}
                      className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                    >
                      前往篩選名單發放邀請 →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
