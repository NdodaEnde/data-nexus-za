import React from 'react';
import { AlertTriangle, CheckCircle, Clock, TrendingDown, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface DataQualityIndicatorProps {
  quality: 'high' | 'medium' | 'low';
  score?: number; // 0-100
  lastUpdated: string;
  frequency: 'monthly' | 'quarterly' | 'annually';
  trend?: 'improving' | 'declining' | 'stable';
  issues?: string[];
  className?: string;
}

const DataQualityIndicator: React.FC<DataQualityIndicatorProps> = ({
  quality,
  score,
  lastUpdated,
  frequency,
  trend,
  issues = [],
  className
}) => {
  const qualityConfig = {
    high: {
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      icon: CheckCircle,
      label: 'High Quality'
    },
    medium: {
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      icon: Clock,
      label: 'Medium Quality'
    },
    low: {
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      icon: AlertTriangle,
      label: 'Low Quality'
    }
  };

  const trendConfig = {
    improving: { icon: TrendingUp, color: 'text-green-600', label: 'Improving' },
    declining: { icon: TrendingDown, color: 'text-red-600', label: 'Declining' },
    stable: { icon: Clock, color: 'text-blue-600', label: 'Stable' }
  };

  const config = qualityConfig[quality];
  const Icon = config.icon;
  const TrendIcon = trend ? trendConfig[trend].icon : null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.ceil(diffDays / 7)} weeks ago`;
    } else if (diffDays < 365) {
      return `${Math.ceil(diffDays / 30)} months ago`;
    } else {
      return `${Math.ceil(diffDays / 365)} years ago`;
    }
  };

  const getQualityMessage = () => {
    if (quality === 'high') {
      return 'Data is complete, accurate, and up-to-date';
    } else if (quality === 'medium') {
      return 'Data has minor gaps or is slightly outdated';
    } else {
      return 'Data has significant gaps or quality issues';
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {/* Main Quality Badge */}
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md border",
              config.bgColor,
              config.borderColor
            )}>
              <Icon className={cn("h-4 w-4", config.color)} />
              <span className={cn("text-sm font-medium", config.color)}>
                {config.label}
              </span>
              {score !== undefined && (
                <Badge variant="outline" className="ml-1 h-5 text-xs">
                  {score}%
                </Badge>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-2 max-w-xs">
              <p className="font-medium">{getQualityMessage()}</p>
              {score !== undefined && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Quality Score</span>
                    <span>{score}%</span>
                  </div>
                  <Progress value={score} className="h-1" />
                </div>
              )}
              {issues.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs font-medium">Issues:</p>
                  <ul className="text-xs space-y-0.5">
                    {issues.map((issue, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <AlertTriangle className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>

        {/* Trend Indicator */}
        {trend && TrendIcon && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1">
                <TrendIcon className={cn("h-4 w-4", trendConfig[trend].color)} />
                <span className={cn("text-xs", trendConfig[trend].color)}>
                  {trendConfig[trend].label}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Data quality trend over time</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* Freshness Indicator */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span>Updated {formatDate(lastUpdated)}</span>
        <Badge variant="outline" className="h-4 text-xs">
          {frequency}
        </Badge>
      </div>

      {/* Issues Alert */}
      {issues.length > 0 && quality === 'low' && (
        <div className={cn(
          "flex items-start gap-2 p-2 rounded-md text-xs",
          "bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800"
        )}>
          <AlertTriangle className="h-3 w-3 text-red-600 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p className="font-medium text-red-800 dark:text-red-400">
              Data Quality Issues
            </p>
            <ul className="space-y-0.5 text-red-700 dark:text-red-300">
              {issues.slice(0, 2).map((issue, index) => (
                <li key={index}>• {issue}</li>
              ))}
              {issues.length > 2 && (
                <li>• And {issues.length - 2} more issue{issues.length > 3 ? 's' : ''}</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataQualityIndicator;