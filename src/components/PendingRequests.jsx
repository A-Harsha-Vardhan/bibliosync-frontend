import React from 'react';
import { User, Check, X, AlertCircle } from 'lucide-react';

export default function PendingRequests({ requests, onApprove, onDecline }) {
  return (
    <div className="glass rounded-[2rem] p-6 border border-white/20 dark:border-slate-800/50 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Pending Requests</p>
        <div className="bg-amber-500 w-2 h-2 rounded-full animate-pulse" />
      </div>

      <div className="space-y-3">
        {requests.length === 0 ? (
          <p className="text-[10px] text-slate-400 italic text-center py-4">No requests waiting</p>
        ) : (
          requests.map(req => (
            <div key={req.id} className="p-3 bg-white/50 dark:bg-slate-900/30 rounded-2xl border border-white/20 group">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                    {req.userName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-slate-700 dark:text-slate-200">{req.userName}</p>
                    <p className="text-[9px] font-medium text-slate-400 truncate w-24">{req.bookTitle}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button 
                  onClick={() => onApprove(req.id)}
                  className="py-1.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white rounded-lg transition-all flex items-center justify-center"
                >
                  <Check size={12} />
                </button>
                <button 
                  onClick={() => onDecline(req.id)}
                  className="py-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all flex items-center justify-center"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}