import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import AddStudentModal from '../components/AddStudentModal';

const Students = () => {
  const { students, removeStudent, searchQuery, setSearchQuery } = useApp();
  const [activeMenu, setActiveMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredStudents = students.filter(student => {
    const query = searchQuery.toLowerCase();
    return (
      student.name?.toLowerCase().includes(query) ||
      student.course?.toLowerCase().includes(query) ||
      student.id?.toString().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <AddStudentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-full shadow-premium flex-1 max-w-md">
          <Search size={18} className="text-surface-dim" />
          <input 
            type="text" 
            placeholder="Search name, course or ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none bg-transparent focus:ring-0 text-sm w-full outline-none"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-premium text-sm font-medium hover:bg-surface-container transition-all">
            <Filter size={16} /> Filter
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full shadow-md font-bold text-sm hover:translate-y-[-2px] transition-all active:scale-95"
          >
            <Plus size={18} /> Add Student
          </button>
        </div>
      </div>

      <div className="premium-card p-0 overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-surface-container/50 border-b border-surface-container">
                <th className="py-4 px-6 font-manrope text-sm font-bold">Student Name</th>
                <th className="py-4 px-6 font-manrope text-sm font-bold">ID Number</th>
                <th className="py-4 px-6 font-manrope text-sm font-bold">Enrolled Course</th>
                <th className="py-4 px-6 font-manrope text-sm font-bold">Batch</th>
                <th className="py-4 px-6 font-manrope text-sm font-bold">Join Date</th>
                <th className="py-4 px-6 font-manrope text-sm font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-surface-container/30 transition-colors group">
                  <td className="py-4 px-6 font-semibold">{student.name}</td>
                  <td className="py-4 px-6 text-sm text-[#414754] font-mono">{student.id}</td>
                  <td className="py-4 px-6 text-sm">
                    <span className="bg-primary/5 text-primary px-3 py-1 rounded-full font-medium">
                      {student.course}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-[#414754]">{student.batch}</td>
                  <td className="py-4 px-6 text-sm text-[#414754]">{student.join_date}</td>
                  <td className="py-4 px-6 text-center relative">
                    <div className="flex justify-center">
                      <button 
                        onClick={() => setActiveMenu(activeMenu === student.id ? null : student.id)}
                        className="p-2 hover:bg-surface-container rounded-lg transition-all"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                      
                      <AnimatePresence>
                        {activeMenu === student.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setActiveMenu(null)}
                            />
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              className="absolute right-6 mt-10 w-32 bg-white rounded-xl shadow-premium border border-surface-container z-20 overflow-hidden"
                            >
                              <button 
                                onClick={() => {
                                  removeStudent(student.id);
                                  setActiveMenu(null);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-[#ba1a1a] hover:bg-[#ba1a1a]/5 transition-colors"
                              >
                                <Trash2 size={16} />
                                Remove
                              </button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-20 text-center text-surface-dim italic">
                    No results found for "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-surface-container/20 flex items-center justify-between">
          <p className="text-sm text-[#414754]">
            {filteredStudents.length > 0 
              ? `Showing ${filteredStudents.length} of ${students.length} students` 
              : 'No results found'}
          </p>
          <div className="flex gap-2">
            <button disabled className="px-3 py-1 rounded border border-surface-container text-surface-dim text-sm">Prev</button>
            <button className="px-3 py-1 rounded bg-primary text-white text-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
