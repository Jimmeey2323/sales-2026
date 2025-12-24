import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'hero' | 'default';
  size?: 'sm' | 'md';
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', size = 'sm' }) => {
  const variants = {
    primary: 'bg-[#1a2332]/10 text-[#1a2332] border-[#1a2332]/20',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    hero: 'bg-gradient-to-r from-[#1a2332] to-[#2d3a4f] text-white border-transparent',
    default: 'bg-slate-100 text-slate-600 border-slate-200'
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  return (
    <span className={`
      inline-flex items-center font-medium rounded-full border
      ${variants[variant]}
      ${sizes[size]}
    `}>
      {children}
    </span>
  );
};

export default Badge;
