import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FreshnessWarningProps {
  lastUpdated: Date;
  threshold?: number; // days before showing warning
  className?: string;
  onRefresh?: () => void;
}

const FreshnessWarning: React.FC<FreshnessWarningProps> = ({
  lastUpdated,
  threshold = 7, // default 7 days
  className,
  onRefresh
}) => {
  const daysSinceUpdate = Math.floor(
    (new Date().getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceUpdate < threshold) {
    return null; // No warning needed
  }

  const getWarningLevel = (days: number) => {
    if (days >= 30) return 'critical';
    if (days >= 14) return 'warning';
    return 'info';
  };

  const warningLevel = getWarningLevel(daysSinceUpdate);

  const getIcon = () => {
    switch (warningLevel) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'info':
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getVariant = () => {
    switch (warningLevel) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'default';
      case 'info':
      default:
        return 'default';
    }
  };

  const getMessage = () => {
    if (daysSinceUpdate >= 30) {
      return `This data is ${daysSinceUpdate} days old and may be significantly outdated.`;
    }
    if (daysSinceUpdate >= 14) {
      return `This data is ${daysSinceUpdate} days old. Consider the age when interpreting results.`;
    }
    return `This data was last updated ${daysSinceUpdate} days ago.`;
  };

  return (
    <Alert variant={getVariant()} className={cn("mb-4", className)}>
      {getIcon()}
      <AlertDescription className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>{getMessage()}</span>
          <Badge variant="outline" className="text-xs">
            {lastUpdated.toLocaleDateString('en-ZA', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </Badge>
        </div>
        {onRefresh && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="ml-2 h-7"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Check for updates
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default FreshnessWarning;