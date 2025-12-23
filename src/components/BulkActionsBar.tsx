import React from 'react';
import { Check, Download, Trash2, Eye, EyeOff } from 'lucide-react';

interface BulkActionsBarProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onBulkDelete: () => void;
  onBulkExport: () => void;
  onBulkToggleVisibility: () => void;
  isVisible?: boolean;
}

const BulkActionsBar: React.FC<BulkActionsBarProps> = ({
  selectedCount,
  totalCount,
  onSelectAll,
  onClearSelection,
  onBulkDelete,
  onBulkExport,
  onBulkToggleVisibility,
  isVisible = true
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-card/95 backdrop-blur-xl hairline-border rounded-xl shadow-lg px-6 py-4 min-w-80 animate-slide-up">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-semibold premium-heading">
              {selectedCount} of {totalCount} selected
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={onSelectAll}
              className="text-xs px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              Select All
            </button>
            <button
              onClick={onClearSelection}
              className="text-xs px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBulkExport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:scale-105 transition-transform shadow-sm"
            title="Export selected"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          
          <button
            onClick={onBulkToggleVisibility}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:scale-105 transition-transform shadow-sm"
            title={isVisible ? "Hide selected" : "Show selected"}
          >
            {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {isVisible ? 'Hide' : 'Show'}
          </button>
          
          <button
            onClick={onBulkDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:scale-105 transition-transform shadow-sm"
            title="Delete selected"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;