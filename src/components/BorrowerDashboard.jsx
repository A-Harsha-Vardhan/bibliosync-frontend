import React, { useState } from 'react';
import { LogOut, BookMarked, Sparkles, Search, Compass, Flame, Shield, Calendar, BookOpen, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import BookCard from './BookCard';
import ThemeToggle from './ThemeToggle';
import UserStatus from './UserStatus';
import CategoryFilter from './CategoryFilter';

export default function BorrowerDashboard({ user, books, onLogout, onRequest, onWithdraw, pendingRequests }) {
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState('catalog');
    const [activeCategory, setActiveCategory] = useState("All");
    
    // --- State for the Success Popup ---
    const [requestSuccess, setRequestSuccess] = useState(false);

    // --- Helper to handle the request and show popup ---
    const handleRequestClick = (bookId, title) => {
        onRequest(bookId, title); // Triggers the existing logic in App.jsx
        setRequestSuccess(true);
        
        // Auto-hide the popup after 3 seconds
        setTimeout(() => setRequestSuccess(false), 3000);
    };

    const filteredBooks = Array.isArray(books) 
        ? books.filter(book => {
            const matchesCategory = activeCategory === "All" || book.category === activeCategory;
            const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) || 
                                 book.author.toLowerCase().includes(search.toLowerCase());
            return matchesCategory && matchesSearch;
        })
        : [];

    const personalHistory = Array.isArray(books) 
        ? books.flatMap(book => 
            (book.borrowerHistory || [])
                .filter(log => log.borrowerName === user.name)
                .map(log => ({
                    ...log,
                    title: book.title,
                    id: `${book.id}-${log.issueDate}`
                }))
          )
        : [];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950 transition-all duration-1000 relative overflow-hidden pb-20">
            
            {/* --- REQUEST SUCCESS POPUP --- */}
            <AnimatePresence>
                {requestSuccess && (
                    <motion.div 
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] w-full max-w-md px-4"
                    >
                        <div className="bg-white/90 dark:bg-slate-900/90 border border-indigo-500/30 p-6 rounded-[2.5rem] shadow-2xl flex items-center gap-4 backdrop-blur-xl">
                            <div className="bg-gradient-to-br from-indigo-600 to-fuchsia-600 p-3 rounded-2xl text-white shadow-lg animate-bounce">
                                <Sparkles size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight">Request Logged!</h4>
                                <p className="text-[10px] font-bold text-slate-400 leading-relaxed">
                                    The librarian will review your access shortly. Check your activity for updates.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Aurora Accents */}
            <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-indigo-500/10 rounded-full blur-[140px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-fuchsia-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto p-8 lg:p-12">
                
                {/* --- HEADER --- */}
                <header className="flex justify-between items-center mb-16">
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-indigo-600 to-fuchsia-600 p-3 rounded-2xl text-white shadow-xl rotate-3">
                            <BookMarked size={28} />
                        </div>
                        <h1 className="text-3xl font-black tracking-tighter text-slate-800 dark:text-white leading-none uppercase">
                            Biblio<span className="text-indigo-600">Lounge</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                            <span className="cursor-pointer hover:text-indigo-600 transition-colors flex items-center gap-2"><Compass size={14} /> Discover</span>
                            <span className="cursor-pointer hover:text-indigo-600 transition-colors flex items-center gap-2"><Flame size={14} /> Trending</span>
                        </div>
                        <ThemeToggle />
                        <button onClick={onLogout} className="p-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/20 text-slate-400 hover:text-red-500 transition-all shadow-sm">
                            <LogOut size={22} />
                        </button>
                    </div>
                </header>

                {/* --- HERO SECTION --- */}
                <div className="glass p-12 rounded-[3.5rem] mb-16 border border-white/40 dark:border-slate-800/50 relative overflow-hidden group shadow-2xl">
                    <div className="relative z-10 max-w-xl">
                        <div className="flex items-center gap-2 mb-4 text-indigo-500 font-black text-[10px] uppercase tracking-[0.3em]">
                            <Sparkles size={14} /> Welcome back to your lounge, {user.name}
                        </div>
                        <h2 className="text-5xl font-black text-slate-800 dark:text-white tracking-tight leading-tight mb-8">
                            Dive into a new <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600 italic">dimension.</span>
                        </h2>
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search by title, author, or genre..."
                                className="w-full pl-14 pr-6 py-5 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md rounded-3xl border border-white/20 outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-slate-700 dark:text-white"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* --- MAIN DASHBOARD GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    
                    <div className="lg:col-span-9 space-y-10 pb-20">
                        <div className="flex justify-between items-center px-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                            <div className="flex gap-8">
                                <button onClick={() => setViewMode('catalog')} className={`text-xs font-black uppercase tracking-widest pb-4 -mb-4 transition-all relative ${viewMode === 'catalog' ? 'text-indigo-600' : 'text-slate-400'}`}>
                                    Collection
                                    {viewMode === 'catalog' && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-full" />}
                                </button>
                                <button onClick={() => setViewMode('history')} className={`text-xs font-black uppercase tracking-widest pb-4 -mb-4 transition-all relative ${viewMode === 'history' ? 'text-indigo-600' : 'text-slate-400'}`}>
                                    Personal History
                                    {viewMode === 'history' && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-full" />}
                                </button>
                            </div>
                            
                            {viewMode === 'catalog' && (
                                <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
                            )}
                        </div>

                        <AnimatePresence mode="wait">
                            {viewMode === 'catalog' ? (
                                <motion.div key="catalog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {filteredBooks.map(book => (
                                        <BookCard 
                                            key={book.id} 
                                            book={book} 
                                            isAdmin={false} 
                                            onIssue={() => handleRequestClick(book.id, book.title)} 
                                        />
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-[2.5rem] border border-white/20 dark:border-slate-800/50 overflow-hidden shadow-sm">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                            <tr>
                                                <th className="p-6">Book Title</th>
                                                <th className="p-6">Issued</th>
                                                <th className="p-6">Returned</th>
                                                <th className="p-6 text-right">Fine</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {personalHistory.length > 0 ? personalHistory.map(log => (
                                                <tr key={log.id} className="hover:bg-white/40 dark:hover:bg-slate-800/20 transition-colors">
                                                    <td className="p-6 text-xs font-bold text-slate-700 dark:text-white">{log.title}</td>
                                                    <td className="p-6 text-[11px] font-bold text-slate-500">{log.issueDate}</td>
                                                    <td className="p-6 text-[11px] font-bold text-slate-500">{log.returnDate || 'Reading...'}</td>
                                                    <td className="p-6 text-right">
                                                        <span className={`px-3 py-1 text-[9px] font-black uppercase rounded-lg ${log.fineAmount > 0 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                                            {log.fineAmount > 0 ? `₹${log.fineAmount}` : 'No Fines'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr><td colSpan="4" className="p-20 text-center text-slate-400 italic font-black uppercase tracking-widest opacity-30">No history found</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <aside className="lg:col-span-3 space-y-6 sticky top-8 h-fit hidden lg:block">
                        <UserStatus pendingRequests={pendingRequests} books={books} userName={user.name} onWithdraw={onWithdraw} />
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Reading Goal</p>
                            <div className="flex justify-between items-end mb-4">
                                <h4 className="text-3xl font-black text-slate-900 dark:text-white leading-none">03 <span className="text-slate-400 text-xs font-bold">/ 05</span></h4>
                                <p className="text-[10px] font-bold text-indigo-600 uppercase">60%</p>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: '60%' }} transition={{ duration: 1.5 }} className="h-full bg-indigo-600" />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}