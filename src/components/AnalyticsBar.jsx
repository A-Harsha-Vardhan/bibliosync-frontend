import React from 'react';
import { BookCopy, Activity, Zap, Layers, Percent } from 'lucide-react';

export default function AnalyticsBar({ books = [] }) {
  const totalAssets = books.length;
  const totalCopies = books.reduce((acc, b) => acc + (b.totalCopies || 0), 0);
  const available = books.reduce((acc, b) => acc + (b.availableCopies || 0), 0);
  const issued = totalCopies - available;
  const healthRate = totalCopies > 0 ? Math.round((available / totalCopies) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Unique Titles */}
      <div className="glass p-6 rounded-3xl border border-slate-100 dark:border-slate-800/50 shadow-sm transition-all duration-500">
        <div className="flex items-center gap-3 mb-2">
          <Layers className="text-indigo-600 dark:text-indigo-400" size={18} />
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Unique Titles</span>
        </div>
        <h4 className="text-3xl font-black text-slate-800 dark:text-white">{totalAssets}</h4>
      </div>
      
      {/* Total Inventory */}
      <div className="glass p-6 rounded-3xl border border-slate-100 dark:border-slate-800/50 shadow-sm transition-all duration-500">
        <div className="flex items-center gap-3 mb-2">
          <BookCopy className="text-emerald-600 dark:text-emerald-400" size={18} />
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Total Copies</span>
        </div>
        <h4 className="text-3xl font-black text-slate-800 dark:text-white">{totalCopies}</h4>
      </div>

      {/* Issued Items */}
      <div className="glass p-6 rounded-3xl border border-slate-100 dark:border-slate-800/50 shadow-sm transition-all duration-500">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="text-amber-500 dark:text-amber-400" size={18} />
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Currently Issued</span>
        </div>
        <h4 className="text-3xl font-black text-slate-800 dark:text-white">{issued}</h4>
      </div>

      {/* Stock Health Percentage */}
      <div className="glass p-6 rounded-3xl border border-slate-100 dark:border-slate-800/50 shadow-sm transition-all duration-500">
        <div className="flex items-center gap-3 mb-2">
          <Percent className="text-rose-500 dark:text-rose-400" size={18} />
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">In-Stock Rate</span>
        </div>
        <div className="flex items-end gap-2">
            <h4 className="text-3xl font-black text-slate-800 dark:text-white">{healthRate}%</h4>
            <span className="text-[10px] mb-1 font-bold text-slate-400 uppercase">Available</span>
        </div>
      </div>
    </div>
  );
}