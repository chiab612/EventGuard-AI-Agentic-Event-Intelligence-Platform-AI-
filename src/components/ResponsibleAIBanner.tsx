import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const ResponsibleAIBanner: React.FC = () => {
  return (
    <div className="bg-slate-900 text-slate-300 border-t border-slate-800 py-6 px-4 sm:px-6 lg:px-8 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/30">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-100 uppercase tracking-wider text-[11px]">
                Responsible AI & Ethics Guardrails
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.2 rounded border border-emerald-500/30 font-medium">
                Human-in-the-loop Active
              </span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed max-w-3xl">
              「AI 分析僅提供活動報名審核與活動規劃的輔助建議，不代表對個人的價值、品格或能力做出判定。」
              系統嚴格遵循可信賴 AI 原則，<strong>絕不採納</strong>性別、種族、宗教信仰、政治傾向或健康狀況等敏感個人特徵作為任何篩選維度。
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 self-end md:self-auto text-[11px] text-slate-400 font-mono">
          <span>Decision Support, Not Decision Maker</span>
          <span>•</span>
          <span className="text-blue-400">IBM Granite / watsonx Ready</span>
        </div>
      </div>
    </div>
  );
};
