import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hover = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden
        bg-white/70 backdrop-blur-xl
        border border-white/50
        rounded-2xl
        shadow-[0_8px_32px_rgba(26,35,50,0.08)]
        ${hover ? 'transition-all duration-300 hover:shadow-[0_12px_48px_rgba(26,35,50,0.12)] hover:-translate-y-1 cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-slate-100/20 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlassCard;
