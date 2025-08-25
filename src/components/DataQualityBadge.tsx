import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataQualityBadgeProps {
  quality: 'high' | 'medium' | 'low';
  completeness?: number;
  lastUpdated?: Date;
  source?: string;
  size?: 'sm' | 'md';
  className?: string;
}

const DataQualityBadge: React.FC<DataQualityBadgeProps> = ({
  quality,
  completeness = 100,
  lastUpdated,
  source,
  size = 'sm',
  className
}) => {
  const qualityConfig = {
    high: {
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: CheckCircle,
      label: 'High Quality'
    },
    medium: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: AlertTriangle,
      label: 'Medium Quality'
    },
    low: {
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: XCircle,
      label: 'Low Quality'
    }
  };

  const config = qualityConfig[quality];
  const Icon = config.icon;

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
    return `${Math.ceil(diffDays / 365)} years ago`;
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge
          variant="outline"
          className={cn(
            config.color,
            size === 'sm' ? 'h-5 text-xs px-2' : 'h-6 text-sm px-3',
            'flex items-center gap-1',
            className
          )}
        >
          <Icon className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
          {config.label}
        </Badge>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <div className="space-y-2">
          <div className="font-semibold text-sm">Data Quality Assessment</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Completeness:</span>
              <span className="font-medium">{completeness}%</span>
            </div>
            {lastUpdated && (
              <div className="flex justify-between">
                <span>Last updated:</span>
                <span className="font-medium">{formatDate(lastUpdated)}</span>
              </div>
            )}
            {source && (
              <div className="flex justify-between">
                <span>Source:</span>
                <span className="font-medium">{source}</span>
              </div>
            )}
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default DataQualityBadge;