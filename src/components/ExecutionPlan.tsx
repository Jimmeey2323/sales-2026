import React from 'react';
import { Users, Megaphone, Settings, Calculator, CheckCircle } from 'lucide-react';
import GlassCard from './ui/GlassCard';

const ExecutionPlan: React.FC = () => {
  const departments = [
    {
      name: 'Marketing',
      icon: Megaphone,
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      tasks: [
        'July: "Monsoon Proof" ad creatives',
        'Aug: "Freedom" email blast sequences',
        'Nov: Black Friday countdown timers on website',
        'Ensure all Landing Pages reflect "Price after VAT" clearly'
      ]
    },
    {
      name: 'Sales',
      icon: Users,
      color: 'from-sky-500 to-sky-600',
      bgColor: 'bg-sky-50',
      tasks: [
        'Daily: 50 calls/agent',
        'Lead with "Value Add" before dropping price',
        'Do not offer "Floor Price" as first option',
        'Floor Price is a closing tool only'
      ]
    },
    {
      name: 'Operations',
      icon: Settings,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      tasks: [
        'Front Desk: Upsell Retail on every check-in',
        'Manage "Mystery Gifts" in December',
        'Trainers: Announce upsell offers at end of every class',
        'Enable "Monsoon Tag" in CRM for freeze overriding'
      ]
    },
    {
      name: 'Finance',
      icon: Calculator,
      color: 'from-violet-500 to-violet-600',
      bgColor: 'bg-violet-50',
      tasks: [
        'Audit every sale against Floor Price',
        'Mumbai 1M > ₹11,999',
        'Ensure 5% VAT collected on top of every discounted rate',
        'Track trainer payout for PT bundles'
      ]
    }
  ];

  return (
    <GlassCard className="p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#1a2332]/5 flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-[#1a2332]" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1a2332]">Execution Plan</h2>
          <p className="text-sm text-slate-500">Roles & Responsibilities by Department</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((dept) => (
          <div 
            key={dept.name}
            className={`p-5 rounded-xl ${dept.bgColor} border border-white/50`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${dept.color} flex items-center justify-center`}>
                <dept.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-[#1a2332]">{dept.name}</h3>
            </div>
            
            <ul className="space-y-2">
              {dept.tasks.map((task, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default ExecutionPlan;
