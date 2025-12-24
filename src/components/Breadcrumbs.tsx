import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  activeFilter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL';
  activeMonth?: string | null;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ activeFilter, activeMonth }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      <Home className="w-4 h-4" />
      <span className="font-medium text-foreground">Sales Plan</span>
      
      {activeFilter !== 'ALL' && (
        <>
          <ChevronRight className="w-4 h-4" />
          <span className={activeMonth ? '' : 'font-medium text-foreground'}>{activeFilter}</span>
        </>
      )}
      
      {activeMonth && (
        <>
          <ChevronRight className="w-4 h-4" />
          <span className="font-medium text-foreground">{activeMonth}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumbs;
