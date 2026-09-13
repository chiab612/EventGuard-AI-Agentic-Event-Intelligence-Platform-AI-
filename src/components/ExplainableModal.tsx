import React from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Building2, 
  Briefcase, 
  User, 
  Compass, 
  ExternalLink, 
  Check, 
  ShieldAlert, 
  Sparkles,
  Award,
  ArrowRight,
  Clock
} from 'lucide-react';
import { Applicant, OrganizerDecision, RecommendationTier } from '../types';

interface ExplainableModalProps {
  applicant: Applicant | null;
  onClose: () => void;
  onMakeDecision: (applicantId: string, decision: OrganizerDecision) => void;
}

export const ExplainableModal: React.FC<ExplainableModalProps> = ({
  applicant,
  onClose,
  onMakeDecision
}) => {
  if (!applicant) return null;

  const getTierBadge = (tier: RecommendationTier) => {
    switch (tier) {
      case 'high_priority':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            High Priority (優先邀請)
          </span>
        );
      case 'human_review':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            Human Review (人工確認)
          </span>
        );
      case 'data_quality_review':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            Data Quality Review (資料覆核)
          </span>
        );
      case 'general':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-300">
            General (一般名單)
          </span>
        );
    }
  };

  const getDecisionBadge = (decision: OrganizerDecision) => {
    switch (decision) {
      case 'priority_invite':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-600 text-white">
            <Check className="w-3.5 h-3.5" />
            已決定：Priority Invite
          </span>
        );
      case 'general_invite':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-600 text-white">
            <Check className="w-3.5 h-3.5" />
            已決定：General Invite
          </span>
        );
      case 'manual_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-600 text-white">
            <Clock className="w-3.5 h-3.5" />
            已決定：Manual Review
          </span>
        );
      default:
        return (
          <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            等待主辦方最終裁決
          </span>
        );
    }
  };

  const breakdownMetrics = [
    { label: 'Industry Relevance (產業契合)', value: applicant.scoreBreakdown.industryRelevance, weight: '30%' },
    { label: 'Professional Fit (職級契合)', value: applicant.scoreBreakdown.professionalFit, weight: '25%' },
    { label: 'Event Purpose Fit (目的相符)', value: applicant.scoreBreakdown.eventPurposeFit, weight: '15%' },
    { label: 'Potential Collaboration (商業合作潛力)', value: applicant.scoreBreakdown.potentialCollaboration, weight: '15%' },
    { label: 'VIP / Industry Relevance (行業代表性)', value: applicant.scoreBreakdown.vipRelevance, weight: '10%' },
    { label: 'Data Quality (資料完整度)', value: applicant.scoreBreakdown.dataQuality, weight: '5%' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              {applicant.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-slate-900">{applicant.name}</h3>
                {applicant.isVipGuest && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-0.5">
                    <Award className="w-3 h-3 text-amber-600" />
                    VIP GUEST
                  </span>
                )}
                {applicant.previousEventParticipation && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    歷屆參與
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1 font-medium text-slate-800">
                  <Building2 className="w-3 h-3 text-slate-400" />
                  {applicant.company}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-slate-400" />
                  {applicant.jobTitle} ({applicant.experienceYears} 年資歷)
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Top Score & Match Header */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900 text-white rounded-xl p-5">
            <div className="flex flex-col justify-center items-center sm:items-start border-b sm:border-b-0 sm:border-r border-slate-800 pb-4 sm:pb-0 sm:pr-4">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Overall Match Score</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl font-extrabold tracking-tight text-white">{applicant.overallScore}</span>
                <span className="text-sm text-slate-400">/ 100</span>
              </div>
              <span className="text-[11px] text-blue-400 mt-1">
                AI 加權多維度評估模型
              </span>
            </div>

            <div className="sm:col-span-2 flex flex-col justify-center">
              <span className="text-xs text-slate-400 font-semibold uppercase mb-1">AI Recommendation Tier</span>
              <div>{getTierBadge(applicant.recommendationTier)}</div>
              <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                {applicant.aiAnalysis}
              </p>
            </div>
          </div>

          {/* Explainable AI: Why this recommendation? */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-blue-900 font-bold text-sm mb-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h4>Why this recommendation? (決策推理說明)</h4>
            </div>
            <p className="text-xs text-slate-800 leading-relaxed">
              {applicant.whyRecommendation}
            </p>
          </div>

          {/* Potential Collaboration */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              Potential Collaboration (預期商業與技術綜效)
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {applicant.potentialCollaboration}
            </p>
          </div>

          {/* Score Breakdown Bars */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Score Breakdown (6 維度評估明細)
            </h4>
            <div className="space-y-3">
              {breakdownMetrics.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-700 font-medium">{item.label}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-400 font-mono text-[10px]">Weight {item.weight}</span>
                      <span className="font-bold text-slate-900">{item.value} / 100</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.value >= 85
                          ? 'bg-blue-600'
                          : item.value >= 70
                          ? 'bg-blue-400'
                          : 'bg-amber-400'
                      }`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Quality Notes (if any) */}
          {applicant.dataQualityNotes && applicant.dataQualityNotes.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs mb-2">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <h4>Data Quality Notes (資料品質備註 - 需人工確認)</h4>
              </div>
              <ul className="list-disc list-inside text-xs text-amber-800 space-y-1">
                {applicant.dataQualityNotes.map((note, nIdx) => (
                  <li key={nIdx}>{note}</li>
                ))}
              </ul>
              <p className="text-[11px] text-amber-700 mt-2 italic">
                * 注意：非惡意判定，僅標註資料缺漏或文字重複，建議由活動小組聯繫確認。
              </p>
            </div>
          )}

          {/* Registration Details */}
          <div className="border-t border-slate-200 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-medium">報名目的 (Registration Purpose)：</span>
              <p className="text-slate-800 mt-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                {applicant.registrationPurpose || '未填寫'}
              </p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">公開履歷與電子郵件：</span>
              <div className="mt-1 space-y-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                <p className="text-slate-700 truncate font-mono">
                  Email: {applicant.email || 'n/a'}
                </p>
                {applicant.publicProfileUrl ? (
                  <a
                    href={applicant.publicProfileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>{applicant.publicProfileUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-slate-400 italic">未填寫公開履歷連結</span>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Footer: Human-in-the-loop Final Decision */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Decision Workflow Arrow */}
          <div className="flex items-center space-x-2 text-xs">
            <div className="flex items-center space-x-1.5 text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>AI Recommendation</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <div className="flex items-center space-x-1.5 font-bold text-slate-800">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>Organizer Final Decision:</span>
            </div>
            {getDecisionBadge(applicant.organizerDecision)}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              id="btn-decision-priority-invite"
              onClick={() => onMakeDecision(applicant.id, 'priority_invite')}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                applicant.organizerDecision === 'priority_invite'
                  ? 'bg-emerald-700 text-white ring-2 ring-emerald-400 shadow-sm'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>Priority Invite</span>
            </button>

            <button
              id="btn-decision-general-invite"
              onClick={() => onMakeDecision(applicant.id, 'general_invite')}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                applicant.organizerDecision === 'general_invite'
                  ? 'bg-blue-700 text-white ring-2 ring-blue-400 shadow-sm'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
              }`}
            >
              <span>General Invite</span>
            </button>

            <button
              id="btn-decision-manual-review"
              onClick={() => onMakeDecision(applicant.id, 'manual_review')}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                applicant.organizerDecision === 'manual_review'
                  ? 'bg-amber-700 text-white ring-2 ring-amber-400 shadow-sm'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
              }`}
            >
              <span>Manual Review</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
