import React, { useState } from 'react';
import { Sparkles, Send, CheckCircle2, ArrowRight, Loader2, Bot } from 'lucide-react';

interface AskAgentBarProps {
  onExecutePrompt: (prompt: string) => Promise<void>;
  isProcessing: boolean;
  agentStatusText?: string;
}

export const AskAgentBar: React.FC<AskAgentBarProps> = ({
  onExecutePrompt,
  isProcessing,
  agentStatusText
}) => {
  const [prompt, setPrompt] = useState('');

  const quickPrompts = [
    '幫我找出這場 AI 企業交流活動最值得優先邀請的 20 位參與者。',
    '分析目前報名者結構，告訴我還缺少哪些類型的參與者。',
    '幫我找出需要人工確認的報名資料。'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isProcessing) return;
    onExecutePrompt(prompt.trim());
  };

  const handleSelectQuickPrompt = (text: string) => {
    setPrompt(text);
    onExecutePrompt(text);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Ask EventGuard Agent</h3>
            <p className="text-xs text-slate-500">以自然語言驅動 Multi-Agent 決策輔助與參與者結構分析</p>
          </div>
        </div>
        <span className="text-[11px] font-mono font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
          EventGuard Orchestrator
        </span>
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="relative mb-3">
        <input
          id="input-ask-agent-prompt"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="例如：幫我找出最值得優先邀請的 20 位參與者，或分析目前缺少什麼背景..."
          disabled={isProcessing}
          className="w-full pl-4 pr-24 py-3 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 placeholder:text-slate-400 transition-all"
        />
        <button
          id="btn-submit-agent-prompt"
          type="submit"
          disabled={!prompt.trim() || isProcessing}
          className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-medium rounded-md transition-all flex items-center gap-1.5 disabled:opacity-40"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Orchestrating...</span>
            </>
          ) : (
            <>
              <span>Execute</span>
              <Send className="w-3 h-3" />
            </>
          )}
        </button>
      </form>

      {/* Status indicator when processing */}
      {isProcessing && (
        <div className="mb-3 p-3 bg-blue-50/80 border border-blue-200/80 rounded-lg flex items-center justify-between text-xs text-blue-900">
          <div className="flex items-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            <span className="font-medium">
              {agentStatusText || 'EventGuard Orchestrator 正在協調各專屬 Agent 分析數據中...'}
            </span>
          </div>
          <span className="font-mono text-[10px] text-blue-600 uppercase bg-blue-100 px-2 py-0.5 rounded">
            Agentic Workflow Active
          </span>
        </div>
      )}

      {/* Quick Prompts */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
        <span className="text-xs text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          快捷指令：
        </span>
        {quickPrompts.map((q, idx) => (
          <button
            key={idx}
            type="button"
            id={`btn-quick-prompt-${idx + 1}`}
            onClick={() => handleSelectQuickPrompt(q)}
            disabled={isProcessing}
            className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md transition-colors text-left flex items-center gap-1 disabled:opacity-50"
          >
            <span>{q}</span>
            <ArrowRight className="w-2.5 h-2.5 opacity-60" />
          </button>
        ))}
      </div>
    </div>
  );
};
