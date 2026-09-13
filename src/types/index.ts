export type RecommendationTier = 
  | 'high_priority' 
  | 'human_review' 
  | 'general' 
  | 'data_quality_review';

export type OrganizerDecision = 
  | 'priority_invite' 
  | 'general_invite' 
  | 'manual_review'
  | null;

export interface ScoreBreakdown {
  industryRelevance: number;      // 0 - 100
  professionalFit: number;        // 0 - 100
  eventPurposeFit: number;        // 0 - 100
  potentialCollaboration: number; // 0 - 100
  vipRelevance: number;           // 0 - 100
  dataQuality: number;            // 0 - 100
}

export interface Applicant {
  id: string;
  name: string;
  avatarUrl?: string;
  company: string;
  jobTitle: string;
  industry: string;
  experienceYears: number;
  registrationPurpose: string;
  publicProfileUrl: string;
  previousEventParticipation: boolean;
  isVipGuest: boolean;
  dataCompleteness: number; // 0 - 100%
  overallScore: number;     // 0 - 100
  scoreBreakdown: ScoreBreakdown;
  recommendationTier: RecommendationTier;
  aiAnalysis: string;
  whyRecommendation: string;
  potentialCollaboration: string;
  dataQualityNotes?: string[];
  organizerDecision: OrganizerDecision;
  decisionTimestamp?: string;
  email?: string;
}

export interface EventConfig {
  id: string;
  name: string;
  type: string;
  description: string;
  date: string;
  capacity: number;
  targetIndustries: string[];
  targetJobRoles: string[];
  targetAudience: string[];
  businessGoals: string[];
  preferredConnections: string[];
}

export interface WeightConfig {
  industryRelevance: number;       // default 30
  professionalFit: number;         // default 25
  eventPurposeFit: number;         // default 15
  potentialCollaboration: number;  // default 15
  vipRelevance: number;            // default 10
  dataQuality: number;             // default 5
}

export type AgentStepStatus = 'pending' | 'running' | 'completed' | 'waiting_review' | 'error';

export interface AgentStep {
  id: string;
  agentName: string;
  title: string;
  description: string;
  status: AgentStepStatus;
  timestamp?: string;
  details?: string;
  findings?: string[];
}

export interface RecruitmentGapItem {
  id: string;
  roleCategory: string;
  currentPercentage: number;
  recommendedPercentage: number;
  gapPercentage: number;
  status: 'critical_deficit' | 'moderate_deficit' | 'balanced' | 'surplus';
  reason: string;
  recommendation: string;
  targetCountNeeded: number;
}

export interface StrategyRecommendation {
  id: string;
  number: number;
  title: string;
  reason: string;
  expectedImpact: string;
  suggestedAction: string;
  priority: 'high' | 'strategic' | 'medium';
  category: string;
}

export interface IndustryDistribution {
  name: string;
  percentage: number;
  count: number;
}

export interface JobRoleDistribution {
  name: string;
  percentage: number;
  count: number;
}

export interface ExperienceDistribution {
  range: string;
  percentage: number;
  count: number;
}

export interface EventMetrics {
  totalApplicants: number;
  analyzedCount: number;
  highPriorityCount: number;
  humanReviewCount: number;
  generalCount: number;
  dataQualityReviewCount: number;
  eventHealthScore: number;
  participantFitScore: number;
  decisionCount: number;
}
