import React from 'react';
import { 
  PieChart, 
  BarChart3, 
  TrendingUp, 
  Award, 
  Users, 
  Briefcase, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { 
  MOCK_INDUSTRY_MIX, 
  MOCK_JOB_ROLE_MIX, 
  MOCK_EXPERIENCE_MIX 
} from '../data/mockData';
import { Applicant } from '../types';

interface EventIntelligencePageProps {
  applicants: Applicant[];
  onNavigateTab: (tab: string) => void;
}

export const EventIntelligencePage: React.FC<EventIntelligencePageProps> = ({
  applicants,
  onNavigateTab
}) => {
  const vipCount = applicants.filter(a => a.isVipGuest).length;
  const vipPercentage = Math.round((vipCount / Math.max(1, applicants.length)) * 100);

  const colors = [
    'bg-blue-600',
    'bg-indigo-600',
    'bg-sky-500',
    'bg-amber-500',
    'bg-slate-400'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">Event Intelligence Agent Analytics</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            深度分析 126 位報名者之產業結構、職能配比、高層決策者佔比與商業綜效
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('gap')}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
        >
          <span>查看招募缺口 (Recruitment Gap)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Primary Mix Cards (2 Grid Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Industry Mix */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-blue-600" />
                Participant Industry Mix (產業分佈)
              </h3>
              <p className="text-[11px] text-slate-500">以 AI / 軟體與企業 IT 為主軸 (佔比 70%)</p>
            </div>
            <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              5 Major Sectors
            </span>
          </div>

          <div className="space-y-3">
            {MOCK_INDUSTRY_MIX.map((item, idx) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-800">{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400 font-mono text-[11px]">{item.count} 人</span>
                    <span className="font-bold text-slate-900 w-10 text-right">{item.percentage}%</span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${colors[idx % colors.length]}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-lg p-3 text-[11px] text-slate-600 border border-slate-200/80 leading-relaxed">
            <strong>AI Agent 洞察：</strong>產業結構與活動主題「AI Enterprise Networking」高度契合，軟體與 IT 基建生態完整，建議加強製造業邊緣運算與金融科技應用比例。
          </div>
        </div>

        {/* Job Role Mix */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-600" />
                Participant Job Role Mix (職務階層分佈)
              </h3>
              <p className="text-[11px] text-slate-500">開發者比例偏高 (31%)，決策主管需平衡</p>
            </div>
            <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Needs Rebalance
            </span>
          </div>

          <div className="space-y-3">
            {MOCK_JOB_ROLE_MIX.map((item, idx) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-800">{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400 font-mono text-[11px]">{item.count} 人</span>
                    <span className="font-bold text-slate-900 w-10 text-right">{item.percentage}%</span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      item.name === 'Developer'
                        ? 'bg-amber-500'
                        : item.name === 'Executive'
                        ? 'bg-blue-600'
                        : 'bg-indigo-500'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50/70 rounded-lg p-3 text-[11px] text-amber-900 border border-amber-200 leading-relaxed">
            <strong>AI Agent 警示：</strong>目前 Developer (31%) + Manager (27%) 佔超過一半，但真正具採購簽約權的 Executive 僅 18%（高階決策者僅 9%），存在失衡風險。
          </div>
        </div>

      </div>

      {/* Experience & VIP Mix (2 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Experience Mix */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            Experience Seniority Mix (從業資歷分佈)
          </h3>

          <div className="space-y-3">
            {MOCK_EXPERIENCE_MIX.map(item => (
              <div key={item.range} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-800">{item.range}</span>
                  <span className="font-bold text-slate-900">{item.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500">
            資深人員 (8 年以上) 總合高達 58%，具備高水準產業實戰交流深度。
          </p>
        </div>

        {/* VIP & Synergy Mix */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-3">
            <Award className="w-4 h-4 text-amber-500" />
            VIP & Collaboration Potential Mix
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center space-y-1">
              <span className="text-[11px] text-slate-500 uppercase font-semibold">VIP 嘉賓佔比</span>
              <div className="text-2xl font-extrabold text-amber-600">{vipPercentage}%</div>
              <p className="text-[10px] text-slate-500">含公協會秘書長、上市公司 CIO</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center space-y-1">
              <span className="text-[11px] text-slate-500 uppercase font-semibold">跨產業媒合潛力</span>
              <div className="text-2xl font-extrabold text-blue-600">86%</div>
              <p className="text-[10px] text-slate-500">具備跨界採購或試點專案可能</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-[11px] text-blue-900 leading-relaxed">
            <strong>商業媒合建議：</strong>已辨識出 3 組跨界技術落地強需求組合（金融大模型合規、智慧工廠邊緣安全、混合雲算力調度）。
          </div>
        </div>

      </div>

    </div>
  );
};
