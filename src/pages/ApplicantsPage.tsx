import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  HelpCircle, 
  AlertCircle, 
  Building2, 
  Briefcase, 
  ArrowUpDown, 
  Check, 
  Clock, 
  ChevronRight, 
  ExternalLink,
  Award,
  Users
} from 'lucide-react';
import { Applicant, OrganizerDecision, RecommendationTier } from '../types';

interface ApplicantsPageProps {
  applicants: Applicant[];
  onSelectApplicant: (applicant: Applicant) => void;
  onMakeDecision: (applicantId: string, decision: OrganizerDecision) => void;
}

export const ApplicantsPage: React.FC<ApplicantsPageProps> = ({
  applicants,
  onSelectApplicant,
  onMakeDecision
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [decisionFilter, setDecisionFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'score' | 'experience' | 'completeness'>('score');

  const filteredApplicants = useMemo(() => {
    return applicants.filter(app => {
      // Search
      const term = searchTerm.toLowerCase();
      const matchesSearch = 
        !term ||
        app.name.toLowerCase().includes(term) ||
        app.company.toLowerCase().includes(term) ||
        app.jobTitle.toLowerCase().includes(term) ||
        app.industry.toLowerCase().includes(term);

      // Tier filter
      const matchesTier = 
        tierFilter === 'all' || app.recommendationTier === tierFilter;

      // Decision filter
      const matchesDecision = 
        decisionFilter === 'all' ||
        (decisionFilter === 'pending' && !app.organizerDecision) ||
        (decisionFilter === 'decided' && !!app.organizerDecision) ||
        app.organizerDecision === decisionFilter;

      return matchesSearch && matchesTier && matchesDecision;
    }).sort((a, b) => {
      if (sortBy === 'score') return b.overallScore - a.overallScore;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (sortBy === 'completeness') return b.dataCompleteness - a.dataCompleteness;
      return 0;
    });
  }, [applicants, searchTerm, tierFilter, decisionFilter, sortBy]);

  const counts = useMemo(() => {
    return {
      all: applicants.length,
      high_priority: applicants.filter(a => a.recommendationTier === 'high_priority').length,
      human_review: applicants.filter(a => a.recommendationTier === 'human_review').length,
      general: applicants.filter(a => a.recommendationTier === 'general').length,
      data_quality_review: applicants.filter(a => a.recommendationTier === 'data_quality_review').length,
    };
  }, [applicants]);

  const getTierBadge = (tier: RecommendationTier) => {
    switch (tier) {
      case 'high_priority':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            High Priority
          </span>
        );
      case 'human_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <HelpCircle className="w-3 h-3 text-amber-600" />
            Human Review
          </span>
        );
      case 'data_quality_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <AlertCircle className="w-3 h-3 text-rose-600" />
            Data Quality
          </span>
        );
      case 'general':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-300">
            General
          </span>
        );
    }
  };

  const getDecisionBadge = (decision: OrganizerDecision) => {
    switch (decision) {
      case 'priority_invite':
        return (
          <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded flex items-center gap-1">
            <Check className="w-3 h-3" />
            Priority Invite
          </span>
        );
      case 'general_invite':
        return (
          <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded flex items-center gap-1">
            <Check className="w-3 h-3" />
            General Invite
          </span>
        );
      case 'manual_review':
        return (
          <span className="text-[10px] font-bold bg-amber-600 text-white px-2 py-0.5 rounded flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Manual Review
          </span>
        );
      default:
        return (
          <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
            待主辦方裁決
          </span>
        );
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Header & Overview */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">Applicant Screening Agent Pool</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            全量報名資料智能評估、多維權重評分、Explainable AI 與 Human-in-the-loop 裁決
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500 font-medium">排序方式：</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="score">依匹配分數 (高到低)</option>
            <option value="experience">依工作資歷 (長到短)</option>
            <option value="completeness">依資料完整度 (高到低)</option>
          </select>
        </div>
      </div>

      {/* Tier Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setTierFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
            tierFilter === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>全部名單</span>
          <span className="bg-slate-800 text-slate-200 text-[10px] px-1.5 py-0.2 rounded-full">
            {counts.all}
          </span>
        </button>

        <button
          onClick={() => setTierFilter('high_priority')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
            tierFilter === 'high_priority'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>High Priority (優先邀請)</span>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
            {counts.high_priority}
          </span>
        </button>

        <button
          onClick={() => setTierFilter('human_review')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
            tierFilter === 'human_review'
              ? 'bg-amber-700 text-white shadow-xs'
              : 'bg-white text-amber-800 hover:bg-amber-50 border border-amber-200'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
          <span>Human Review (人工確認)</span>
          <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
            {counts.human_review}
          </span>
        </button>

        <button
          onClick={() => setTierFilter('general')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
            tierFilter === 'general'
              ? 'bg-slate-700 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>General (一般名單)</span>
          <span className="bg-slate-100 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full">
            {counts.general}
          </span>
        </button>

        <button
          onClick={() => setTierFilter('data_quality_review')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
            tierFilter === 'data_quality_review'
              ? 'bg-rose-700 text-white shadow-xs'
              : 'bg-white text-rose-800 hover:bg-rose-50 border border-rose-200'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
          <span>Data Quality Review</span>
          <span className="bg-rose-100 text-rose-800 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
            {counts.data_quality_review}
          </span>
        </button>
      </div>

      {/* Search & Secondary Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜尋姓名、任職公司、職稱或產業關鍵字..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto text-xs">
          <span className="text-slate-500 shrink-0">裁決狀態：</span>
          <select
            value={decisionFilter}
            onChange={(e) => setDecisionFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
          >
            <option value="all">全部狀態</option>
            <option value="pending">待裁決 (Pending)</option>
            <option value="decided">已裁決 (Decided)</option>
            <option value="priority_invite">Priority Invite</option>
            <option value="general_invite">General Invite</option>
            <option value="manual_review">Manual Review</option>
          </select>
        </div>
      </div>

      {/* Applicants List */}
      <div className="space-y-3">
        {filteredApplicants.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500 space-y-2">
            <p className="text-sm font-medium">沒有符合篩選條件的報名者資料</p>
            <p className="text-xs text-slate-400">請嘗試清除搜尋關鍵字或切換不同分層分類。</p>
          </div>
        ) : (
          filteredApplicants.map(app => (
            <div
              key={app.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 p-4 shadow-xs transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 group"
            >
              {/* Left Column: Avatar & Basic Information */}
              <div 
                onClick={() => onSelectApplicant(app)}
                className="flex items-start space-x-3.5 flex-1 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-blue-600 transition-colors">
                  {app.name.charAt(0)}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {app.name}
                    </h3>
                    {getTierBadge(app.recommendationTier)}
                    {app.isVipGuest && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-0.5">
                        <Award className="w-2.5 h-2.5 text-amber-600" />
                        VIP
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span className="font-semibold text-slate-800 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      {app.company}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-700">
                      <Briefcase className="w-3 h-3 text-slate-400" />
                      {app.jobTitle} ({app.experienceYears} 年資歷)
                    </span>
                    <span>•</span>
                    <span className="text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded text-[10px]">
                      {app.industry}
                    </span>
                  </p>

                  <p className="text-xs text-slate-500 line-clamp-1 italic">
                    "{app.whyRecommendation}"
                  </p>
                </div>
              </div>

              {/* Middle Column: Score & Breakdown Pill */}
              <div 
                onClick={() => onSelectApplicant(app)}
                className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center border-t lg:border-t-0 pt-2 lg:pt-0 shrink-0 cursor-pointer lg:px-4"
              >
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-slate-400 font-medium">整體匹配度:</span>
                  <span className="text-xl font-extrabold text-blue-600">{app.overallScore}</span>
                  <span className="text-xs text-slate-400">/ 100</span>
                </div>
                <div className="flex items-center space-x-1 mt-1 text-[10px] text-slate-400 font-mono">
                  <span>產業:{app.scoreBreakdown.industryRelevance}</span>
                  <span>•</span>
                  <span>職級:{app.scoreBreakdown.professionalFit}</span>
                  <span>•</span>
                  <span>目的:{app.scoreBreakdown.eventPurposeFit}</span>
                </div>
              </div>

              {/* Right Column: Decision Status & Fast Action Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0">
                <div className="mr-2">
                  {getDecisionBadge(app.organizerDecision)}
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => onMakeDecision(app.id, 'priority_invite')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                      app.organizerDecision === 'priority_invite'
                        ? 'bg-emerald-700 text-white'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                    }`}
                    title="決定為 Priority Invite"
                  >
                    Priority
                  </button>

                  <button
                    onClick={() => onMakeDecision(app.id, 'general_invite')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                      app.organizerDecision === 'general_invite'
                        ? 'bg-blue-700 text-white'
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200'
                    }`}
                    title="決定為 General Invite"
                  >
                    General
                  </button>

                  <button
                    onClick={() => onMakeDecision(app.id, 'manual_review')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                      app.organizerDecision === 'manual_review'
                        ? 'bg-amber-700 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                    }`}
                    title="決定為 Manual Review"
                  >
                    Review
                  </button>

                  <button
                    onClick={() => onSelectApplicant(app)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded transition-colors"
                    title="查看 Explainable AI 決策推理報告"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
