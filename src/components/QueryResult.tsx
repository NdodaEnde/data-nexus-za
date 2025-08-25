import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { KPICard } from '@/components/ChartComponents';
import GapAnalysisChart from '@/components/GapAnalysisChart';
import GapLensChart from '@/components/GapLensChart';
import { AlertTriangle, Lightbulb, Target, TrendingUp } from 'lucide-react';
import { ParsedQuery } from '@/services/queryProcessor';
import { 
  getIndicatorKPI, 
  getGapAnalysisData, 
  getGapLensData, 
  getChartExplanation 
} from '@/data/queryableData';

interface QueryResultProps {
  parsedQuery: ParsedQuery;
  originalQuery: string;
  onNewQuery?: () => void;
}

const QueryResult: React.FC<QueryResultProps> = ({ 
  parsedQuery, 
  originalQuery, 
  onNewQuery 
}) => {
  // Generate result based on template type
  const renderResult = () => {
    switch (parsedQuery.templateId) {
      case 'kpi-card':
        if (!parsedQuery.indicator) return null;
        
        const kpiData = getIndicatorKPI(parsedQuery.indicator);
        if (!kpiData) {
          return (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                No data available for "{parsedQuery.indicator}". Try a different indicator.
              </AlertDescription>
            </Alert>
          );
        }

        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                KPI Card
              </Badge>
              <span className="text-sm text-muted-foreground">
                Current status and trend analysis
              </span>
            </div>
            
            <KPICard
              title={kpiData.indicator}
              value={`${kpiData.current_value}${kpiData.unit}`}
              change={kpiData.change}
              trend={kpiData.trend}
              icon={<TrendingUp className="h-5 w-5" />}
              description={kpiData.description}
            />
            
            {kpiData.target && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="font-medium">Target Analysis</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Current: <strong>{kpiData.current_value}%</strong> | 
                    Target: <strong>{kpiData.target}%</strong> | 
                    Gap: <strong>{Math.abs(kpiData.current_value - kpiData.target).toFixed(1)}pp</strong>
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'gap-analysis':
        if (!parsedQuery.indicator || !parsedQuery.place || !parsedQuery.peerCountry) return null;
        
        const gapData = getGapAnalysisData(
          parsedQuery.indicator, 
          parsedQuery.place, 
          parsedQuery.peerCountry
        );
        
        if (!gapData) {
          return (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                No comparative data available for "{parsedQuery.indicator}" between {parsedQuery.place} and {parsedQuery.peerCountry}.
              </AlertDescription>
            </Alert>
          );
        }

        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Gap Analysis
              </Badge>
              <span className="text-sm text-muted-foreground">
                Comparative performance analysis
              </span>
            </div>
            
            <GapAnalysisChart data={gapData} />
          </div>
        );

      case 'gap-lens':
        if (!parsedQuery.indicator) return null;
        
        const lensData = getGapLensData(parsedQuery.indicator);
        if (!lensData) {
          return (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                No projection data available for "{parsedQuery.indicator}". Gap-Lens analysis requires scenario modeling data.
              </AlertDescription>
            </Alert>
          );
        }

        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                Gap-Lens Projection
              </Badge>
              <span className="text-sm text-muted-foreground">
                Multi-scenario policy impact analysis
              </span>
            </div>
            
            <GapLensChart data={lensData} />
          </div>
        );

      case 'explain-chart':
        const explanation = getChartExplanation('general');
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Lightbulb className="h-3 w-3" />
                Chart Explanation
              </Badge>
              <span className="text-sm text-muted-foreground">
                Plain language interpretation
              </span>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Chart Interpretation</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {explanation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Unknown query template. Please try a different query format.
            </AlertDescription>
          </Alert>
        );
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Query Summary */}
      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
        <div>
          <p className="text-sm text-muted-foreground">Query processed:</p>
          <p className="font-medium">"{originalQuery}"</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {(parsedQuery.confidence * 100).toFixed(0)}% confidence
          </Badge>
          {onNewQuery && (
            <Button variant="outline" size="sm" onClick={onNewQuery}>
              New Query
            </Button>
          )}
        </div>
      </div>

      {/* Query Result */}
      {renderResult()}
    </div>
  );
};

export default QueryResult;