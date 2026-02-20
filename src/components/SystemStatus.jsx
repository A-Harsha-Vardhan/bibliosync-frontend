import React from 'react';
import { Database, ShieldCheck, Zap } from 'lucide-react';

export default function SystemStatus() {
  return (
    <div className="glass rounded-[2rem] p-6 border border-white/20 dark:border-slate-800/50 space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">System Status</p>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-500 uppercase">Live</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Database Health */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500">
              <Database size={14} />
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Database</span>
          </div>
          <span className="text-[10px] font-black text-slate-400">98% Synced</span>
        </div>

        {/* Security Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
              <ShieldCheck size={14} />
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Security</span>
          </div>
          <span className="text-[10px] font-black text-slate-400">JWT Active</span>
        </div>

        {/* Server Response */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
              <Zap size={14} />
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Latency</span>
          </div>
          <span className="text-[10px] font-black text-slate-400">12ms</span>
        </div>
      </div>
    </div>
  );
}