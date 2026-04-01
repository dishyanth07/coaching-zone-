import React from 'react';
import { MessageSquare, Sparkles, Send, PhoneCall } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Notifications = () => {
  const { courses } = useApp();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="premium-card">
          <h3 className="text-xl font-manrope font-bold mb-6">Create New Broadcast</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#414754] mb-2 uppercase tracking-wide">Target Batch</label>
              <select className="w-full bg-surface-container/50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                <option>All Students</option>
                {courses.map(course => (
                  <option key={course.id}>{course.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#414754] mb-2 uppercase tracking-wide">Broadcast Message</label>
              <textarea 
                rows="5"
                placeholder="Type your announcement here..."
                className="w-full bg-surface-container/50 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              ></textarea>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-2">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">SMS Broadcast Enabled</span>
              </div>
              <button className="btn-primary flex items-center gap-2">
                <Send size={18} /> Send Broadcast
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-manrope font-bold">Activity History</h3>
          <div className="premium-card py-12 text-center text-surface-dim italic">
            No broadcast history yet. Sent messages will appear here.
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="premium-card bg-[#2d3133] text-white border-none text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
            <PhoneCall size={28} className="text-[#8df5e4]" />
          </div>
          <h4 className="font-manrope font-bold text-xl mb-2">Support Center</h4>
          <p className="text-white/60 text-sm mb-6">Connect with HQ for technical assistance.</p>
          <div className="bg-white/10 py-3 px-4 rounded-xl mb-3">
            <p className="text-xs uppercase font-bold text-white/40 tracking-widest mb-1">Direct Line</p>
            <p className="font-manrope font-bold text-lg">8248800704</p>
          </div>
          <p className="text-xs text-white/40 italic">Support: 9 AM - 8 PM</p>
        </div>

        <div className="premium-card bg-primary/5 border-primary/20">
          <h4 className="font-manrope font-bold text-lg mb-3">System Updates</h4>
          <p className="text-sm text-[#191c1e] leading-relaxed">
            Broadcasts help keep parents engaged. Try sending weekly progress updates!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
