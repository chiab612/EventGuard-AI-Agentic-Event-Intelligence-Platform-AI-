import React from 'react';
import { 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Zap, 
  Users, 
  ShieldCheck,
  Send
} from 'lucide-react';
import { StrategyRecommendation } from '../types';

interface StrategyPageProps {
  recommendations: StrategyRecommendation[];
  onNavigateTab: (tab: string) => void;
}

export const StrategyPage: React.FC<StrategyPageProps> = ({
  recommendations,
  onNavigateTab
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">Event Strategy Agent Recommendations</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            結合參與者結構與招募缺口，自動產生 4 大活動招募與席位調度策略
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('applicants')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
        >
          <span>執行名單邀請決策 (Human Review)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Recommendations Cards */}
      <div className="space-y-4">
        {recommendations.map(rec => (
          <div
            key={rec.id}
            className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 p-6 shadow-xs transition-all space-y-4"
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                  #{rec.number}
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{rec.title}</h3>
                  <span className="text-[11px] text-slate-400 font-mono">{rec.category}</span>
                </div>
              </div>

              <div>
                {rec.priority === 'high' && (
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                    High Priority Action
                  </span>
                )}
                {rec.priority === 'strategic' && (
                  <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                    Strategic Rebalance
                  </span>
                )}
                {rec.priority === 'medium' && (
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                    Ecosystem Value
                  </span>
                )}
              </div>
            </div>

            {/* 3 Pillars: Reason, Expected Impact, Suggested Action */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              
              {/* Reason */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center space-x-1.5 text-slate-700 font-bold">
                  <div className="w-2 h-2 rounded-full bg-slate-400" />
                  <h4>Reason (背後成因與診斷)</h4>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {rec.reason}
                </p>
              </div>

              {/* Expected Impact */}
              <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center space-x-1.5 text-emerald-900 font-bold">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <h4>Expected Impact (預期業務成效)</h4>
                </div>
                <p className="text-emerald-800 leading-relaxed">
                  {rec.expectedImpact}
                </p>
              </div>

              {/* Suggested Action */}
              <div className="bg-blue-50/70 border border-blue-200/70 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center space-x-1.5 text-blue-900 font-bold">
                  <Zap className="w-3.5 h-3.5 text-blue-600" />
                  <h4>Suggested Action (建議執行動作)</h4>
                </div>
                <p className="text-blue-900 leading-relaxed font-medium">
                  {rec.suggestedAction}
                </p>
              </div>

            </div>

            <div className="flex items-center justify-end pt-1">
              <button
                onClick={() => onNavigateTab('applicants')}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 hover:underline"
              >
                <span>至報名名單執行相關調整</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
