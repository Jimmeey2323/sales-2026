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
    <header className="sticky top-4 z-40 pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-surface p-3 sm:p-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25">
              <span className="text-white font-extrabold text-lg sm:text-xl">P57</span>
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <h1 className="text-base sm:text-lg brand-heading">Physique 57 India</h1>
              <p className="text-xs text-muted-foreground">Sales Plan FY 2025-26</p>
            </div>
          </div>

          {/* Navigation Tabs - compact */}
          <nav className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 bg-muted/30 rounded-lg p-1">
              {(['Q1', 'Q2', 'Q3', 'Q4', 'ALL'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                  className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap ${activeFilter === filter ? 'tab-button active' : 'tab-button'}`}
                >
                  {filter === 'ALL' ? 'Full Year' : filter}
                </button>
              ))}
            </div>
          </nav>

          {/* Right: controls */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <label className="flex items-center gap-2 px-3 py-1.5 glass-btn">
                <input
                  type="checkbox"
                  id="show-cancelled"
                  checked={showCancelled}
                  onChange={(e) => setShowCancelled(e.target.checked)}
                  className="w-4 h-4 text-primary bg-card border-2 hairline-border rounded focus:ring-primary/20 focus:ring-2"
                />
                <span className="text-sm font-medium text-foreground select-none">Show Cancelled</span>
              </label>

              <div className="px-3 py-1.5 glass-btn flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">+33%</span>
              </div>

              <div className="px-3 py-1.5 glass-btn flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">3 Studios</span>
              </div>
            </div>

            <div>
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
      aria-pressed={theme === 'dark'}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`glass-btn p-2 ${theme === 'dark' ? 'shadow-md' : ''}`}
      title="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-slate-600" />
      )}
    </button>
  )
}
