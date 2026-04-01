import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Wallet, BookOpen } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Home', path: '/' },
    { icon: <Users size={20} />, label: 'Students', path: '/students' },
    { icon: <Calendar size={20} />, label: 'Attend', path: '/attendance' },
    { icon: <Wallet size={20} />, label: 'Fees', path: '/fees' },
    { icon: <BookOpen size={20} />, label: 'Courses', path: '/courses' },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-surface-container z-50 px-2 pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center justify-center gap-1 flex-1 h-full
              transition-all duration-300
              ${isActive ? 'text-primary' : 'text-surface-dim hover:text-primary/70'}
            `}
          >
            <div className="relative">
              {item.icon}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
