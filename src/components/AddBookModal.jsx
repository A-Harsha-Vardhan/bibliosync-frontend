import React, { useState } from 'react';
import { Plus, X, Film } from 'lucide-react';

export default function AddBookModal({ onAdd }) {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({
        title: '',
        author: '',
        totalCopies: 5,
        category: 'Anime'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(form);
        setForm({ title: '', author: '', totalCopies: 5, category: 'Anime' });
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-10 right-10 bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 flex items-center gap-3 px-6 group"
            >
                <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-bold tracking-tight text-lg">Add New Title</span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 w-full max-w-lg shadow-2xl relative border border-white/20 dark:border-slate-800">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-2xl text-indigo-600">
                                <Film size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter uppercase">New Entry</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Series Title</label>
                                <input
                                    required
                                    placeholder="e.g. Solo Leveling"
                                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                                    onChange={e => setForm({ ...form, title: e.target.value })}
                                    value={form.title}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Author / Creator</label>
                                <input
                                    required
                                    placeholder="e.g. Chugong"
                                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                                    onChange={e => setForm({ ...form, author: e.target.value })}
                                    value={form.author}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                                    <select
                                        className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white font-bold cursor-pointer appearance-none"
                                        onChange={e => setForm({ ...form, category: e.target.value })}
                                        value={form.category}
                                    >
                                        <option value="Anime">Anime</option>
                                        <option value="Web Series">Web Series</option>
                                        <option value="Manga">Manga</option>
                                        <option value="Fiction">Fiction</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Initial Copies</label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white font-bold"
                                        value={form.totalCopies}
                                        onChange={e => setForm({ ...form, totalCopies: parseInt(e.target.value) || 1 })}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-lg hover:bg-indigo-700 active:scale-95 transition-all mt-4"
                            >
                                Add to Catalog
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}