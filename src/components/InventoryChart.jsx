import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function InventoryChart({ books = [] }) {
    // 1. Data Safety Check: If no books, show a placeholder message
    if (books.length === 0) {
        return (
            <div className="glass p-8 rounded-[2.5rem] mb-8 h-[400px] flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Waiting for Inventory Data...</p>
            </div>
        );
    }

    // 2. Data Preparation: Map backend fields to Chart fields
    const data = books
        .sort((a, b) => b.totalCopies - a.totalCopies) // Sort by volume
        .slice(0, 8) // Limit to top 8 to avoid clutter
        .map(book => ({
            name: book.title.length > 12 ? book.title.substring(0, 10) + '...' : book.title,
            Available: book.availableCopies,
            Issued: book.totalCopies - book.availableCopies
        }));

    return (
        <div className="glass p-8 rounded-[2.5rem] mb-8 h-[450px] transition-all duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Inventory Volume</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Stock Distribution Analysis</p>
                </div>

                {/* Legend */}
                <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest bg-slate-50 dark:bg-slate-800/50 p-3 px-5 rounded-2xl">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-indigo-500 rounded-md" />
                        <span className="text-slate-600 dark:text-slate-300">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-slate-300 dark:bg-slate-700 rounded-md" />
                        <span className="text-slate-600 dark:text-slate-300">Issued</span>
                    </div>
                </div>
            </div>

            <div className="h-full pb-10">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:opacity-5" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
                            angle={-25}
                            textAnchor="end"
                        />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                        {/* --- In InventoryChart.jsx --- */}
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0f172a', // Matches slate-900
                                border: '1px solid #1e293b', // Matches slate-800
                                borderRadius: '12px',
                                padding: '12px'
                            }}
                            itemStyle={{
                                color: '#f8fafc', // Force white text for values
                                fontSize: '12px',
                                fontWeight: 'bold'
                            }}
                            labelStyle={{
                                color: '#94a3b8', // Slate-400 for book titles
                                marginBottom: '4px'
                            }}
                            cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }} // Subtle indigo hover effect
                        />
                        {/* Stacked Bars: Available vs Issued */}
                        <Bar dataKey="Available" stackId="a" fill="#6366f1" barSize={35} />
                        <Bar dataKey="Issued" stackId="a" fill="#e2e8f0" radius={[10, 10, 0, 0]} barSize={35} className="dark:fill-slate-700" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}