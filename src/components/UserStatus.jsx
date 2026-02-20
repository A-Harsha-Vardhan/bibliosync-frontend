import React from 'react';
import { Clock, BookOpen, XCircle } from 'lucide-react';

export default function UserStatus({ pendingRequests, books, userName, onWithdraw }) {
    const myRequests = Array.isArray(pendingRequests) 
        ? pendingRequests.filter(req => req.userName === userName)
        : [];

    const myBooks = Array.isArray(books) 
        ? books.filter(book => 
            book.borrowerHistory?.some(log => 
                log.borrowerName === userName && !log.returnDate
            )
          )
        : [];

    return (
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-2">Your Activity</h3>
            <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar space-y-6">
                <div className="space-y-3">
                    <p className="text-[11px] font-bold text-slate-800 dark:text-white px-2 flex items-center gap-2">
                        <Clock size={14} className="text-amber-500" /> Requests
                    </p>
                    {myRequests.length === 0 ? (
                        <p className="text-[10px] text-slate-400 italic px-2">No active requests</p>
                    ) : (
                        myRequests.map(req => (
                            <div key={req.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 truncate w-32">{req.bookTitle}</span>
                                <button onClick={() => onWithdraw(req.id)} className="text-slate-300 hover:text-red-500"><XCircle size={16} /></button>
                            </div>
                        ))
                    )}
                </div>
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] font-bold text-slate-800 dark:text-white px-2 flex items-center gap-2">
                        <BookOpen size={14} className="text-indigo-500" /> Held Books
                    </p>
                    {myBooks.length === 0 ? (
                        <p className="text-[10px] text-slate-400 italic px-2">None held</p>
                    ) : (
                        myBooks.map(book => (
                            <div key={book.id} className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl border border-indigo-100/50">
                                <span className="text-[11px] font-bold text-indigo-900 dark:text-indigo-100 truncate block">{book.title}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}