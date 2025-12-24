import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div
      className={`
        glass-card rounded-xl
        ${hover ? 'hover:shadow-lg transition-shadow duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;
