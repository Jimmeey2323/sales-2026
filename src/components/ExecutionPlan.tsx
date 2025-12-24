import React from 'react';
import { Users, Megaphone, Settings, Calculator, CheckCircle } from 'lucide-react';
import GlassCard from './ui/GlassCard';

interface ExecutionPlanProps {
  activeMonth?: string | null;
}

const ExecutionPlan: React.FC<ExecutionPlanProps> = ({ activeMonth }) => {
  // Month-specific execution plans
  const monthlyPlans: { [key: string]: { name: string; icon: any; color: string; bgColor: string; tasks: string[] }[] } = {
    'January': [
      {
        name: 'Marketing',
        icon: Megaphone,
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50',
        tasks: [
          'New Year Resolution campaign launch',
          'Social media: "Fresh Start" messaging',
          'Email series: "2026 Fitness Goals"',
          'Partner with wellness influencers'
        ]
      },
      {
        name: 'Sales',
        icon: Users,
        color: 'from-sky-500 to-sky-600',
        bgColor: 'bg-sky-50',
        tasks: [
          'Target: New Year resolution seekers',
          'Lead with "Transform Your 2026" offer',
          'Focus on 3-month commitment packages',
          'Premium upsell on all new members'
        ]
      },
      {
        name: 'Operations',
        icon: Settings,
        color: 'from-emerald-500 to-emerald-600',
        bgColor: 'bg-emerald-50',
        tasks: [
          'Onboard high volume of new members',
          'Ensure class capacity management',
          'Run new member orientation sessions',
          'Setup fitness goal tracking for each member'
        ]
      },
      {
        name: 'Finance',
        icon: Calculator,
        color: 'from-violet-500 to-violet-600',
        bgColor: 'bg-violet-50',
        tasks: [
          'Process high volume of new enrollments',
          'Ensure VAT compliance on all sales',
          'Track first-month retention metrics',
          'Monitor cash collection for resolutions'
        ]
      }
    ],
    'July': [
      {
        name: 'Marketing',
        icon: Megaphone,
        color: 'from-rose-500 to-rose-600',
        bgColor: 'bg-rose-50',
        tasks: [
          '"Monsoon Proof" ad creatives',
          'Indoor workout benefits messaging',
          'AC comfort + fitness combination',
          'Email blast: "Beat the Heat" campaign'
        ]
      },
      {
        name: 'Sales',
        icon: Users,
        color: 'from-sky-500 to-sky-600',
        bgColor: 'bg-sky-50',
        tasks: [
          'Daily: 50 calls/agent',
          'Lead with "Value Add" before pricing',
          'Offer monsoon-specific packages',
          'Use AC comfort as key differentiator'
        ]
      },
      {
        name: 'Operations',
        icon: Settings,
        color: 'from-emerald-500 to-emerald-600',
        bgColor: 'bg-emerald-50',
        tasks: [
          'Highlight AC quality in tours',
          'Run monsoon-themed group classes',
          'Manage humidity in studios',
          'Update testimonials: "Perfect for monsoon"'
        ]
      },
      {
        name: 'Finance',
        icon: Calculator,
        color: 'from-violet-500 to-violet-600',
        bgColor: 'bg-violet-50',
        tasks: [
          'Offer monsoon discounts strategically',
          'Audit seasonal pricing tiers',
          'Ensure correct VAT on all monsoon offers',
          'Track monsoon season conversion rates'
        ]
      }
    ],
    'November': [
      {
        name: 'Marketing',
        icon: Megaphone,
        color: 'from-rose-500 to-rose-600',
        bgColor: 'bg-rose-50',
        tasks: [
          'Black Friday countdown timers',
          'Early bird "Pre-Black Friday" previews',
          'Email series: "Cyber Week" deals',
          'Social media: Daily countdown posts'
        ]
      },
      {
        name: 'Sales',
        icon: Users,
        color: 'from-sky-500 to-sky-600',
        bgColor: 'bg-sky-50',
        tasks: [
          'Aggressive outreach to lapsed members',
          'Gift card promotions for referrals',
          'Bundle deals with corporate clients',
          'Floor price holds: NO discounting below'
        ]
      },
      {
        name: 'Operations',
        icon: Settings,
        color: 'from-emerald-500 to-emerald-600',
        bgColor: 'bg-emerald-50',
        tasks: [
          'Prepare for high volume traffic',
          'Extra staff on Black Friday',
          'Gift wrapping service for gift cards',
          'Testimonial collection: Success stories'
        ]
      },
      {
        name: 'Finance',
        icon: Calculator,
        color: 'from-violet-500 to-violet-600',
        bgColor: 'bg-violet-50',
        tasks: [
          'Pre-calculate Black Friday margins',
          'Ensure margin protection on all deals',
          'Track gift card sales separately',
          'Audit compliance: Floor price enforcement'
        ]
      }
    ]
  };

  // Get current month's plan or default
  const currentPlan = activeMonth && monthlyPlans[activeMonth] 
    ? monthlyPlans[activeMonth]
    : [
      {
        name: 'Marketing',
        icon: Megaphone,
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50',
        tasks: ['Plan month-specific campaigns', 'Align messaging with month theme', 'Coordinate with sales on timing']
      },
      {
        name: 'Sales',
        icon: Users,
        color: 'from-sky-500 to-sky-600',
        bgColor: 'bg-sky-50',
        tasks: ['Execute daily outreach targets', 'Focus on monthly hero offer', 'Maintain floor price discipline']
      },
      {
        name: 'Operations',
        icon: Settings,
        color: 'from-emerald-500 to-emerald-600',
        bgColor: 'bg-emerald-50',
        tasks: ['Support sales initiatives', 'Manage studio capacity', 'Deliver exceptional experience']
      },
      {
        name: 'Finance',
        icon: Calculator,
        color: 'from-violet-500 to-violet-600',
        bgColor: 'bg-violet-50',
        tasks: ['Monitor monthly targets', 'Ensure pricing compliance', 'Track profitability metrics']
      }
    ];

  return (
    <GlassCard className="p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Execution Plan {activeMonth && `- ${activeMonth}`}</h2>
          <p className="text-sm text-muted-foreground">Roles & Responsibilities by Department</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentPlan.map((dept) => (
          <div 
            key={dept.name}
            className={`p-5 rounded-xl ${dept.bgColor} border border-white/50`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${dept.color} flex items-center justify-center`}>
                <dept.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-foreground">{dept.name}</h3>
            </div>
            
            <ul className="space-y-2">
              {dept.tasks.map((task, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-foreground/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-2 flex-shrink-0" />
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
