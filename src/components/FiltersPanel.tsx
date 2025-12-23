import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import Badge from './ui/Badge';

interface FiltersPanelProps {
  selectedTypes: string[];
  selectedAudiences: string[];
  onTypeToggle: (type: string) => void;
  onAudienceToggle: (audience: string) => void;
  onClearAll: () => void;
  availableTypes: string[];
  availableAudiences: string[];
  className?: string;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  selectedTypes,
  selectedAudiences,
  onTypeToggle,
  onAudienceToggle,
  onClearAll,
  availableTypes,
  availableAudiences,
  className = ""
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const totalFilters = selectedTypes.length + selectedAudiences.length;

  return (
    <div className={`bg-card rounded-xl hairline-border ${className}`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/20 transition-colors rounded-xl"
      >
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold text-base premium-heading">Advanced Filters</h3>
          {totalFilters > 0 && (
            <Badge variant="primary" size="sm">{totalFilters} active</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {totalFilters > 0 && (
            <span className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer" onClick={(e) => { e.stopPropagation(); onClearAll(); }}>
              Clear all
            </span>
          )}
          {isCollapsed ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronUp className="w-4 h-4 text-muted-foreground" />}
        </div>
      </button>

      {!isCollapsed && (
        <div className="px-4 pb-4 border-t hairline-border mt-2 pt-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Offer Types */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block premium-heading">
                Offer Types
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => onTypeToggle(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedTypes.includes(type)
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Audiences */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block premium-heading">
                Target Audience
              </label>
              <div className="flex flex-wrap gap-2">
                {availableAudiences.map((audience) => (
                  <button
                    key={audience}
                    onClick={() => onAudienceToggle(audience)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedAudiences.includes(audience)
                        ? 'bg-secondary text-secondary-foreground shadow-sm'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                  >
                    {audience}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersPanel;