import React, { useState } from 'react';
import { BookOpen, ArrowRight, Trash2, RotateCcw, History, User, Send } from 'lucide-react';

export default function BookCard({ book, onIssue, onReturn, onDelete, isAdmin }) {
  const [showHistory, setShowHistory] = useState(false);

  const isAvailable = book.availableCopies > 0;
  const isAllReturned = book.availableCopies >= book.totalCopies;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 flex flex-col justify-between border border-slate-200 dark:border-slate-800 h-[420px] transition-all hover:shadow-xl hover:translate-y-[-4px] relative group">

      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="flex gap-2">
          <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600">
            <BookOpen size={18} />
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`p-2.5 rounded-xl transition-all ${showHistory ? 'bg-indigo-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600'}`}
          >
            <History size={18} />
          </button>
        </div>

        {isAdmin && (
          <button
            onClick={() => onDelete(book.id)}
            className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 mt-6 overflow-hidden">
        {showHistory ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col h-full">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Borrower History</p>
            <div className="space-y-2 overflow-y-auto pr-1 custom-scrollbar">
              {book.borrowerHistory?.length > 0 ? (
                book.borrowerHistory.map((name, index) => (
                  <div key={index} className="flex items-center gap-3 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center border border-slate-200 dark:border-slate-600">
                      <User size={12} className="text-slate-400" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 truncate">{name}</span>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-10 opacity-40">
                  <History size={32} className="mb-2 text-slate-300" />
                  <p className="text-[10px] italic uppercase font-black">No Records</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-indigo-600 transition-colors line-clamp-2">{book.title}</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-tight truncate">{book.author}</p>
            </div>

            {/* Status Section */}
            <div className="mt-auto space-y-4 pb-2">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-slate-400">Inventory</span>
                <span className={isAvailable ? "text-emerald-500" : "text-red-500"}>
                  {book.availableCopies} / {book.totalCopies}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  style={{ width: `${(book.availableCopies / book.totalCopies) * 100}%` }}
                  className={`h-full transition-all duration-1000 ${isAvailable ? 'bg-indigo-600' : 'bg-red-500'}`}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6">
        {isAdmin ? (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onIssue(book.id, book.title)}
              disabled={!isAvailable}
              className="py-3 bg-slate-900 dark:bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-indigo-500 disabled:opacity-20 transition-all"
            >
              Issue
            </button>
            <button
              onClick={() => onReturn(book.id, book.title)}
              disabled={isAllReturned}
              className="py-3.5 px-4 bg-white dark:bg-slate-800 
               border border-slate-200 dark:border-slate-700 
               text-slate-700 dark:text-slate-200 
               rounded-2xl text-[10px] font-black uppercase tracking-widest 
               flex items-center justify-center gap-2 
               hover:bg-slate-50 dark:hover:bg-slate-700/50 
               transition-all active:scale-95 
               disabled:opacity-20 disabled:cursor-not-allowed"
              title={isAllReturned ? "All copies are already in library" : "Return book"}
            >
              <RotateCcw size={14} className="text-indigo-500" />
              <span>Return</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => onIssue(book.id, book.title)}
            disabled={!isAvailable}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-indigo-700 disabled:opacity-20 transition-all shadow-lg shadow-indigo-500/10"
          >
            {isAvailable ? <>Request Access <Send size={14} /></> : "Sold Out"}
          </button>
        )}
      </div>
    </div>
  );
}