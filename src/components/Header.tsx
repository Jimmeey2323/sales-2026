import React from 'react';
import { Sparkles, TrendingUp, Building2, Sun, Moon } from 'lucide-react';
import { useTheme } from './theme-provider';

interface HeaderProps {
  activeFilter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL';
  setActiveFilter: (filter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'ALL') => void;
  showCancelled: boolean;
  setShowCancelled: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ activeFilter, setActiveFilter, showCancelled, setShowCancelled }) => {
  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-xl border-b-2 hairline-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300">
              <span className="text-white font-bold text-lg sm:text-xl premium-heading">P57</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold premium-heading text-foreground">Physique 57 India</h1>
              <p className="text-xs body-copy text-muted-foreground font-semibold">Sales Plan FY 2025-26</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 bg-muted/90 rounded-xl p-1 shadow-md">
            {(['Q1', 'Q2', 'Q3', 'Q4', 'ALL'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  px-3 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 transform
                  ${activeFilter === filter 
                    ? 'gradient-primary text-primary-foreground shadow-lg scale-105' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-card/80 hover:shadow-md'
                  }
                `}
              >
                {filter === 'ALL' ? 'Full Year' : filter}
              </button>
            ))}
          </div>

          {/* Stats Pills */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-xl border-2 hairline-border shadow-md">
              <input
                type="checkbox"
                id="show-cancelled"
                checked={showCancelled}
                onChange={(e) => setShowCancelled(e.target.checked)}
                className="w-4 h-4 text-primary bg-card border-2 hairline-border rounded focus:ring-primary/30 focus:ring-2"
              />
              <label htmlFor="show-cancelled" className="text-sm font-semibold text-foreground cursor-pointer premium-heading">
                Show Cancelled
              </label>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 gradient-success rounded-xl shadow-md">
              <TrendingUp className="w-4 h-4 text-success-foreground" />
              <span className="text-sm font-bold text-success-foreground premium-heading">+33% Growth</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-xl border-2 hairline-border shadow-md">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-foreground premium-heading">3 Studios</span>
            </div>
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleTheme();
      }}
      className="p-2.5 rounded-xl bg-card border-2 hairline-border hover:border-primary shadow-md hover:shadow-lg transition-all duration-300 flex items-center transform hover:scale-105"
      title="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5 text-warning" /> : <Moon className="w-5 h-5 text-primary" />}
    </button>
  )
}
