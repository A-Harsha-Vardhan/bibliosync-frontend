import React, { useState } from 'react';
import { User, Mail, Lock, BookMarked, ArrowRight, LogIn, Eye, EyeOff } from 'lucide-react';

export default function RegisterPage({ onRegister, onSwitchToLogin }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // --- NEW STATE FOR VISIBILITY ---
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        onRegister(formData);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-slate-950">
            
            {/* Animated Mesh Gradient */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-indigo-600/20 rounded-full blur-[120px] animate-aurora" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-fuchsia-600/10 rounded-full blur-[120px] animate-aurora aurora-delay-1" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
            </div>

            <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-700">
                <div className="bg-white dark:bg-slate-900/80 backdrop-blur-2xl rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 md:p-10 shadow-2xl">
                    
                    <div className="text-center mb-8">
                        <div className="inline-flex p-4 bg-gradient-to-br from-indigo-600 to-fuchsia-600 rounded-2xl text-white shadow-lg mb-4 transform rotate-3">
                            <BookMarked size={32} />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
                            Biblio<span className="text-indigo-600">Lounge</span>
                        </h1>
                        <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-[0.2em]">Create Your Journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Input */}
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                            <input
                                required
                                type="text"
                                placeholder="Full Name"
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white transition-all text-sm font-bold"
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>

                        {/* Email Input */}
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                            <input
                                required
                                type="email"
                                placeholder="Gmail Address"
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white transition-all text-sm font-bold"
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>

                        {/* Password Input with Eye Button */}
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                placeholder="Create Password"
                                className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white transition-all text-sm font-bold"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Confirm Password with Eye Button */}
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-white transition-all text-sm font-bold"
                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-95 group"
                        >
                            Start Journey <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                        <button 
                            onClick={onSwitchToLogin}
                            className="text-[10px] font-black text-slate-400 hover:text-indigo-500 uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mx-auto"
                        >
                            <LogIn size={14} /> Already a member? <span className="text-indigo-600 underline">Sign In</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}