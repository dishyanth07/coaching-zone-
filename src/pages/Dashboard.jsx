import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';

const Dashboard = () => {
  const { students, courses, fees, attendanceHistory, searchQuery } = useApp();

  // 1. Stats Calculations
  const pendingFeeTotal = fees
    .filter(f => f.status === 'pending')
    .reduce((sum, f) => sum + (f.amount || 0), 0);
  const pendingFeeKids = fees.filter(f => f.status === 'pending').length;

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAttendance = attendanceHistory?.filter(a => a.date === todayStr) || [];
  const totalMarked = todayAttendance.length;
  const presentCount = todayAttendance.filter(a => a.status === 'present').length;
  const attendancePercent = totalMarked > 0 ? ((presentCount / totalMarked) * 100).toFixed(0) : '0';

  // 2. Data Transformation for Charts
  const attendanceTrendData = useMemo(() => {
    const last7Days = [...new Set(attendanceHistory.map(a => a.date))]
      .sort()
      .slice(-7);
    
    return last7Days.map(date => {
      const dayData = attendanceHistory.filter(a => a.date === date);
      const present = dayData.filter(a => a.status === 'present').length;
      const total = dayData.length;
      return {
        name: date.split('-').slice(1).join('/'),
        rate: total > 0 ? Math.round((present / total) * 100) : 0
      };
    });
  }, [attendanceHistory]);

  const feeStatusData = useMemo(() => [
    { name: 'Paid', value: fees.filter(f => f.status === 'paid').reduce((s, f) => s + f.amount, 0), color: '#005bbf' },
    { name: 'Pending', value: fees.filter(f => f.status === 'pending').reduce((s, f) => s + f.amount, 0), color: '#ba1a1a' }
  ], [fees]);

  const stats = [
    { label: 'Total Students', value: students.length.toString(), change: `Live`, color: 'bg-primary/10 text-primary' },
    { label: 'Today Attendance', value: `${attendancePercent}%`, change: `${presentCount} kids`, color: 'bg-secondary/10 text-secondary' },
    { label: 'Pending Fees', value: `₹${pendingFeeTotal.toLocaleString('en-IN')}`, change: `${pendingFeeKids} kids`, color: 'bg-[#ba1a1a]/10 text-[#ba1a1a]' },
    { label: 'Active Courses', value: courses.length.toString(), change: 'Live', color: 'bg-tertiary/10 text-tertiary' },
  ];

  const recentStudents = students
    .filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.course.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="premium-card transition-all hover:shadow-xl">
            <p className="text-sm font-medium text-[#414754] mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-manrope font-bold">{stat.value}</h3>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${stat.color}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <div className="premium-card min-h-[350px] flex flex-col">
          <h3 className="text-lg font-bold mb-6">Attendance Trend (%)</h3>
          <div className="flex-1 w-full min-h-[250px]">
            {attendanceTrendData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceTrendData}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#005bbf" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#005bbf" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} domain={[0, 100]} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="rate" stroke="#005bbf" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-surface-dim italic">Waiting for records...</div>
            )}
          </div>
        </div>

        {/* Fees Chart */}
        <div className="premium-card min-h-[350px] flex flex-col">
          <h3 className="text-lg font-bold mb-6">Fee Distribution (Amount)</h3>
          <div className="flex-1 w-full min-h-[250px]">
            {fees.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={feeStatusData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} hide />
                  <Tooltip cursor={{fill: '#f7f9fc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                    {feeStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-surface-dim italic">Waiting for records...</div>
            )}
          </div>
        </div>
      </div>
      
      <div className="premium-card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Recent Enrolments</h3>
          <span className="text-xs text-primary font-bold bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">{students.length} Total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container/50">
                <th className="py-4 px-6 font-manrope text-xs font-bold uppercase tracking-wider">Student</th>
                <th className="py-4 px-6 font-manrope text-xs font-bold uppercase tracking-wider">Course</th>
                <th className="py-4 px-6 font-manrope text-xs font-bold uppercase tracking-wider">Join Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {recentStudents.length > 0 ? (
                recentStudents.map((row, i) => (
                  <tr key={i} className="hover:bg-surface-container/30 transition-colors">
                    <td className="py-4 px-6 font-bold text-sm">{row.name}</td>
                    <td className="py-4 px-6 text-sm text-[#414754] font-medium">{row.course}</td>
                    <td className="py-4 px-6 text-xs text-surface-dim font-mono">{row.join_date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-20 text-center text-surface-dim italic">No students enrolled yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
