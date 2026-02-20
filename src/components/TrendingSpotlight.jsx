import React from 'react';
import { TrendingUp, Star, Bookmark } from 'lucide-react';

export default function TrendingSpotlight({ books }) {
  // Mock data for the sparkline path
  const sparklinePath = "M 0 30 Q 10 10, 20 25 T 40 15 T 60 35 T 80 5 T 100 20";
  
  // Spotlight the first book or a fallback
  const featuredBook = books[0] || { title: "Nexus Chronicles", author: "A. Aspiron" };

  return (
    <div className="glass rounded-[2rem] p-6 border border-white/20 dark:border-slate-800/50 space-y-5 overflow-hidden relative">
      {/* Decorative Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-emerald-500" />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Market_Trend</p>
        </div>
        <div className="px-2 py-0.5 bg-emerald-500/10 rounded-full">
          <span className="text-[9px] font-black text-emerald-500">+12.5%</span>
        </div>
      </div>

      {/* Sparkline Visual */}
      <div className="h-12 w-full">
        <svg viewBox="0 0 100 40" className="w-full h-full stroke-emerald-500 fill-none stroke-[2] drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">
          <path d={sparklinePath} strokeLinecap="round" />
        </svg>
      </div>

      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">Featured_Pick</p>
            <h4 className="text-sm font-black text-slate-800 dark:text-white truncate w-36">
              {featuredBook.title}
            </h4>
            <p className="text-[10px] font-medium text-slate-400 italic">{featuredBook.author}</p>
          </div>
          <div className="p-2.5 bg-slate-900 dark:bg-slate-800 rounded-xl text-white shadow-lg">
            <Bookmark size={14} />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <div className="flex-1 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 w-2/3" />
        </div>
        <div className="flex-1 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 w-1/2" />
        </div>
      </div>
    </div>
  );
}