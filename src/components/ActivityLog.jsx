import { Clock, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ActivityLog({ activities }) {
  return (
    <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/20 dark:border-slate-800/50 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <History size={18} className="text-indigo-600" />
        <h3 className="font-black uppercase text-[10px] tracking-widest text-slate-400">Live System Log</h3>
      </div>
      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {activities.map((act) => (
            <motion.div 
              key={act.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-50 dark:border-slate-700/50"
            >
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{act.message}</span>
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                <Clock size={10} /> {act.time}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}