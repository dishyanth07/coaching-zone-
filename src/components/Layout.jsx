import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  // Get title from current path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    const title = path.substring(1);
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  return (
    <div className="min-h-screen bg-surface-background flex font-inter">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <main 
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: collapsed ? 80 : 280 }}
      >
        <Navbar title={getPageTitle()} />
        
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Layout;
