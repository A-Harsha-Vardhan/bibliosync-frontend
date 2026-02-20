import React from 'react';
import { User, Book, ArrowLeft, Shield, Calendar, AlertCircle, CheckCircle2, DollarSign } from 'lucide-react';

export default function GlobalHistory({ books, onBack, onPayFine }) {
    // Flatten and map logs using real data from the backend
    const allLogs = books.flatMap(book =>
        (book.borrowerHistory || []).map((log) => {
            return {
                id: log.id || Math.random(), 
                bookId: book.id,              // Added to identify the book for payment
                user: log.borrowerName,
                title: book.title,
                issueDate: log.issueDate,
                returnDate: log.returnDate || "In Progress",
                fine: log.fineAmount || 0,
                isDelayed: log.fineAmount > 0
            };
        })
    ).reverse();

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg"><Shield size={20} /></div>
                    <div>
                        <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">System Audit Log</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Transaction Records</p>
                    </div>
                </div>
                <button onClick={onBack} className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">
                    <ArrowLeft size={14} /> Back
                </button>
            </div>

            {/* Table Section */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Borrower & Book</th>
                                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Issue Date</th>
                                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Return Date</th>
                                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status / Fine</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {allLogs.length > 0 ? allLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="p-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-black text-slate-800 dark:text-white uppercase">{log.user}</span>
                                            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 italic">"{log.title}"</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400">
                                            <Calendar size={12} className="text-indigo-500" /> {log.issueDate}
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400">
                                            <Calendar size={12} className={log.isDelayed ? "text-red-500" : "text-emerald-500"} />
                                            {log.returnDate}
                                            {log.isDelayed && <AlertCircle size={12} className="text-red-500 animate-pulse" />}
                                        </div>
                                    </td>
                                    <td className="p-6 text-right">
                                        {log.fine > 0 ? (
                                            <div className="flex flex-col items-end gap-2">
                                                <span className="px-3 py-1 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-black rounded-lg">
                                                    ₹{log.fine}.00
                                                </span>
                                                <button 
                                                    onClick={() => onPayFine(log.bookId, log.title)}
                                                    className="flex items-center gap-1 text-[9px] font-black text-emerald-600 hover:text-emerald-700 uppercase bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md transition-all border border-emerald-100 dark:border-emerald-500/20"
                                                >
                                                    <DollarSign size={10} /> Collect & Settle
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-end gap-1 text-emerald-500">
                                                <CheckCircle2 size={14} />
                                                <span className="text-[10px] font-bold uppercase">Settled</span>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="4" className="p-20 text-center text-slate-400 italic text-sm">No transaction records found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}