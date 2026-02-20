import React from 'react';

const categories = ["All", "Anime", "Web Series", "Manga", "Fiction"];

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
            activeCategory === cat
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
              : "glass text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}