import React from 'react';
import { ExternalLink, AlertTriangle, Calendar, Database, CheckCircle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { DataProvenance } from '@/types';
import { cn } from '@/lib/utils';

interface DataQuality {
  freshness: 'current' | 'recent' | 'stale';
  completeness: number; // 0-100
  confidence: 'high' | 'medium' | 'low';
}

interface ProvenanceFooterProps {
  provenance: DataProvenance;
  lastUpdated?: string;
  dataQuality?: 'high' | 'medium' | 'low' | DataQuality;
  className?: string;
}

const ProvenanceFooter: React.FC<ProvenanceFooterProps> = ({
  provenance,
  lastUpdated,
  dataQuality = 'high',
  className
}) => {
  // Handle both old string format and new detailed format
  const isDetailedQuality = typeof dataQuality === 'object';
  const quality = isDetailedQuality ? (dataQuality as DataQuality) : { confidence: dataQuality as 'high' | 'medium' | 'low' };

  const qualityColors = {
    high: 'text-green-600',
    medium: 'text-yellow-600', 
    low: 'text-red-600'
  };

  const qualityLabels = {
    high: 'High Quality',
    medium: 'Medium Quality',
    low: 'Low Quality'
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

  const getCompletenessColor = (completeness: number) => {
    if (completeness >= 90) return 'text-green-600';
    if (completeness >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={cn(
      "flex flex-wrap items-center justify-between gap-2 p-3 mt-4 text-xs border-t border-border/30 bg-muted/20",
      className
    )}>
      <div className="flex flex-wrap items-center gap-3">
        {/* Source Information */}
        <div className="flex items-center gap-1">
          <Database className="h-3 w-3 text-muted-foreground" />
          <span className="text-muted-foreground">Source:</span>
          <span className="font-medium text-foreground">
            {provenance.source_organization}
          </span>
        </div>

        {/* Dataset Name */}
        {provenance.dataset_name && (
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Dataset:</span>
            <span className="font-medium text-foreground">
              {provenance.dataset_name}
            </span>
          </div>
        )}

        {/* Last Updated */}
        {lastUpdated && (
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Updated:</span>
            <span className="font-medium text-foreground">
              {formatDate(lastUpdated)}
            </span>
          </div>
        )}

        {/* Enhanced Data Quality Indicators */}
        {isDetailedQuality && (dataQuality as DataQuality) ? (
          <div className="flex items-center gap-2">
            {/* Freshness */}
            {(dataQuality as DataQuality).freshness && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="outline"
                    className={cn("h-5 text-xs flex items-center gap-1", getFreshnessColor((dataQuality as DataQuality).freshness))}
                  >
                    {(dataQuality as DataQuality).freshness === 'current' && <CheckCircle className="h-2 w-2" />}
                    {(dataQuality as DataQuality).freshness === 'recent' && <Calendar className="h-2 w-2" />}
                    {(dataQuality as DataQuality).freshness === 'stale' && <AlertTriangle className="h-2 w-2" />}
                    {(dataQuality as DataQuality).freshness}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Data freshness: {(dataQuality as DataQuality).freshness}</p>
                </TooltipContent>
              </Tooltip>
            )}

            {/* Completeness */}
            {(dataQuality as DataQuality).completeness !== undefined && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="outline"
                    className={cn("h-5 text-xs flex items-center gap-1", getCompletenessColor((dataQuality as DataQuality).completeness))}
                  >
                    <CheckCircle className="h-2 w-2" />
                    {(dataQuality as DataQuality).completeness}%
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p>Data completeness: {(dataQuality as DataQuality).completeness}%</p>
                    <Progress value={(dataQuality as DataQuality).completeness} className="h-1 w-16" />
                  </div>
                </TooltipContent>
              </Tooltip>
            )}

            {/* Confidence */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant="outline"
                  className={cn("h-5 text-xs flex items-center gap-1", qualityColors[quality.confidence])}
                >
                  <Info className="h-2 w-2" />
                  {qualityLabels[quality.confidence]}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Statistical confidence: {quality.confidence}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        ) : (
          /* Legacy Data Quality Badge */
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant="outline"
                className={cn("h-5 text-xs", qualityColors[quality.confidence])}
              >
                {qualityLabels[quality.confidence]}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Data quality assessment based on completeness, accuracy, and timeliness</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Methodology Link */}
        {provenance.methodology_url && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => window.open(provenance.methodology_url, '_blank')}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Methodology
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View data collection methodology</p>
            </TooltipContent>
          </Tooltip>
        )}

        {/* License Information */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="secondary" className="h-5 text-xs">
              {provenance.license}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <div className="max-w-xs">
              <p className="font-semibold mb-1">Citation:</p>
              <p className="text-xs">{provenance.citation}</p>
            </div>
          </TooltipContent>
        </Tooltip>

        {/* Warning for Unknown Provenance */}
        {!provenance.source_organization && (
          <div className="flex items-center gap-1 text-red-600">
            <AlertTriangle className="h-3 w-3" />
            <span className="text-xs font-medium">Provenance unknown</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProvenanceFooter;