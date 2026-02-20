import React, { useState } from 'react';
// Added Eye and EyeOff icons
import { Lock, User, ShieldCheck, BookMarked, ArrowRight, UserPlus, Eye, EyeOff } from 'lucide-react';

export default function LoginPage({ onLogin, onSwitchToRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle visibility

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ username, password });
    };

    const quickLogin = (role) => {
        const user = role === 'admin' ? 'admin' : 'Harsha';
        setUsername(user);
        setPassword('password123');
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-slate-950">
            
            {/* --- ANIMATED MESH GRADIENT --- */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-indigo-600/20 rounded-full blur-[120px] animate-aurora" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-fuchsia-600/10 rounded-full blur-[120px] animate-aurora aurora-delay-1" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
            </div>

            <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-700">
                <div className="bg-white dark:bg-slate-900/80 backdrop-blur-2xl rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 md:p-10 shadow-2xl">
                    
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex p-4 bg-indigo-600 rounded-2xl text-white shadow-lg mb-4 transform -rotate-3">
                            <BookMarked size={32} />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
                            Biblio<span className="text-indigo-600">Sync</span>
                        </h1>
                        <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-[0.2em]">Management Portal</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username Field */}
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                            <input 
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white transition-all text-sm font-bold"
                                placeholder="Username"
                                required
                            />
                        </div>

                        {/* Password Field with Eye Button */}
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                            <input 
                                type={showPassword ? "text" : "password"} // Dynamic type
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white transition-all text-sm font-bold"
                                placeholder="Password"
                                required
                            />
                            {/* Eye Toggle Button */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
                            Enter Library <ArrowRight size={16} />
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button 
                            onClick={onSwitchToRegister}
                            className="text-[10px] font-black text-slate-400 hover:text-indigo-500 uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mx-auto"
                        >
                            <UserPlus size={14} /> New to the Lounge? <span className="text-indigo-600 underline">Sign Up</span>
                        </button>
                    </div>

                    {/* Quick Access Roles */}
                    <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center mb-4">Select Role</p>
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => quickLogin('admin')} className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all group">
                                <ShieldCheck size={16} className="text-slate-400 group-hover:text-indigo-600" />
                                <span className="text-[10px] font-black uppercase text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white">Admin</span>
                            </button>
                            <button onClick={() => quickLogin('user')} className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-fuchsia-500 transition-all group">
                                <User size={16} className="text-slate-400 group-hover:text-fuchsia-500" />
                                <span className="text-[10px] font-black uppercase text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white">User</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}