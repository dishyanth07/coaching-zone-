import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar = ({ title }) => {
  const { searchQuery, setSearchQuery } = useApp();

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-surface-background/80 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile Logo */}
        <div className="lg:hidden w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-manrope font-bold text-xl shadow-lg">
          CZ
        </div>
        <h1 className="text-xl md:text-2xl font-manrope font-bold text-[#191c1e] truncate">{title}</h1>
      </div>
      
      <div className="flex items-center gap-3 md:gap-6">
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-dim" size={18} />
          <input 
            type="text" 
            placeholder="Search anything..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white border-none rounded-full shadow-premium text-sm focus:ring-2 focus:ring-primary/20 w-48 xl:w-64 transition-all"
          />
        </div>
        
        <button className="relative p-2 bg-white rounded-full shadow-premium text-[#414754] hover:text-primary transition-colors">
          <Bell size={18} md:size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-2 border-l border-surface-container">
          <div className="text-right hidden sm:block">
            <p className="text-xs md:text-sm font-bold font-manrope">Administrator</p>
            <p className="text-[10px] md:text-xs text-surface-dim">Management Portal</p>
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-surface-container rounded-full flex items-center justify-center text-primary border-2 border-white shadow-premium flex-shrink-0">
            <User size={18} md:size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
