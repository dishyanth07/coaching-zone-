import Sidebar from './Sidebar';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
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
    <div className="min-h-screen bg-surface-background flex font-inter flex-col lg:flex-row">
      <div className="hidden lg:block">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      
      <main 
        className={`flex-1 flex flex-col transition-all duration-300 pb-20 lg:pb-0 ${collapsed ? 'lg:ml-20' : 'lg:ml-[280px]'}`}
      >
        <Navbar title={getPageTitle()} />
        
        <div className="p-4 md:p-8 flex-1 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Layout;
