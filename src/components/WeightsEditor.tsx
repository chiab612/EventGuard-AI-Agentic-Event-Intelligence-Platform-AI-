import React from 'react';
import { RotateCcw, Sliders, CheckCircle2, AlertTriangle } from 'lucide-react';
import { WeightConfig } from '../types';
import { DEFAULT_WEIGHTS } from '../data/mockData';

interface WeightsEditorProps {
  weights: WeightConfig;
  onChangeWeights: (newWeights: WeightConfig) => void;
  onResetWeights: () => void;
  onApplyRecalculation?: () => void;
}

export const WeightsEditor: React.FC<WeightsEditorProps> = ({
  weights,
  onChangeWeights,
  onResetWeights,
  onApplyRecalculation
}) => {
  const sum = 
    weights.industryRelevance +
    weights.professionalFit +
    weights.eventPurposeFit +
    weights.potentialCollaboration +
    weights.vipRelevance +
    weights.dataQuality;

  const handleSliderChange = (key: keyof WeightConfig, value: number) => {
    onChangeWeights({
      ...weights,
      [key]: value
    });
  };

  const normalizeWeights = () => {
    if (sum === 0) {
      onResetWeights();
      return;
    }
    const factor = 100 / sum;
    const normalized: WeightConfig = {
      industryRelevance: Math.round(weights.industryRelevance * factor),
      professionalFit: Math.round(weights.professionalFit * factor),
      eventPurposeFit: Math.round(weights.eventPurposeFit * factor),
      potentialCollaboration: Math.round(weights.potentialCollaboration * factor),
      vipRelevance: Math.round(weights.vipRelevance * factor),
      dataQuality: 100 - (
        Math.round(weights.industryRelevance * factor) +
        Math.round(weights.professionalFit * factor) +
        Math.round(weights.eventPurposeFit * factor) +
        Math.round(weights.potentialCollaboration * factor) +
        Math.round(weights.vipRelevance * factor)
      )
    };
    onChangeWeights(normalized);
  };

  const fields: { key: keyof WeightConfig; label: string; desc: string; defaultVal: number }[] = [
    { key: 'industryRelevance', label: 'Industry Relevance (產業契合度)', desc: '目標產業如 AI、Cloud、Enterprise IT 等匹配程度', defaultVal: 30 },
    { key: 'professionalFit', label: 'Professional Fit (職務契合度)', desc: '目標職位如 CEO、CTO、CIO、IT 架構師主管等資歷', defaultVal: 25 },
    { key: 'eventPurposeFit', label: 'Event Purpose Fit (活動目的適配)', desc: '參與目的與技術交流、生態合作與採購意圖之吻合度', defaultVal: 15 },
    { key: 'potentialCollaboration', label: 'Potential Collaboration (潛在商業合作)', desc: '跨企業業務合作、技術授權或採購合作的潛在效益', defaultVal: 15 },
    { key: 'vipRelevance', label: 'VIP / Industry Relevance (行業代表性)', desc: '公協會領袖、關鍵企業發言人、具號召力之重點人物', defaultVal: 10 },
    { key: 'dataQuality', label: 'Data Quality (資料完整度)', desc: '公司名稱真實性、公開社群履歷查核與資料填寫品質', defaultVal: 5 },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">AI 評估權重配置 (Evaluation Weights)</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            動態調整 Applicant Screening Agent 的 6 大維度評分比重（總和維持 100%）
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            id="btn-reset-default-weights"
            type="button"
            onClick={onResetWeights}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default Weights</span>
          </button>
          {sum !== 100 && (
            <button
              type="button"
              onClick={normalizeWeights}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center gap-1 transition-colors"
            >
              <span>自動平衡為 100%</span>
            </button>
          )}
        </div>
      </div>

      {/* Sum Indicator */}
      <div className={`p-3 rounded-lg flex items-center justify-between text-xs font-medium ${
        sum === 100 
          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
          : 'bg-amber-50 text-amber-800 border border-amber-200'
      }`}>
        <div className="flex items-center space-x-2">
          {sum === 100 ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          )}
          <span>目前權重總和：<strong className="font-bold text-sm">{sum}%</strong> (目標: 100%)</span>
        </div>
        {sum === 100 ? (
          <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
            BALANCED 100%
          </span>
        ) : (
          <span className="text-[11px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono font-bold">
            {sum > 100 ? `超出 +${sum - 100}%` : `不足 -${100 - sum}%`}
          </span>
        )}
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(field => {
          const val = weights[field.key];
          return (
            <div key={field.key} className="bg-slate-50 border border-slate-200/80 rounded-lg p-3.5 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-800">{field.label}</span>
                <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {val}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">{field.desc}</p>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min={0}
                  max={60}
                  step={1}
                  value={val}
                  onChange={(e) => handleSliderChange(field.key, parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 font-mono w-10 text-right">
                  def: {field.defaultVal}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {onApplyRecalculation && (
        <div className="pt-2 flex justify-end">
          <button
            id="btn-apply-weights-recalc"
            onClick={onApplyRecalculation}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>套用權重並重新計算報名名單</span>
          </button>
        </div>
      )}
    </div>
  );
};
