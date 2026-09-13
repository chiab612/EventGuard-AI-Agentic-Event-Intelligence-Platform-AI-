import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Play, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  AlertCircle,
  RefreshCw,
  Layers
} from 'lucide-react';
import { AgentStep } from '../types';

interface AgentActivityPageProps {
  steps: AgentStep[];
  onRunWorkflow: () => void;
  isProcessing: boolean;
}

export const AgentActivityPage: React.FC<AgentActivityPageProps> = ({
  steps,
  onRunWorkflow,
  isProcessing
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">EventGuard Agent Activity & Orchestration Trace</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            即時呈現 Multi-Agent 自主協同執行日誌、工具呼叫軌跡與 Human-in-the-loop 銜接狀態
          </p>
        </div>

        <button
          onClick={onRunWorkflow}
          disabled={isProcessing}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
          <span>{isProcessing ? 'Agent Workflow 執行中...' : '重新觸發完整 Agent Workflow'}</span>
        </button>
      </div>

      {/* Hero Architecture Tag */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-emerald-400 font-bold uppercase">
              AGENTIC WORKFLOW ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-300">
            並非單一語言模型對話框，而是由 Orchestrator 統一調度 4 大專屬 Agent 進行確定性工具呼叫與可解釋決策輸出。
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 shrink-0">
          <span>IBM Granite Adapter</span>
          <span>•</span>
          <span className="text-blue-400">Tool Calling Ready</span>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
          <Layers className="w-4 h-4 text-blue-600" />
          Execution Timeline (即時執行流程)
        </h3>

        <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-8">
          {steps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isRunning = step.status === 'running';
            const isWaitingReview = step.status === 'waiting_review';

            return (
              <div key={step.id} className="relative group">
                {/* Timeline node icon */}
                <div className={`absolute -left-[35px] top-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  isCompleted
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                    : isRunning
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse'
                    : isWaitingReview
                    ? 'bg-amber-500 text-white ring-4 ring-amber-100'
                    : 'bg-slate-200 text-slate-400'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : isRunning ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : isWaitingReview ? (
                    <Clock className="w-3.5 h-3.5" />
                  ) : (
                    <span className="text-[10px] font-mono">{idx + 1}</span>
                  )}
                </div>

                {/* Step Content */}
                <div className="space-y-1.5 bg-slate-50 border border-slate-200/80 rounded-xl p-4 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {step.agentName}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                    </div>

                    <div className="flex items-center space-x-2 text-xs">
                      {step.timestamp && (
                        <span className="text-slate-400 font-mono text-[10px]">{step.timestamp}</span>
                      )}
                      {isCompleted && (
                        <span className="text-emerald-700 font-semibold text-[11px]">✓ Completed</span>
                      )}
                      {isRunning && (
                        <span className="text-blue-600 font-semibold text-[11px] animate-pulse">● Running...</span>
                      )}
                      {isWaitingReview && (
                        <span className="text-amber-700 font-semibold text-[11px]">● Human Review Gate</span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Findings or Details */}
                  {step.findings && step.findings.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200 text-xs space-y-1">
                      <span className="text-slate-500 font-semibold text-[11px]">Agent Findings & Metrics:</span>
                      <ul className="list-disc list-inside text-slate-700 space-y-0.5 text-[11px]">
                        {step.findings.map((f, fIdx) => (
                          <li key={fIdx}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {step.details && (
                    <div className="mt-2 text-[11px] text-slate-500 bg-white p-2 rounded border border-slate-200 font-mono">
                      {step.details}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
