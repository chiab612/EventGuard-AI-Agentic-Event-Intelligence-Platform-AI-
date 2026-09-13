import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Tag, 
  Target, 
  Briefcase, 
  CheckCircle2, 
  Sparkles,
  Save
} from 'lucide-react';
import { EventConfig, WeightConfig } from '../types';
import { WeightsEditor } from '../components/WeightsEditor';

interface EventSettingsPageProps {
  eventConfig: EventConfig;
  onUpdateEventConfig: (newConfig: EventConfig) => void;
  weights: WeightConfig;
  onChangeWeights: (newWeights: WeightConfig) => void;
  onResetWeights: () => void;
  onApplyRecalculation: () => void;
}

export const EventSettingsPage: React.FC<EventSettingsPageProps> = ({
  eventConfig,
  onUpdateEventConfig,
  weights,
  onChangeWeights,
  onResetWeights,
  onApplyRecalculation
}) => {
  const [formData, setFormData] = useState<EventConfig>(eventConfig);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateEventConfig(formData);
    onApplyRecalculation();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleIndustryToggle = (ind: string) => {
    const exists = formData.targetIndustries.includes(ind);
    const updated = exists 
      ? formData.targetIndustries.filter(i => i !== ind)
      : [...formData.targetIndustries, ind];
    setFormData({ ...formData, targetIndustries: updated });
  };

  const handleRoleToggle = (role: string) => {
    const exists = formData.targetJobRoles.includes(role);
    const updated = exists
      ? formData.targetJobRoles.filter(r => r !== role)
      : [...formData.targetJobRoles, role];
    setFormData({ ...formData, targetJobRoles: updated });
  };

  const availableIndustries = [
    'AI', 'Cloud', 'Software', 'Enterprise IT', 'Cybersecurity', 
    'FinTech', 'Smart Mfg', 'HealthTech', 'E-commerce'
  ];

  const availableRoles = [
    'CEO', 'CTO', 'CIO', 'IT Manager', 'Developer', 'Product Manager', 
    'CISO', 'VP of Engineering', 'Architect'
  ];

  const availableGoals = [
    'Business Partnership', 'Technology Partnership', 'Brand Collaboration', 'Industry Networking'
  ];

  return (
    <div className="space-y-6">
      
      {/* Event Configuration Form */}
      <form onSubmit={handleSave} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Event Configuration (活動參數設定)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              設定活動核心資訊、受眾輪廓與業務目標，AI Agent 將依據此設定進行匹配與缺口分析
            </p>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <Save className="w-3.5 h-3.5" />
            <span>儲存活動設定並觸發重新計算</span>
          </button>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>活動設定已成功更新，各 Agent 已依據新目標完成重新推論！</span>
          </div>
        )}

        {/* Basic Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">活動名稱 (Event Name)</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">活動類型 (Event Type)</label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">活動時間 (Date & Time)</label>
            <input
              type="text"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">預期容納席位 (Capacity)</label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value, 10) || 80 })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1 text-xs">
          <label className="font-semibold text-slate-700">活動描述 (Event Description)</label>
          <textarea
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
          />
        </div>

        {/* Target Industries */}
        <div className="space-y-2 text-xs">
          <label className="font-semibold text-slate-700 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-blue-600" />
            目標產業 (Target Industries)
          </label>
          <div className="flex flex-wrap gap-2">
            {availableIndustries.map(ind => {
              const active = formData.targetIndustries.includes(ind);
              return (
                <button
                  key={ind}
                  type="button"
                  onClick={() => handleIndustryToggle(ind)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    active
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  {ind}
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Job Roles */}
        <div className="space-y-2 text-xs">
          <label className="font-semibold text-slate-700 flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
            目標職位角色 (Target Job Roles)
          </label>
          <div className="flex flex-wrap gap-2">
            {availableRoles.map(role => {
              const active = formData.targetJobRoles.includes(role);
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleToggle(role)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    active
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  {role}
                </button>
              );
            })}
          </div>
        </div>

        {/* Business Goals */}
        <div className="space-y-2 text-xs">
          <label className="font-semibold text-slate-700 flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-emerald-600" />
            活動業務目標 (Business Goals)
          </label>
          <div className="flex flex-wrap gap-2">
            {availableGoals.map(goal => (
              <span
                key={goal}
                className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md font-semibold text-xs"
              >
                ✓ {goal}
              </span>
            ))}
          </div>
        </div>
      </form>

      {/* AI Evaluation Weights Editor Component */}
      <WeightsEditor
        weights={weights}
        onChangeWeights={onChangeWeights}
        onResetWeights={onResetWeights}
        onApplyRecalculation={onApplyRecalculation}
      />

    </div>
  );
};
