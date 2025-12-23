import React from 'react';
import { Sparkles, Gift, PartyPopper, Star } from 'lucide-react';
import GlassCard from './ui/GlassCard';

const AnniversaryBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 p-1">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative bg-gradient-to-r from-amber-500/90 via-amber-400/90 to-yellow-400/90 backdrop-blur-sm rounded-[22px] p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Left: Icon and Title */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <div className="relative">
                <span className="text-4xl sm:text-5xl font-bold text-white">8</span>
                <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-white animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <PartyPopper className="w-5 h-5 text-white" />
                <span className="text-sm font-medium text-white/90 uppercase tracking-wider">April 2026</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">8th Anniversary</h2>
              <p className="text-white/80 text-sm">The "Infinite 8" Campaign</p>
            </div>
          </div>

          {/* Center: Key Stats */}
          <div className="flex-1 grid grid-cols-3 gap-4 w-full lg:w-auto">
            <div className="text-center px-4 py-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-bold text-white">₹94L</p>
              <p className="text-xs text-white/70">Target</p>
            </div>
            <div className="text-center px-4 py-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-bold text-white">35%</p>
              <p className="text-xs text-white/70">Growth</p>
            </div>
            <div className="text-center px-4 py-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-bold text-white">28%</p>
              <p className="text-xs text-white/70">Max Discount</p>
            </div>
          </div>

          {/* Right: CTA */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => {
                const element = document.getElementById('april');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="px-6 py-3 bg-white text-amber-600 font-semibold rounded-xl hover:bg-white/90 transition-colors shadow-lg shadow-amber-600/20 flex items-center gap-2"
            >
              <Gift className="w-5 h-5" />
              View Anniversary Plan
            </button>
            <p className="text-xs text-white/70">Limited to first 28 people</p>
          </div>
        </div>

        {/* Bottom: Key Highlights */}
        <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <Star className="w-4 h-4 text-white" />
            <span>The Infinite 8 Annual</span>
          </div>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <Star className="w-4 h-4 text-white" />
            <span>The Great 8 Bundle</span>
          </div>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <Star className="w-4 h-4 text-white" />
            <span>Lucky 8 Pack</span>
          </div>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <Star className="w-4 h-4 text-white" />
            <span>Golden Ticket Hunt</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnniversaryBanner;
