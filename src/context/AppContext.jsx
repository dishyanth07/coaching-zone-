import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const courseFeeMap = {
    'Tamil Phonics': 1500,
    'English Phonics': 1500,
    'Tamil Handwriting': 1200,
    'English Handwriting': 1200,
    'Hindi Phonics': 1500,
    'Grammar & Spoken English': 2000,
    'Abacus': 2500,
    'Teacher Training Classes': 5000
  };

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [fees, setFees] = useState([]);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Students
      const { data: studentsData } = await supabase
        .from('students')
        .select('*')
        .order('join_date', { ascending: false });
      
      if (studentsData) setStudents(studentsData);

      // Fetch Courses
      const { data: coursesData } = await supabase
        .from('courses')
        .select('*')
        .order('name');
      
      if (coursesData) setCourses(coursesData);

      // Fetch Fees
      const { data: feesData } = await supabase
        .from('fees')
        .select('*, students(name, course)')
        .order('due_date', { ascending: true });
      
      if (feesData) setFees(feesData);

      // Fetch Attendance (last 30 days)
      const { data: attendanceData } = await supabase
        .from('attendance')
        .select('*')
        .order('date', { ascending: false })
        .limit(500);
      
      if (attendanceData) setAttendanceHistory(attendanceData);

    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const syncToSheets = async (type, payload) => {
    const url = import.meta.env.VITE_GOOGLE_SHEETS_URL;
    if (!url || url.includes('REPLACE_WITH')) return;
    
    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, payload })
      });
    } catch (err) {
      console.error('GSheet Sync Error:', err);
    }
  };

  const addStudent = async (studentData) => {
    try {
      const { data: sData, error: sError } = await supabase
        .from('students')
        .insert([studentData])
        .select();
      
      if (sError) throw sError;
      const newStudent = sData[0];
      setStudents(prev => [newStudent, ...prev]);

      // Sync to Sheets
      syncToSheets('enrollment', {
        timestamp: new Date().toLocaleString(),
        name: newStudent.name,
        phone: newStudent.phone,
        course: newStudent.course,
        batch: newStudent.batch,
        join_date: newStudent.join_date
      });

      const feeAmount = courseFeeMap[newStudent.course] || 1000;
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 10);

      const { data: fData } = await supabase
        .from('fees')
        .insert([{
          student_id: newStudent.id,
          amount: feeAmount,
          status: 'pending',
          due_date: dueDate.toISOString().split('T')[0]
        }])
        .select('*, students(name, course)');

      if (fData) {
        setFees(prev => [fData[0], ...prev]);
        syncToSheets('fee', {
          student: newStudent.name,
          amount: feeAmount,
          status: 'PENDING',
          due_date: fData[0].due_date
        });
      }

      return { success: true };
    } catch (error) {
      console.error('Error adding student/fee:', error.message);
      return { success: false, error: error.message };
    }
  };

  const updateFeeStatus = async (id, status) => {
    try {
      const { data, error } = await supabase
        .from('fees')
        .update({ status })
        .eq('id', id)
        .select('*, students(name, course)');
      
      if (error) throw error;
      if (data) {
        const updatedFee = data[0];
        setFees(prev => prev.map(f => f.id === id ? updatedFee : f));
        
        syncToSheets('fee_update', {
          student: updatedFee.students?.name,
          amount: updatedFee.amount,
          new_status: status.toUpperCase(),
          update_time: new Date().toLocaleString()
        });
      }
      return { success: true };
    } catch (error) {
      console.error('Error updating fee:', error.message);
      return { success: false, error: error.message };
    }
  };

  const saveAttendance = async (date, attendanceRecords) => {
    try {
      const inserts = Object.entries(attendanceRecords).map(([studentId, status]) => ({
        student_id: studentId,
        date: date,
        status: status
      }));

      const { error } = await supabase
        .from('attendance')
        .insert(inserts);

      if (error) throw error;

      // 1. Fetch ALL-TIME stats for these students to calculate percentage
      const studentIds = Object.keys(attendanceRecords);
      const { data: history } = await supabase
        .from('attendance')
        .select('student_id, status')
        .in('student_id', studentIds);

      // 2. Prepare detailed rows for Google Sheets
      const detailedRows = students
        .filter(s => studentIds.includes(s.id))
        .map(s => {
          const studentHistory = history.filter(h => h.student_id === s.id);
          const totalDays = studentHistory.length;
          const presentDays = studentHistory.filter(h => h.status === 'present').length;
          const percentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) + '%' : '100.0%';

          return {
            date: date,
            student_name: s.name,
            course: s.course,
            status: (attendanceRecords[s.id] || 'absent').toUpperCase(),
            all_time_percentage: percentage,
            timestamp: new Date().toLocaleString()
          };
        });

      // Sync bulk rows to "Attendance_Details" tab
      syncToSheets('attendance_details', detailedRows);

      // Also sync a small summary to "Attendance" tab (optional, keeping it for the dashboard feel)
      const total = inserts.length;
      const presentTotal = inserts.filter(r => r.status === 'present').length;
      syncToSheets('attendance_summary', {
        date: date,
        total_students: total,
        present_count: presentTotal,
        summary_percentage: ((presentTotal / total) * 100).toFixed(1) + '%'
      });

      fetchData(); // Refresh historical counts
      return { success: true };
    } catch (error) {
      console.error('Error saving attendance:', error.message);
      return { success: false, error: error.message };
    }
  };

  const removeStudent = async (id) => {
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setStudents(prev => prev.filter(s => s.id !== id));
      setFees(prev => prev.filter(f => f.student_id !== id));
    } catch (error) {
      console.error('Error deleting student:', error.message);
    }
  };

  const value = {
    students,
    setStudents,
    addStudent,
    removeStudent,
    courses,
    setCourses,
    fees,
    updateFeeStatus,
    saveAttendance,
    attendanceHistory,
    loading,
    setLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
