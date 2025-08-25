import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock } from 'lucide-react';
import DataQualityBadge from '@/components/DataQualityBadge';
import ProvenanceFooter from '@/components/ProvenanceFooter';
import { DataProvenance } from '@/types';
import { cn } from '@/lib/utils';

export interface ChartDataQuality {
  freshness: 'current' | 'recent' | 'stale';
  completeness: number; // 0-100
  confidence: 'high' | 'medium' | 'low';
  lastUpdated: Date;
  source: string;
}

interface ChartWithQualityProps {
  children: React.ReactNode;
  quality: ChartDataQuality;
  provenance: DataProvenance;
  className?: string;
  showFreshnessWarning?: boolean;
}

const ChartWithQuality: React.FC<ChartWithQualityProps> = ({
  children,
  quality,
  provenance,
  className,
  showFreshnessWarning = true
}) => {
  const getDaysSince = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysSinceUpdate = getDaysSince(quality.lastUpdated);
  const isStale = quality.freshness === 'stale';
  const isLowQuality = quality.confidence === 'low';

  return (
    <div className={cn('relative', className)}>
      {/* Quality indicators in top-right corner */}
      <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
        {/* Freshness warning for stale data */}
        {isStale && showFreshnessWarning && (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            {daysSinceUpdate} days old
          </Badge>
        )}
        
        {/* Data quality badge */}
        <DataQualityBadge
          quality={quality.confidence}
          completeness={quality.completeness}
          lastUpdated={quality.lastUpdated}
          source={quality.source}
          size="sm"
        />
      </div>

      {/* Low quality data warning */}
      {isLowQuality && (
        <Alert className="mb-4 border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Data Quality Notice:</strong> This data has been flagged as low quality 
            ({quality.completeness}% complete). Interpret results with caution.
          </AlertDescription>
        </Alert>
      )}

      {/* Main chart content */}
      <div className="space-y-4">
        {children}
      </div>

      {/* Enhanced provenance footer with quality information */}
      <ProvenanceFooter
        provenance={provenance}
        lastUpdated={quality.lastUpdated.toISOString()}
        dataQuality={quality.confidence}
        className="mt-4"
      />
    </div>
  );
};

export default ChartWithQuality;