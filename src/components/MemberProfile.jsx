import { motion } from 'framer-motion';
import { User, Mail, ShieldCheck } from 'lucide-react';

export default function MemberProfile({ member }) {
  if (!member) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass p-6 rounded-[2.5rem] flex items-center gap-6 mb-8 transition-all duration-500 border border-white/20 dark:border-slate-800/50 shadow-xl"
    >
      {/* Profile Avatar Icon */}
      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none transition-transform hover:scale-105 duration-300">
        <User size={32} />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors tracking-tight">
            {member.name}
          </h3>
          {/* Enhanced Role Badge */}
          <span className="flex items-center gap-1.5 px-3 py-1 bg-indigo-500 text-white text-[9px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-indigo-500/20">
            <ShieldCheck size={10} />
            {member.role}
          </span>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 mt-2 text-slate-500 dark:text-slate-400 text-sm font-medium">
          <div className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors cursor-default">
            <Mail size={14} className="text-indigo-500" /> 
            {member.email}
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-[10px] uppercase font-black tracking-widest text-emerald-500 opacity-80">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Verified Admin
          </div>
        </div>
      </div>
    </motion.div>
  );
}