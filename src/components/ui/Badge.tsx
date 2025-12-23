import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'hero' | 'default';
  size?: 'sm' | 'md';
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', size = 'sm' }) => {
  const variants = {
    primary: 'bg-primary/20 text-primary border-primary/30 font-bold shadow-sm',
    success: 'bg-success/20 text-success border-success/30 font-bold shadow-sm',
    warning: 'bg-warning/20 text-warning border-warning/30 font-bold shadow-sm',
    danger: 'bg-destructive/20 text-destructive border-destructive/30 font-bold shadow-sm',
    info: 'bg-secondary/20 text-secondary border-secondary/30 font-bold shadow-sm',
    hero: 'gradient-primary text-primary-foreground border-transparent font-bold shadow-md',
    default: 'bg-muted/80 text-muted-foreground border-muted-foreground/20 font-semibold'
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
