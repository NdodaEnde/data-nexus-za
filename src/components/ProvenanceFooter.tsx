import React from 'react';
import { ExternalLink, AlertTriangle, Calendar, Database } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { DataProvenance } from '@/types';
import { cn } from '@/lib/utils';

interface ProvenanceFooterProps {
  provenance: DataProvenance;
  lastUpdated?: string;
  dataQuality?: 'high' | 'medium' | 'low';
  className?: string;
}

const ProvenanceFooter: React.FC<ProvenanceFooterProps> = ({
  provenance,
  lastUpdated,
  dataQuality = 'high',
  className
}) => {
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

        {/* Data Quality Badge */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant="outline"
              className={cn("h-5 text-xs", qualityColors[dataQuality])}
            >
              {qualityLabels[dataQuality]}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Data quality assessment based on completeness, accuracy, and timeliness</p>
          </TooltipContent>
        </Tooltip>
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