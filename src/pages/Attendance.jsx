import React, { useState } from 'react';
import { CheckCircle, XCircle, Search, Save, Calendar as CalendarIcon, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Attendance = () => {
  const { students, saveAttendance, searchQuery, setSearchQuery } = useApp();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({}); // { studentId: 'present' | 'absent' }
  const [isSaving, setIsSaving] = useState(false);

  const handleStatusChange = (id, status) => {
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  const handleSave = async () => {
    if (Object.keys(attendance).length === 0) {
      alert('Please mark attendance for at least one student.');
      return;
    }
    
    setIsSaving(true);
    const result = await saveAttendance(date, attendance);
    setIsSaving(false);
    
    if (result.success) {
      alert('Attendance saved successfully and synced to Sheets! ✅');
    } else {
      alert('Error saving attendance. Please try again.');
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const presentCount = Object.values(attendance).filter(v => v === 'present').length;
  const absentCount = Object.values(attendance).filter(v => v === 'absent').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="premium-card p-6 flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <CalendarIcon size={24} />
            </div>
            <div>
              <p className="text-sm text-surface-dim font-bold uppercase tracking-wider">Date Selection</p>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent font-bold text-lg outline-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="premium-card p-6 flex items-center justify-between bg-tertiary/10 border-tertiary/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-tertiary text-white rounded-2xl flex items-center justify-center">
              <UserCheck size={24} />
            </div>
            <div>
              <p className="text-sm text-tertiary font-bold uppercase tracking-wider">Summary</p>
              <p className="text-xl font-manrope font-bold text-tertiary">{presentCount} Present / {absentCount} Absent</p>
            </div>
          </div>
        </div>

        <div className="premium-card p-6 flex items-center justify-end border-none bg-transparent shadow-none">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50"
          >
            <Save size={20} /> {isSaving ? 'Saving...' : 'Save Attendance'}
          </button>
        </div>
      </div>

      <div className="premium-card p-0 overflow-hidden">
        <div className="p-6 border-b border-surface-container flex flex-col md:flex-row md:items-center justify-between gap-4 font-manrope">
          <h3 className="font-bold text-lg">Daily Attendance Register</h3>
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-dim" size={18} />
            <input 
              type="text" 
              placeholder="Search students..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface-container rounded-xl outline-none focus:ring-2 ring-primary/20 transition-all font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-surface-container/50">
                <th className="py-4 px-6 font-manrope text-sm font-bold">Student Name</th>
                <th className="py-4 px-6 font-manrope text-sm font-bold">Course & Batch</th>
                <th className="py-4 px-6 font-manrope text-sm font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-surface-container/30 transition-colors group">
                    <td className="py-4 px-6 font-semibold">{student.name}</td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-medium">{student.course}</p>
                      <p className="text-xs text-surface-dim">{student.batch}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-6">
                        <button 
                          onClick={() => handleStatusChange(student.id, 'present')}
                          className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            attendance[student.id] === 'present' 
                              ? 'bg-tertiary text-white shadow-lg scale-105' 
                              : 'bg-tertiary/10 text-tertiary hover:bg-tertiary/20'
                          }`}
                        >
                          <CheckCircle size={16} /> Present
                        </button>
                        <button 
                          onClick={() => handleStatusChange(student.id, 'absent')}
                          className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            attendance[student.id] === 'absent' 
                              ? 'bg-[#ba1a1a] text-white shadow-lg scale-105' 
                              : 'bg-[#ba1a1a]/10 text-[#ba1a1a] hover:bg-[#ba1a1a]/20'
                          }`}
                        >
                          <XCircle size={16} /> Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-20 text-center text-surface-dim italic">
                    <p className="text-lg">No students found matching your search.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
