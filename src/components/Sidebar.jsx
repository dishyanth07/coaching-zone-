import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  CreditCard, 
  BookOpen, 
  Bell, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/students', icon: Users, label: 'Students' },
  { path: '/attendance', icon: CalendarCheck, label: 'Attendance' },
  { path: '/fees', icon: CreditCard, label: 'Fees' },
  { path: '/courses', icon: BookOpen, label: 'Courses' },
  { path: '/notifications', icon: Bell, label: 'Notifications' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  return (
    <motion.aside 
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="bg-white h-screen fixed left-0 top-0 z-40 shadow-premium flex flex-col transition-all duration-300 ease-in-out border-r border-surface-container"
    >
      <div className="p-6 flex items-center justify-between overflow-hidden">
        {!collapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl font-manrope">
              CZ
            </div>
            <span className="font-manrope font-bold text-xl whitespace-nowrap">Coaching Zone</span>
          </motion.div>
        )}
        {collapsed && (
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto">
            C
          </div>
        )}
      </div>

      <nav className="flex-1 mt-4 px-3 space-y-2 overflow-y-auto no-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group
              ${isActive 
                ? 'bg-primary text-white shadow-md' 
                : 'text-[#414754] hover:bg-surface-container hover:text-primary'}
            `}
          >
            <item.icon size={22} className={collapsed ? 'mx-auto' : ''} />
            {!collapsed && (
              <span className="font-medium whitespace-nowrap">{item.label}</span>
            )}
            {collapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-surface-container">
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-surface-container text-[#414754] transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
        
        {!collapsed && (
          <button className="w-full flex items-center gap-4 px-4 py-3.5 mt-2 rounded-xl text-[#ba1a1a] hover:bg-red-50 transition-all duration-200">
            <LogOut size={22} />
            <span className="font-medium whitespace-nowrap">Logout</span>
          </button>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
