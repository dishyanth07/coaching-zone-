import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const Navbar = ({ title }) => {
  return (
    <header className="h-16 flex items-center justify-between px-8 bg-surface-background/80 backdrop-blur-md sticky top-0 z-30">
      <h1 className="text-2xl font-manrope font-bold text-[#191c1e]">{title}</h1>
      
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-dim" size={18} />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="pl-10 pr-4 py-2 bg-white border-none rounded-full shadow-premium text-sm focus:ring-2 focus:ring-primary/20 w-64 transition-all"
          />
        </div>
        
        <button className="relative p-2 bg-white rounded-full shadow-premium text-[#414754] hover:text-primary transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-2 border-l border-surface-container">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold font-manrope">Administrator</p>
            <p className="text-xs text-surface-dim">Management Portal</p>
          </div>
          <div className="w-10 h-10 bg-surface-container rounded-full flex items-center justify-center text-primary border-2 border-white shadow-premium">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
