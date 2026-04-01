import { IndianRupee, Send, Download, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Fees = () => {
  const { fees, updateFeeStatus, searchQuery } = useApp();
  
  const handleMarkAsPaid = async (id) => {
    await updateFeeStatus(id, 'paid');
  };

  const filteredFees = fees.filter(fee => {
    const query = searchQuery.toLowerCase();
    return (
      fee.students?.name?.toLowerCase().includes(query) ||
      fee.students?.course?.toLowerCase().includes(query)
    );
  });

  const exportToCSV = () => {
    if (filteredFees.length === 0) return;
    
    const headers = ['Student Name', 'Course', 'Amount', 'Status', 'Due Date'];
    const rows = filteredFees.map(f => [
      f.students?.name || 'Unknown',
      f.students?.course || '-',
      f.amount,
      f.status.toUpperCase(),
      f.due_date
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `fees_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalCollected = fees
    .filter(f => f.status === 'paid')
    .reduce((sum, f) => sum + (f.amount || 0), 0);

  const pendingDues = fees
    .filter(f => f.status === 'pending')
    .reduce((sum, f) => sum + (f.amount || 0), 0);

  const pendingCount = fees.filter(f => f.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="premium-card bg-gradient-to-br from-primary to-primary-container text-white border-none transition-all hover:shadow-2xl">
          <div className="flex justify-between items-start mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
              <IndianRupee size={24} />
            </div>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Total Collection</span>
          </div>
          <h2 className="text-4xl font-manrope font-bold mb-2">₹{totalCollected.toLocaleString('en-IN')}</h2>
          <p className="text-white/60 text-sm italic">Verified payments in system</p>
        </div>
        
        <div className="premium-card bg-[#2d3133] text-white border-none transition-all hover:shadow-2xl">
          <div className="flex justify-between items-start mb-8">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
              <CreditCardIcon size={24} className="text-[#8df5e4]" />
            </div>
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-[#8df5e4] uppercase tracking-wider">Pending Dues</span>
          </div>
          <h2 className="text-4xl font-manrope font-bold mb-2">₹{pendingDues.toLocaleString('en-IN')}</h2>
          <p className="text-white/60 text-sm">Outstanding from {pendingCount} students</p>
        </div>
      </div>

      <div className="premium-card p-0 overflow-hidden">
        <div className="p-6 border-b border-surface-container flex items-center justify-between">
          <h3 className="font-bold text-lg">Student Fee Status</h3>
          <div className="flex gap-4 items-center">
            {searchQuery && (
              <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
                Filtering for: "{searchQuery}"
              </span>
            )}
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 text-primary font-bold text-sm hover:underline"
            >
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-surface-container/50">
                <th className="py-4 px-6 font-manrope text-sm font-bold">Student</th>
                <th className="py-4 px-6 font-manrope text-sm font-bold">Amount</th>
                <th className="py-4 px-6 font-manrope text-sm font-bold">Status</th>
                <th className="py-4 px-6 font-manrope text-sm font-bold">Due Date</th>
                <th className="py-4 px-6 font-manrope text-sm font-bold text-center">Reminders</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {filteredFees.length > 0 ? (
                filteredFees.map((fee) => (
                  <tr key={fee.id} className="hover:bg-surface-container/30 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-semibold">{fee.students?.name || 'Unknown Student'}</p>
                      <p className="text-xs text-surface-dim">{fee.students?.course || '-'}</p>
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-sm text-primary">₹{fee.amount?.toLocaleString('en-IN')}</td>
                    <td className="py-4 px-6">
                      <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        fee.status === 'paid' 
                          ? 'bg-tertiary/10 text-tertiary' 
                          : 'bg-[#ba1a1a]/10 text-[#ba1a1a]'
                      }`}>
                        {fee.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-[#414754] font-medium">{fee.due_date}</td>
                    <td className="py-4 px-6 text-center">
                      {fee.status === 'pending' && (
                        <div className="flex gap-2 justify-center">
                          <button 
                            onClick={() => handleMarkAsPaid(fee.id)}
                            className="flex items-center gap-2 px-4 py-1.5 bg-tertiary/10 text-tertiary rounded-full text-xs font-bold hover:bg-tertiary hover:text-white transition-all shadow-sm"
                          >
                            <Check size={14} /> Paid
                          </button>
                          <button className="flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold hover:bg-primary hover:text-white transition-all shadow-sm">
                            <Send size={14} /> Remind
                          </button>
                        </div>
                      )}
                      {fee.status === 'paid' && (
                        <span className="text-xs text-tertiary font-bold flex items-center justify-center gap-1">
                          <Check size={14} /> Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-20 text-center text-surface-dim italic">
                    <p className="text-lg mb-2">No records found for "{searchQuery}"</p>
                    <p className="text-sm">Try searching for a different name or course.</p>
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

const CreditCardIcon = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

export default Fees;
