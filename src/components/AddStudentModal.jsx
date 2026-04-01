import React, { useState } from 'react';
import { X, User, Phone, BookOpen, Clock, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

const AddStudentModal = ({ isOpen, onClose }) => {
  const { addStudent, courses } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: '',
    batch: 'Morning A',
    join_date: new Date().toISOString().split('T')[0]
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await addStudent(formData);
    setSubmitting(false);
    if (res.success) {
      onClose();
      setFormData({
        name: '',
        phone: '',
        course: '',
        batch: 'Morning A',
        join_date: new Date().toISOString().split('T')[0]
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#191c1e]/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden"
          >
            <div className="p-6 border-b border-surface-container flex items-center justify-between bg-surface-background">
              <h3 className="text-xl font-manrope font-bold">New Student Enrollment</h3>
              <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full transition-all">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-dim" size={18} />
                  <input 
                    required
                    type="text" 
                    placeholder="Full Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-surface-container/50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-dim" size={18} />
                  <input 
                    required
                    type="tel" 
                    placeholder="Phone Number" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-surface-container/50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>

                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-dim" size={18} />
                  <select 
                    required
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-surface-container/50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none appearance-none"
                  >
                    <option value="">Select Course</option>
                    {courses.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-dim" size={18} />
                    <select 
                      value={formData.batch}
                      onChange={(e) => setFormData({...formData, batch: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-surface-container/50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none appearance-none text-sm"
                    >
                      <option>Morning A</option>
                      <option>Morning B</option>
                      <option>Evening A</option>
                      <option>Evening B</option>
                      <option>Weekend A</option>
                    </select>
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-dim" size={18} />
                    <input 
                      type="date" 
                      value={formData.join_date}
                      onChange={(e) => setFormData({...formData, join_date: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-surface-container/50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-surface-container text-[#414754] font-bold rounded-2xl hover:bg-surface-dim transition-all"
                >
                  Cancel
                </button>
                <button 
                  disabled={submitting}
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary text-white font-bold rounded-2xl shadow-lg hover:translate-y-[-2px] transition-all disabled:opacity-50"
                >
                  {submitting ? 'Enrolling...' : 'Enroll Student'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddStudentModal;
