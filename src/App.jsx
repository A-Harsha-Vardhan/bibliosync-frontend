import React, { useState, useEffect } from 'react';
import { Library, Search, Loader2, LogOut, Database, ShieldCheck, Check, X, Shield, CheckCircle2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Service & Component Imports
import { bookService } from './services/bookService';
import { authService } from './services/AuthService';
import BookCard from './components/BookCard';
import MemberProfile from './components/MemberProfile';
import AnalyticsBar from './components/AnalyticsBar';
import AddBookModal from './components/AddBookModal';
import ActivityLog from './components/ActivityLog';
import ThemeToggle from './components/ThemeToggle';
import CategoryFilter from './components/CategoryFilter';
import InventoryChart from './components/InventoryChart';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import BorrowerDashboard from './components/BorrowerDashboard';
import GlobalHistory from './components/GlobalHistory';

// --- INTERNAL ADMIN COMPONENTS ---
const RequestQueue = ({ requests, onApprove, onDecline }) => (
    <div className="glass rounded-[2rem] p-6 border border-white/20 dark:border-slate-800/50 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Pending Requests</p>
            <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[10px] font-bold text-amber-500 uppercase">Incoming</span>
            </div>
        </div>
        <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
            {requests.length === 0 ? (
                <div className="py-6 text-center text-slate-400 text-[10px] italic font-medium">No active borrow requests</div>
            ) : (
                requests.map(req => (
                    <div key={req.id} className="p-3 bg-white/50 dark:bg-slate-900/30 rounded-2xl border border-white/10">
                        <div className="flex flex-col gap-1 mb-3">
                            <span className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-tight">{req.userName}</span>
                            <span className="text-[9px] font-bold text-indigo-500 truncate italic">"{req.bookTitle}"</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => onApprove(req)} className="py-1.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white rounded-lg transition-all flex items-center justify-center"><Check size={14} /></button>
                            <button onClick={() => onDecline(req.id)} className="py-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all flex items-center justify-center"><X size={14} /></button>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
);

const SystemStatus = () => (
    <div className="glass rounded-[2rem] p-6 border border-white/20 dark:border-slate-800/50 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">System Status</p>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Database size={12} className="text-indigo-500" />
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">DB Sync</span>
                </div>
                <span className="text-[10px] font-black text-slate-400">PostgreSQL OK</span>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Auth</span>
                </div>
                <span className="text-[10px] font-black text-slate-400">SESSION OK</span>
            </div>
        </div>
    </div>
);

export default function App() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [pendingRequests, setPendingRequests] = useState([]);
    const [viewMode, setViewMode] = useState('inventory');
    const [user, setUser] = useState(null);
    const [authMode, setAuthMode] = useState('login');
    const [successMessage, setSuccessMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    const handleLogin = async (credentials) => {
        try {
            const userData = await authService.login(credentials);
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            addActivity(`${userData.name} joined the lounge`);
        } catch (err) {
            alert(err.message || "Invalid credentials.");
        }
    };

    const handleRegister = async (formData) => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setSuccessMessage("Account created! Please sign in.");
                setAuthMode('login');
                setTimeout(() => setSuccessMessage(''), 4000);
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Registration failed");
            }
        } catch (err) {
            alert("Error connecting to server");
        }
    };

    const handleLogout = () => {
        authService.logout();
        localStorage.removeItem('user');
        setUser(null);
        setAuthMode('login');
    };

    const loadData = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const data = await bookService.getAll();
            setBooks(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Fetch failed:", err);
            setBooks([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) loadData();
    }, [user]);

    const addActivity = (message) => {
        const newActivity = {
            id: Date.now(),
            message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setActivities(prev => [newActivity, ...prev].slice(0, 5));
    };

    const handleIssue = async (id, title, borrowerName) => {
        try {
            await bookService.issue(id, borrowerName);
            addActivity(`Issued: ${title} to ${borrowerName}`);
            loadData();
        } catch (err) { alert(err.message); }
    };

    const handleReturn = async (id, title) => {
        try {
            await bookService.return(id);
            addActivity(`Returned: ${title}`);
            loadData();
        } catch (err) { alert(err.message); }
    };

    const handleAdd = async (newBook) => {
        try {
            await bookService.add(newBook);
            addActivity(`Cataloged: ${newBook.title}`);
            loadData();
        } catch (err) { alert(err.message); }
    };

    const handleDelete = async (id, title) => {
        if (!window.confirm(`Delete "${title}"?`)) return;
        try {
            await bookService.remove(id);
            addActivity(`Removed: ${title}`);
            loadData();
        } catch (err) { alert("Failed to remove book"); }
    };

    const handleBorrowRequest = (bookId, bookTitle) => {
        const newRequest = { id: Date.now(), bookId, bookTitle, userName: user.name, status: 'PENDING' };
        setPendingRequests(prev => [...prev, newRequest]);
    };

    const handleApproveRequest = async (request) => {
        try {
            await handleIssue(request.bookId, request.bookTitle, request.userName);
            setPendingRequests(prev => prev.filter(r => r.id !== request.id));
        } catch (err) { alert(err.message); }
    };

    // Filter books for Admin display based on search and category
    const adminFilteredBooks = books.filter(b => {
        const matchesCategory = activeCategory === "All" || b.category === activeCategory;
        const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.author.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (!user) {
        return (
            <div className="relative">
                {successMessage && (
                    <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100]">
                        <div className="bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
                            <CheckCircle2 size={20} />
                            <span className="font-bold text-sm tracking-wide">{successMessage}</span>
                        </div>
                    </div>
                )}
                {authMode === 'login' ? (
                    <LoginPage onLogin={handleLogin} onSwitchToRegister={() => setAuthMode('register')} />
                ) : (
                    <RegisterPage onRegister={handleRegister} onSwitchToLogin={() => setAuthMode('login')} />
                )}
            </div>
        );
    }

    if (user.role === 'BORROWER') {
        return (
            <BorrowerDashboard
                user={user} books={books} pendingRequests={pendingRequests}
                onLogout={handleLogout} onRequest={handleBorrowRequest}
                onWithdraw={(id) => setPendingRequests(prev => prev.filter(r => r.id !== id))}
            />
        );
    }
    const handlePayFine = async (bookId, title) => {
        if (!window.confirm(`Clear the fine for "${title}"?`)) return;
        try {
            await bookService.payFine(bookId);
            addActivity(`Fine paid for: ${title}`);
            loadData(); // Refresh the books and logs
        } catch (err) {
            alert("Payment failed");
        }
    };

    // Admin Dashboard
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950 transition-all duration-1000 relative pb-20">
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto p-8 lg:p-12">
                <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-xl transform -rotate-2"><Library size={28} /></div>
                        <h1 className="text-3xl font-black tracking-tighter text-slate-800 dark:text-white uppercase">Biblio<span className="text-indigo-600">Sync</span></h1>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500" size={18} />
                            <input
                                className="pl-12 pr-6 py-4 bg-white dark:bg-slate-900/40 text-slate-900 dark:text-white rounded-[1.5rem] w-full md:w-80 outline-none border border-slate-200 dark:border-slate-800/50 transition-all focus:ring-4 focus:ring-indigo-500/10"
                                placeholder="Inventory search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <ThemeToggle />
                        <button onClick={handleLogout} className="p-4 bg-white/40 dark:bg-slate-900/40 rounded-2xl border border-white/30 text-slate-400 hover:text-red-500 transition-all"><LogOut size={22} /></button>
                    </div>
                </header>

                <div className="space-y-8">
                    <MemberProfile member={{ name: user.name, role: "System Administrator", email: user.email }} />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        <div className="lg:col-span-9 space-y-8">
                            {viewMode === 'inventory' ? (
                                <>
                                    {!loading && <AnalyticsBar books={books} />}
                                    {!loading && books.length > 0 && <InventoryChart books={books} />}
                                    <div className="flex justify-between items-center px-4">
                                        <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
                                        <button onClick={() => setViewMode('history')} className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800"><Shield size={14} /> Global History</button>
                                    </div>
                                    <div className="relative min-h-[400px]">
                                        {loading ? (
                                            <div className="flex flex-col items-center py-40 text-slate-400 gap-6"><Loader2 className="animate-spin text-indigo-600" size={48} /><span className="text-xs font-black uppercase tracking-[0.4em]">Syncing Catalog...</span></div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                                <AnimatePresence mode="popLayout">
                                                    {adminFilteredBooks.map(book => (
                                                        <BookCard
                                                            key={book.id} book={book} isAdmin={true}
                                                            onIssue={() => {
                                                                const bName = prompt(`Issue "${book.title}" to:`);
                                                                if (bName) handleIssue(book.id, book.title, bName);
                                                            }}
                                                            onReturn={() => handleReturn(book.id, book.title)}
                                                            onDelete={() => handleDelete(book.id, book.title)}
                                                        />
                                                    ))}
                                                </AnimatePresence>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <GlobalHistory
                                    books={books}
                                    onBack={() => setViewMode('inventory')}
                                    onPayFine={handlePayFine}
                                />
                            )}
                        </div>

                        <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-8 h-fit">
                            <RequestQueue requests={pendingRequests} onApprove={handleApproveRequest} onDecline={(id) => setPendingRequests(prev => prev.filter(r => r.id !== id))} />
                            <SystemStatus />
                            <ActivityLog activities={activities} />
                            <AddBookModal onAdd={handleAdd} />
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}