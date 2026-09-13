import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  Play, 
  Smartphone, 
  LayoutDashboard,
  RotateCcw
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  viewMode: 'desktop' | 'mobile';
  setViewMode: (mode: 'desktop' | 'mobile') => void;
  onLoadDemo: () => void;
  onRunWorkflow: () => void;
  onStartTwoMinuteDemo: () => void;
  isProcessing: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  viewMode,
  setViewMode,
  onLoadDemo,
  onRunWorkflow,
  onStartTwoMinuteDemo,
  isProcessing
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'applicants', label: 'Applicant Screening' },
    { id: 'intelligence', label: 'Event Intelligence' },
    { id: 'gap', label: 'Recruitment Gap' },
    { id: 'strategy', label: 'Strategy Recommendations' },
    { id: 'weights', label: 'Event & Weights' },
    { id: 'activity', label: 'Agent Activity' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Top tier: Brand & Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-white">EventGuard AI</span>
                <span className="text-[10px] uppercase font-semibold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-400/30">
                  Agentic Platform
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Better Applicants. Better Events. Better Connections.
              </p>
            </div>
          </div>

          {/* Integration Status Badge */}
          <div className="hidden lg:flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-medium">Demo AI Provider</span>
            <span className="text-slate-500">•</span>
            <span className="text-blue-400 font-medium flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5" />
              IBM Granite / watsonx ready
            </span>
          </div>

          {/* Quick Primary Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* View Mode Toggle: Desktop vs Mobile simulator */}
            <button
              id="btn-toggle-view-mode"
              onClick={() => setViewMode(viewMode === 'desktop' ? 'mobile' : 'desktop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border ${
                viewMode === 'mobile'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              title="切換手機模擬介面"
            >
              {viewMode === 'mobile' ? (
                <>
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Desktop View</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile App Demo</span>
                </>
              )}
            </button>

            {/* Load Demo Event Button */}
            <button
              id="btn-load-demo-event"
              onClick={onLoadDemo}
              disabled={isProcessing}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-mono uppercase tracking-wider text-[11px]">LOAD DEMO EVENT</span>
            </button>

            {/* Run EventGuard Agent Button */}
            <button
              id="btn-run-eventguard-agent"
              onClick={onRunWorkflow}
              disabled={isProcessing}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="font-mono uppercase tracking-wider text-[11px]">
                {isProcessing ? 'AGENT RUNNING...' : 'RUN EVENTGUARD AGENT'}
              </span>
            </button>

            {/* 2-Min Demo Tour */}
            <button
              id="btn-2min-demo"
              onClick={onStartTwoMinuteDemo}
              className="hidden sm:flex px-2.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-700/50 items-center gap-1 transition-colors"
            >
              <Play className="w-3 h-3 fill-emerald-400 text-emerald-400" />
              <span>2-Min Demo</span>
            </button>
          </div>
        </div>

        {/* Bottom tier: Desktop Navigation Tabs */}
        {viewMode === 'desktop' && (
          <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2 border-t border-slate-800/80 no-scrollbar">
            {tabs.map(tab => {
              const active = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
};
