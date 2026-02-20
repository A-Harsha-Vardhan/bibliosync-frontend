import { Book, CheckCircle, Activity } from 'lucide-react';

export default function StatsRow({ books }) {
  const total = books.length;
  const available = books.reduce((acc, b) => acc + b.availableCopies, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="text-indigo-600 mb-2"><Book size={20} /></div>
        <p className="text-slate-500 text-xs font-bold uppercase">Total Titles</p>
        <h3 className="text-2xl font-black">{total}</h3>
      </div>
      <div className="bg-indigo-600 p-6 rounded-3xl shadow-xl shadow-indigo-100 text-white">
        <div className="text-indigo-200 mb-2"><CheckCircle size={20} /></div>
        <p className="text-indigo-100 text-xs font-bold uppercase">In-Shelf Copies</p>
        <h3 className="text-2xl font-black">{available}</h3>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="text-emerald-500 mb-2"><Activity size={20} /></div>
        <p className="text-slate-500 text-xs font-bold uppercase">Server Status</p>
        <h3 className="text-xl font-bold text-emerald-500">Connected</h3>
      </div>
    </div>
  );
}