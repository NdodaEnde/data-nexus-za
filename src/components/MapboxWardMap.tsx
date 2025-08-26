import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ZoomIn, ZoomOut, RotateCcw, Layers, Info, Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Ward, Indicator } from '@/types';
import { cn } from '@/lib/utils';

interface MapboxWardMapProps {
  selectedIndicator?: Indicator;
  onWardClick?: (ward: Ward) => void;
  colorScale?: 'blue' | 'green' | 'red' | 'purple';
  className?: string;
  height?: string;
}

const MapboxWardMap: React.FC<MapboxWardMapProps> = ({
  selectedIndicator,
  onWardClick,
  colorScale = 'blue',
  className,
  height = '500px'
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [popup, setPopup] = useState<mapboxgl.Popup | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || isConfigured) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [24.7, -28.5], // South Africa center
        zoom: 5,
        pitch: 0,
        bearing: 0
      });

      // Add navigation controls
      mapInstance.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add scale control
      mapInstance.addControl(new mapboxgl.ScaleControl());

      mapInstance.on('load', () => {
        // Add South African administrative boundaries
        mapInstance.addSource('admin-boundaries', {
          type: 'vector',
          url: 'mapbox://mapbox.boundaries-adm-v3'
        });

        // Add province boundaries
        mapInstance.addLayer({
          id: 'provinces',
          type: 'line',
          source: 'admin-boundaries',
          'source-layer': 'boundaries_admin_1',
          filter: ['==', 'iso_3166_1_alpha_3', 'ZAF'],
          paint: {
            'line-color': 'hsl(var(--border))',
            'line-width': 2,
            'line-opacity': 0.8
          }
        });

        // Add municipality boundaries  
        mapInstance.addLayer({
          id: 'municipalities',
          type: 'line',
          source: 'admin-boundaries',
          'source-layer': 'boundaries_admin_2',
          filter: ['==', 'iso_3166_1_alpha_3', 'ZAF'],
          paint: {
            'line-color': 'hsl(var(--border))',
            'line-width': 1,
            'line-opacity': 0.6
          }
        });

        // Add fill layer for municipalities
        mapInstance.addLayer({
          id: 'municipalities-fill',
          type: 'fill',
          source: 'admin-boundaries',
          'source-layer': 'boundaries_admin_2',
          filter: ['==', 'iso_3166_1_alpha_3', 'ZAF'],
          paint: {
            'fill-color': getColorScale(colorScale),
            'fill-opacity': 0.3
          }
        });

        // Add hover effect
        mapInstance.addLayer({
          id: 'municipalities-hover',
          type: 'fill',
          source: 'admin-boundaries',
          'source-layer': 'boundaries_admin_2',
          paint: {
            'fill-color': 'hsl(var(--primary))',
            'fill-opacity': 0.5
          },
          filter: ['==', ['get', 'name'], '']
        });

        // Add click handler for municipalities
        mapInstance.on('click', 'municipalities-fill', (e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            const properties = feature.properties;
            
            // Create mock ward data from municipality
            const ward: Ward = {
              id: properties?.unit_code || 'unknown',
              code: properties?.unit_code || 'N/A',
              name: properties?.name || 'Unknown Ward',
              municipality: properties?.name || 'Unknown Municipality',
              district: properties?.name_1 || 'Unknown District',
              province: properties?.name_1 || 'Unknown Province',
              geometry: feature.geometry as GeoJSON.Polygon,
              population: Math.floor(Math.random() * 50000) + 10000,
              area_km2: Math.floor(Math.random() * 100) + 10,
              classification: Math.random() > 0.5 ? 'urban' : 'rural',
              last_updated: new Date().toISOString().split('T')[0]
            };

            setSelectedWard(ward);
            onWardClick?.(ward);

            // Show popup
            if (popup) {
              popup.remove();
            }

            const newPopup = new mapboxgl.Popup({
              closeButton: true,
              closeOnClick: true
            })
              .setLngLat(e.lngLat)
              .setHTML(`
                <div class="p-2">
                  <h3 class="font-semibold text-sm mb-1">${ward.name}</h3>
                  <p class="text-xs text-gray-600 mb-1">${ward.municipality}</p>
                  <p class="text-xs text-gray-600 mb-2">${ward.province}</p>
                  <div class="flex items-center gap-2 text-xs">
                    <span>Pop: ${ward.population.toLocaleString()}</span>
                    <span class="px-1 py-0.5 bg-gray-100 rounded text-xs">${ward.classification}</span>
                  </div>
                </div>
              `)
              .addTo(mapInstance);

            setPopup(newPopup);
          }
        });

        // Add mouse hover effects
        mapInstance.on('mouseenter', 'municipalities-fill', () => {
          mapInstance.getCanvas().style.cursor = 'pointer';
        });

        mapInstance.on('mouseleave', 'municipalities-fill', () => {
          mapInstance.getCanvas().style.cursor = '';
        });

        setIsLoading(false);
        setIsConfigured(true);
      });

      mapInstance.on('error', (e) => {
        console.error('Mapbox error:', e);
        setIsLoading(false);
      });

      map.current = mapInstance;

      return () => {
        mapInstance.remove();
      };
    } catch (error) {
      console.error('Failed to initialize map:', error);
      setIsLoading(false);
    }
  }, [mapboxToken, colorScale, onWardClick]);

  const getColorScale = (scale: string) => {
    switch (scale) {
      case 'blue': return 'hsl(var(--primary))';
      case 'green': return 'hsl(var(--success))';
      case 'red': return 'hsl(var(--destructive))';
      case 'purple': return 'hsl(var(--accent))';
      default: return 'hsl(var(--primary))';
    }
  };

  const handleConfigureToken = () => {
    if (mapboxToken.trim()) {
      setShowSettings(false);
    }
  };

  const handleZoomIn = () => {
    if (map.current) {
      map.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (map.current) {
      map.current.zoomOut();
    }
  };

  const handleReset = () => {
    if (map.current) {
      map.current.flyTo({
        center: [24.7, -28.5],
        zoom: 5,
        pitch: 0,
        bearing: 0
      });
      setSelectedWard(null);
      if (popup) {
        popup.remove();
        setPopup(null);
      }
    }
  };

  if (!mapboxToken) {
    return (
      <Card className={cn("relative overflow-hidden flex items-center justify-center", className)} style={{ height }}>
        <div className="text-center space-y-4 p-6 max-w-md">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Configure Mapbox</h3>
            <p className="text-sm text-muted-foreground">
              Enter your Mapbox public token to view the interactive South African ward map.
            </p>
            <p className="text-xs text-muted-foreground">
              Get your token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
            </p>
          </div>
          <div className="space-y-3">
            <div>
              <Label htmlFor="mapbox-token" className="text-sm">Mapbox Public Token</Label>
              <Input
                id="mapbox-token"
                type="password"
                placeholder="pk.eyJ1..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button 
              onClick={handleConfigureToken} 
              disabled={!mapboxToken.trim()}
              className="w-full"
            >
              Load Map
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className={cn("relative overflow-hidden", className)} style={{ height }}>
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="text-center space-y-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Loading South African map...</p>
              <p className="text-xs text-muted-foreground">Initializing Mapbox</p>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("relative overflow-hidden", className)} style={{ height }}>
      {/* Map Container */}
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Selected Ward Info */}
      {selectedWard && (
        <div className="absolute top-4 left-4 z-10">
          <Card className="p-3 max-w-xs bg-background/95 backdrop-blur border">
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

          <Sheet open={showSettings} onOpenChange={setShowSettings}>
            <SheetTrigger asChild>
              <Button size="sm" variant="secondary">
                <Settings className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Map Settings</SheetTitle>
                <SheetDescription>
                  Configure your Mapbox token and map preferences.
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="token-update">Mapbox Token</Label>
                  <Input
                    id="token-update"
                    type="password"
                    value={mapboxToken}
                    onChange={(e) => setMapboxToken(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button onClick={() => setShowSettings(false)}>
                  Save Changes
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Legend */}
      {selectedIndicator && (
        <div className="absolute bottom-4 left-4 z-10">
          <Card className="p-3 bg-background/95 backdrop-blur border">
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
            <p>Click on municipalities to view details</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </Card>
  );
};

export default MapboxWardMap;