import React from 'react';
import { User, Shield, Palette, Zap, Check } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <h3 className="text-xl font-manrope font-bold mb-2">Workspace Environment</h3>
          <p className="text-sm text-[#414754]">Manage your coaching center profile and global application preferences.</p>
        </div>
        
        <div className="flex-1 space-y-6">
          <div className="premium-card">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-surface-container rounded-3xl flex items-center justify-center text-primary shadow-premium border-2 border-white">
                <User size={30} />
              </div>
              <div>
                <h4 className="text-xl font-bold font-manrope">Coaching Admin</h4>
                <p className="text-xs text-secondary font-bold uppercase tracking-widest bg-secondary/10 px-2 py-0.5 rounded-md inline-block mt-1">Premium Tier</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: 'Coaching Name', value: 'Coaching Zone' },
                { label: 'Phone Number', value: '8248800704' },
                { label: 'Work Timings', value: '9 AM – 8 PM' },
                { label: 'Admin Role', value: 'Master Coach Level 4' },
              ].map((item, i) => (
                <div key={i}>
                  <label className="block text-[10px] font-bold text-surface-dim uppercase tracking-widest mb-1">{item.label}</label>
                  <p className="font-medium text-[#191c1e]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="premium-card">
            <h4 className="font-manrope font-bold text-lg mb-6 flex items-center gap-3">
              <Shield size={20} className="text-primary" /> Security & Billing
            </h4>
            <div className="flex items-center justify-between p-4 bg-surface-container/30 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl shadow-premium flex items-center justify-center">
                  <Zap size={20} className="text-amber-500" />
                </div>
                <div>
                  <p className="font-bold text-sm">Stripe Connect</p>
                  <p className="text-xs text-surface-dim underline">Configure Payment Gateway</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-tertiary font-bold text-xs">
                <Check size={16} /> ACTIVE
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-surface-container" />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <h3 className="text-xl font-manrope font-bold mb-2">Automation</h3>
          <p className="text-sm text-[#414754]">Configure how the system interacts with parents and students.</p>
        </div>
        
        <div className="flex-1">
          <div className="premium-card space-y-6">
            {[
              { title: 'Push Notifications', desc: 'Alerts for all system events.', active: true },
              { title: 'Auto-Reminders', desc: 'Automated SMS for upcoming sessions.', active: true },
              { title: 'Weekly Analytics', desc: 'Email summary of center performance.', active: false },
            ].map((toggle, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-bold">{toggle.title}</p>
                  <p className="text-sm text-surface-dim">{toggle.desc}</p>
                </div>
                <button className={`w-12 h-6 rounded-full transition-all relative ${toggle.active ? 'bg-primary' : 'bg-surface-dim'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${toggle.active ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            ))}
            
            <div className="pt-4 mt-4 border-t border-surface-container flex items-center justify-between">
              <p className="text-xs italic text-surface-dim">Last modified: Today at 2:45 PM by Executive Admin</p>
              <button className="btn-primary transform scale-90">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
