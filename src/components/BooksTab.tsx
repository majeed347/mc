import React, { useState, useMemo } from 'react';
import { Search, Star, Bookmark, BookOpen, Volume2 } from 'lucide-react';
import { booksData } from '../data/mockData';
import { Book } from '../types';

interface BooksTabProps {
  onShowToast: (msg: string) => void;
}

export const BooksTab: React.FC<BooksTabProps> = ({ onShowToast }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeBook, setActiveBook] = useState<Book | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['book-1', 'book-3']);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const categories = ['All', 'Fiction', 'Self-Help', 'History', 'Memoir', 'Fantasy', 'Spiritual'];

  const filteredBooks = useMemo(() => {
    return booksData.filter((book) => {
      const matchCat = selectedCategory === 'All' || book.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchQuery =
        !searchQuery.trim() ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((b) => b !== id));
      onShowToast('Removed from reading list');
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
      onShowToast('Saved to your reading list!');
    }
  };

  const handleAudioPreview = () => {
    setIsPlayingAudio(!isPlayingAudio);
    onShowToast(!isPlayingAudio ? 'Playing audio sample...' : 'Audio paused');
  };

  return (
    <div className="flex flex-col p-4 space-y-4">
      {/* Title */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Library & Reads</h1>
        <p className="text-xs text-slate-500 font-medium">Discover curated books for your journey</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search books, authors, or genres..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
        />
      </div>

      {/* Category Pills Scroll */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 2-Column Books Grid */}
      <div className="grid grid-cols-2 gap-3.5">
        {filteredBooks.length === 0 ? (
          <div className="col-span-2 py-10 text-center text-slate-400">
            <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50 stroke-[1.5]" />
            <p className="text-xs font-bold text-slate-700">No books found</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Try a different search term or category</p>
          </div>
        ) : (
          filteredBooks.map((book) => {
            const isBookmarked = bookmarkedIds.includes(book.id);
            return (
              <div
                key={book.id}
                onClick={() => setActiveBook(book)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col group active:scale-[0.98]"
              >
                {/* Book Cover */}
                <div className="relative w-full h-40 bg-slate-100 overflow-hidden">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <button
                    onClick={(e) => toggleBookmark(book.id, e)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 hover:text-teal-600 shadow-sm"
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        isBookmarked ? 'fill-teal-600 text-teal-600' : 'text-slate-600'
                      }`}
                    />
                  </button>
                </div>

                {/* Details */}
                <div className="p-3 flex flex-col flex-1">
                  <span className="self-start text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 mb-1 tracking-wider">
                    {book.category}
                  </span>
                  <h3 className="font-bold text-xs text-slate-900 line-clamp-1 leading-snug group-hover:text-teal-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 mb-2">by {book.author}</p>

                  <div className="mt-auto flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-800">{book.rating}</span>
                    </div>
                    <span className="font-medium">{book.readTime}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Book Reader / Details Modal */}
      {activeBook && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-end justify-center backdrop-blur-xs p-0">
          <div className="w-full max-w-md bg-white rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-4" />

            <div className="flex gap-4 mb-4">
              <img
                src={activeBook.cover}
                alt={activeBook.title}
                className="w-24 h-32 rounded-xl object-cover shadow-md border border-slate-200"
              />
              <div className="flex-1">
                <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-teal-50 text-teal-700 inline-block mb-1">
                  {activeBook.category}
                </span>
                <h2 className="text-base font-extrabold text-slate-900 leading-snug">
                  {activeBook.title}
                </h2>
                <p className="text-xs text-slate-500 mb-2">by {activeBook.author}</p>
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-1 font-bold text-slate-900">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {activeBook.rating}
                  </div>
                  <span>•</span>
                  <span>{activeBook.pages} pages</span>
                  <span>•</span>
                  <span>{activeBook.readTime}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">{activeBook.description}</p>

            {/* Sample Excerpt */}
            {activeBook.sampleExcerpt && (
              <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/80 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900">
                    Chapter 1 Preview
                  </span>
                  <button
                    onClick={handleAudioPreview}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-200/60 text-amber-900 text-[10px] font-bold"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>{isPlayingAudio ? 'Stop Audio' : 'Listen'}</span>
                  </button>
                </div>
                <p className="text-xs italic text-slate-700 leading-relaxed font-serif">
                  "{activeBook.sampleExcerpt}"
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={(e) => toggleBookmark(activeBook.id, e)}
                className="flex-1 py-3 rounded-xl border border-slate-200 font-bold text-xs text-slate-700 flex items-center justify-center gap-1.5 hover:bg-slate-50"
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    bookmarkedIds.includes(activeBook.id) ? 'fill-teal-600 text-teal-600' : ''
                  }`}
                />
                <span>
                  {bookmarkedIds.includes(activeBook.id) ? 'Bookmarked' : 'Add to List'}
                </span>
              </button>

              <button
                onClick={() => {
                  onShowToast(`Downloading "${activeBook.title}" for offline reading...`);
                  setTimeout(() => onShowToast(`"${activeBook.title}" ready offline!`), 1000);
                }}
                className="flex-2 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md shadow-teal-600/30 active:scale-95 transition-all"
              >
                Read Offline
              </button>

              <button
                onClick={() => setActiveBook(null)}
                className="px-4 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
