import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ZoomIn, ZoomOut, RotateCcw, Layers, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Ward, Indicator } from '@/types';
import { cn } from '@/lib/utils';

// Mock data - in production this would come from your data layer
const MOCK_WARDS: Ward[] = [
  {
    id: '1',
    code: 'WC001',
    name: 'Cape Town Central',
    municipality: 'City of Cape Town',
    district: 'City of Cape Town',
    province: 'Western Cape',
    geometry: {} as GeoJSON.Polygon,
    population: 15000,
    area_km2: 12.5,
    classification: 'urban',
    last_updated: '2024-01-15'
  }
];

interface WardMapProps {
  selectedIndicator?: Indicator;
  onWardClick?: (ward: Ward) => void;
  colorScale?: 'blue' | 'green' | 'red' | 'purple';
  className?: string;
  height?: string;
}

const WardMap: React.FC<WardMapProps> = ({
  selectedIndicator,
  onWardClick,
  colorScale = 'blue',
  className,
  height = '500px'
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
  const [showControls, setShowControls] = useState(true);

  // Mock map initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleZoomIn = () => {
    console.log('Zoom in');
  };

  const handleZoomOut = () => {
    console.log('Zoom out');
  };

  const handleReset = () => {
    console.log('Reset view');
    setSelectedWard(null);
  };

  const handleWardClick = (ward: Ward) => {
    setSelectedWard(ward);
    onWardClick?.(ward);
  };

  if (isLoading) {
    return (
      <Card className={cn("relative overflow-hidden", className)} style={{ height }}>
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="text-center space-y-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Loading ward boundaries...</p>
              <p className="text-xs text-muted-foreground">Fetching vector tiles</p>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("relative overflow-hidden", className)} style={{ height }}>
      {/* Map Container */}
      <div
        ref={mapContainer}
        className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {/* Mock South Africa Shape */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <svg
              width="400"
              height="300"
              viewBox="0 0 400 300"
              className="drop-shadow-lg"
            >
              {/* Simplified South Africa outline */}
              <path
                d="M50 150 Q100 50 200 80 Q300 60 350 120 Q380 160 350 200 Q300 250 200 240 Q100 250 50 200 Q20 180 50 150 Z"
                fill="hsl(var(--primary)/0.3)"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                className="cursor-pointer hover:fill-primary/40 transition-colors"
                onClick={() => handleWardClick(MOCK_WARDS[0])}
              />
              
              {/* Mock ward divisions */}
              <g stroke="hsl(var(--border))" strokeWidth="1" fill="none">
                <line x1="120" y1="100" x2="150" y2="180" />
                <line x1="180" y1="90" x2="200" y2="200" />
                <line x1="250" y1="100" x2="280" y2="190" />
                <line x1="100" y1="140" x2="320" y2="160" />
              </g>

              {/* Mock data points */}
              {selectedIndicator && (
                <g>
                  <circle cx="150" cy="130" r="6" fill="hsl(var(--destructive))" opacity="0.8" />
                  <circle cx="200" cy="140" r="8" fill="hsl(var(--warning))" opacity="0.8" />
                  <circle cx="250" cy="150" r="4" fill="hsl(var(--success))" opacity="0.8" />
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Selected Ward Tooltip */}
        {selectedWard && (
          <div className="absolute top-4 left-4 z-10">
            <Card className="p-3 max-w-xs bg-background/95 backdrop-blur">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{selectedWard.name}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {selectedWard.code}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>{selectedWard.municipality}</p>
                  <p>{selectedWard.province}</p>
                  <div className="flex items-center gap-2">
                    <span>Pop: {selectedWard.population.toLocaleString()}</span>
                    <Badge
                      variant={selectedWard.classification === 'urban' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {selectedWard.classification}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Map Controls */}
        {showControls && (
          <div className="absolute top-4 right-4 z-10 space-y-2">
            <div className="flex flex-col gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="secondary" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom In</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="secondary" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom Out</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="secondary" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Reset View</TooltipContent>
              </Tooltip>
            </div>
          </div>
        )}

        {/* Legend */}
        {selectedIndicator && (
          <div className="absolute bottom-4 left-4 z-10">
            <Card className="p-3 bg-background/95 backdrop-blur">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{selectedIndicator.name}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-green-500"></div>
                    <span>High</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-yellow-500"></div>
                    <span>Medium</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-red-500"></div>
                    <span>Low</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Info Button */}
        <div className="absolute bottom-4 right-4 z-10">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" variant="secondary">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click on areas to view ward details</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};

export default WardMap;