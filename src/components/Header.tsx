import React from 'react';
import { Sparkles, TrendingUp, Building2 } from 'lucide-react';

interface HeaderProps {
  activeFilter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL';
  setActiveFilter: (filter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL') => void;
}

const Header: React.FC<HeaderProps> = ({ activeFilter, setActiveFilter }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#1a2332] to-[#2d3a4f] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg sm:text-xl">P57</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-[#1a2332]">Physique 57 India</h1>
              <p className="text-xs text-slate-500">Sales Plan FY 2025-26</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 bg-slate-100/80 rounded-xl p-1">
            {(['Q1', 'Q2', 'Q3', 'Q4', 'ALL'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300
                  ${activeFilter === filter 
                    ? 'bg-white text-[#1a2332] shadow-md' 
                    : 'text-slate-500 hover:text-[#1a2332]'
                  }
                `}
              >
                {filter === 'ALL' ? 'Full Year' : filter}
              </button>
            ))}
          </div>

          {/* Stats Pills */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">+33% Growth</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1a2332]/5 rounded-xl">
              <Building2 className="w-4 h-4 text-[#1a2332]" />
              <span className="text-sm font-semibold text-[#1a2332]">3 Studios</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
