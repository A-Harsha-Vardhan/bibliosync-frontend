import React from 'react';
import { Terminal, Radio } from 'lucide-react';

export default function AdminTerminal() {
  return (
    <div className="glass rounded-[2rem] p-6 border border-white/20 dark:border-slate-800/50 space-y-6 overflow-hidden relative">
      {/* Background Glow for Radar */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[40px] rounded-full pointer-events-none" />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-indigo-500" />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Console_Output</p>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <Radio size={10} className="text-emerald-500 animate-pulse" />
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Port: 8080</span>
        </div>
      </div>

      {/* The Visual Radar & Terminal Content */}
      <div className="flex items-center gap-6">
        {/* Radar Visual */}
        <div className="relative flex items-center justify-center w-16 h-16">
          <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-full animate-ping" />
          <div className="absolute inset-2 border-2 border-indigo-500/40 rounded-full" />
          <div className="w-2 h-2 bg-indigo-600 rounded-full shadow-[0_0_10px_#4f46e5]" />
          <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent animate-[spin_4s_linear_infinite]" />
        </div>

        {/* System Messages */}
        <div className="flex-1 space-y-2 font-mono text-[9px]">
          <div className="flex gap-2">
            <span className="text-emerald-500 font-bold">LOG:</span>
            <span className="text-slate-400">Spring_Boot_Ready</span>
          </div>
          <div className="flex gap-2">
            <span className="text-indigo-500 font-bold">GET:</span>
            <span className="text-slate-400">Fetch_Catalog_200</span>
          </div>
          <div className="flex gap-2">
            <span className="text-amber-500 font-bold">SEC:</span>
            <span className="text-slate-400">JWT_Handshake_OK</span>
          </div>
        </div>
      </div>

      {/* Blinking Cursor Bar */}
      <div className="h-4 bg-slate-900/10 dark:bg-slate-900/50 rounded-lg flex items-center px-3 gap-2">
        <span className="text-indigo-500 font-bold text-[8px] tracking-tighter">$ root@bibliosync:</span>
        <div className="w-1.5 h-3 bg-indigo-500/40 animate-pulse" />
      </div>
    </div>
  );
}