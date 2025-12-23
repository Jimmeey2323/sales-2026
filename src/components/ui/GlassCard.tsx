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
        relative overflow-hidden glass-card
        rounded-2xl
        ${hover ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer hover:border-primary/50' : ''}
        ${className}
      `}
    >
      {/* Enhanced gradient overlay */}
      <div className=\"absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-primary/5 pointer-events-none\" />
      <div className=\"relative z-10\">{children}</div>
    </div>
  );
};

export default GlassCard;
