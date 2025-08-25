import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertTriangle, CheckCircle, Clock, Database, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataQuality {
  freshness: 'current' | 'recent' | 'stale';
  completeness: number; // 0-100
  confidence: 'high' | 'medium' | 'low';
  lastUpdated: Date;
  source: string;
}

interface DataQualityIndicatorProps {
  quality: DataQuality;
  showDetails?: boolean;
  className?: string;
}

const DataQualityIndicator: React.FC<DataQualityIndicatorProps> = ({
  quality,
  showDetails = false,
  className
}) => {
  const getFreshnessIcon = (freshness: string) => {
    switch (freshness) {
      case 'current':
        return <CheckCircle className="h-3 w-3 text-green-600" />;
      case 'recent':
        return <Clock className="h-3 w-3 text-yellow-600" />;
      case 'stale':
        return <AlertTriangle className="h-3 w-3 text-red-600" />;
      default:
        return <Info className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getFreshnessColor = (freshness: string) => {
    switch (freshness) {
      case 'current':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'recent':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'stale':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  const getCompletenessColor = (completeness: number) => {
    if (completeness >= 90) return 'text-green-600';
    if (completeness >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const daysSinceUpdate = Math.floor(
    (new Date().getTime() - quality.lastUpdated.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (!showDetails) {
    // Compact view - just the quality badge
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className={cn(
              "h-5 text-xs flex items-center gap-1",
              getFreshnessColor(quality.freshness),
              className
            )}
          >
            {getFreshnessIcon(quality.freshness)}
            {quality.freshness}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1 text-xs">
            <div>Freshness: {quality.freshness}</div>
            <div>Completeness: {quality.completeness}%</div>
            <div>Confidence: {quality.confidence}</div>
            <div>Updated: {daysSinceUpdate === 0 ? 'Today' : `${daysSinceUpdate} days ago`}</div>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  // Detailed view
  return (
    <div className={cn("space-y-3 p-3 bg-muted/30 rounded-lg border", className)}>
      <div className="flex items-center gap-2">
        <Database className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium">Data Quality Metrics</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Freshness */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {getFreshnessIcon(quality.freshness)}
            <span className="text-xs font-medium">Freshness</span>
          </div>
          <Badge
            variant="outline"
            className={cn("text-xs", getFreshnessColor(quality.freshness))}
          >
            {quality.freshness}
          </Badge>
          <p className="text-xs text-muted-foreground">
            {daysSinceUpdate === 0 ? 'Updated today' : `${daysSinceUpdate} days old`}
          </p>
        </div>

        {/* Completeness */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className={cn("h-3 w-3", getCompletenessColor(quality.completeness))} />
            <span className="text-xs font-medium">Completeness</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className={cn("text-xs font-medium", getCompletenessColor(quality.completeness))}>
                {quality.completeness}%
              </span>
            </div>
            <Progress value={quality.completeness} className="h-1" />
          </div>
        </div>

        {/* Confidence */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Info className={cn("h-3 w-3", getConfidenceColor(quality.confidence))} />
            <span className="text-xs font-medium">Confidence</span>
          </div>
          <Badge
            variant="outline"
            className={cn("text-xs", getConfidenceColor(quality.confidence))}
          >
            {quality.confidence}
          </Badge>
          <p className="text-xs text-muted-foreground">
            Statistical reliability
          </p>
        </div>
      </div>

      {/* Source */}
      <div className="pt-2 border-t border-border/30">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Database className="h-3 w-3" />
          <span>Source: {quality.source}</span>
        </div>
      </div>
    </div>
  );
};

export default DataQualityIndicator;