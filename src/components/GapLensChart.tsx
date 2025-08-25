import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, TrendingDown, CheckCircle, AlertCircle } from 'lucide-react';
import { GapLensData } from '@/data/queryableData';

interface GapLensChartProps {
  data: GapLensData;
  showConfidenceIntervals?: boolean;
}

const GapLensChart: React.FC<GapLensChartProps> = ({ 
  data, 
  showConfidenceIntervals = true 
}) => {
  const [selectedScenario, setSelectedScenario] = useState<'moderate' | 'aggressive'>('moderate');
  
  const currentValue = data.scenarios[0]?.baseline || 0;
  const targetValue = data.scenarios[data.scenarios.length - 1]?.[selectedScenario] || 0;
  const reduction = currentValue - targetValue;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">
            Gap-Lens Projections: {data.indicator}
          </CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <Target className="h-3 w-3" />
            Multi-scenario Analysis
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Scenario Selector */}
        <Tabs value={selectedScenario} onValueChange={(value) => setSelectedScenario(value as 'moderate' | 'aggressive')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="moderate">Moderate Reform</TabsTrigger>
            <TabsTrigger value="aggressive">Aggressive Reform</TabsTrigger>
          </TabsList>

          {/* Impact Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-muted-foreground">{currentValue}%</div>
              <div className="text-sm text-muted-foreground">Current (2024)</div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-center">
                <TrendingDown className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-sm font-medium text-primary">
                  -{reduction.toFixed(1)}pp reduction
                </div>
              </div>
            </div>
            
            <div className={`text-center p-4 rounded-lg ${
              selectedScenario === 'aggressive' 
                ? 'bg-green-100 border border-green-200' 
                : 'bg-orange-100 border border-orange-200'
            }`}>
              <div className={`text-2xl font-bold ${
                selectedScenario === 'aggressive' ? 'text-green-700' : 'text-orange-700'
              }`}>
                {targetValue}%
              </div>
              <div className="text-sm text-muted-foreground">Target (2030)</div>
            </div>
          </div>

          {/* Enhanced Projection Chart with Confidence Intervals */}
          <div className="mt-6 space-y-4">
            {/* Confidence Interval Legend */}
            {showConfidenceIntervals && (
              <div className="flex items-center justify-center gap-4 p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 text-xs">
                  <AlertCircle className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Shaded bands show 95% confidence intervals representing projection uncertainty
                  </span>
                </div>
              </div>
            )}

            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={data.scenarios}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="year" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  label={{ value: 'Rate (%)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                  formatter={(value, name) => {
                    if (typeof value === 'number') {
                      return [`${value.toFixed(1)}%`, name];
                    }
                    return [value, name];
                  }}
                />
                <Legend />
                
                {showConfidenceIntervals && (
                  <>
                    {/* Baseline Confidence Band */}
                    <Area 
                      type="monotone" 
                      dataKey="baseline_upper" 
                      stackId="baseline"
                      stroke="none" 
                      fill="hsl(var(--muted-foreground) / 0.1)"
                      name="Baseline Upper Bound"
                      dot={false}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="baseline_lower" 
                      stackId="baseline"
                      stroke="none" 
                      fill="hsl(var(--background))"
                      name="Baseline Lower Bound"
                      dot={false}
                    />
                    
                    {/* Moderate Reform Confidence Band */}
                    <Area 
                      type="monotone" 
                      dataKey="moderate_upper" 
                      stackId="moderate"
                      stroke="none" 
                      fill="hsl(var(--primary) / 0.15)"
                      name="Moderate Upper Bound"
                      dot={false}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="moderate_lower" 
                      stackId="moderate"
                      stroke="none" 
                      fill="hsl(var(--background))"
                      name="Moderate Lower Bound"
                      dot={false}
                    />
                    
                    {/* Aggressive Reform Confidence Band */}
                    <Area 
                      type="monotone" 
                      dataKey="aggressive_upper" 
                      stackId="aggressive"
                      stroke="none" 
                      fill="hsl(var(--chart-2) / 0.15)"
                      name="Aggressive Upper Bound"
                      dot={false}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="aggressive_lower" 
                      stackId="aggressive"
                      stroke="none" 
                      fill="hsl(var(--background))"
                      name="Aggressive Lower Bound"
                      dot={false}
                    />
                  </>
                )}
                
                {/* Main Projection Lines */}
                <Area 
                  type="monotone" 
                  dataKey="baseline" 
                  stroke="hsl(var(--muted-foreground))" 
                  fill="none"
                  strokeWidth={2}
                  name="Baseline (Status Quo)"
                  dot={{ fill: 'hsl(var(--muted-foreground))', strokeWidth: 0, r: 3 }}
                />
                
                <Area 
                  type="monotone" 
                  dataKey="moderate" 
                  stroke="hsl(var(--primary))" 
                  fill="none"
                  strokeWidth={3}
                  name="Moderate Reform"
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 0, r: 4 }}
                />
                
                <Area 
                  type="monotone" 
                  dataKey="aggressive" 
                  stroke="hsl(var(--chart-2))" 
                  fill="none"
                  strokeWidth={3}
                  name="Aggressive Reform" 
                  dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 0, r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Intervention Details */}
          <TabsContent value="moderate" className="mt-6">
            <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
              <h4 className="font-semibold mb-4 flex items-center gap-2 text-primary">
                <Target className="h-4 w-4" />
                Moderate Reform Interventions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.interventions.moderate.map((intervention, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{intervention}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="aggressive" className="mt-6">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-4 flex items-center gap-2 text-green-700">
                <Target className="h-4 w-4" />
                Aggressive Reform Interventions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.interventions.aggressive.map((intervention, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{intervention}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Impact Statement */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Projection Impact</h4>
          <p className="text-sm text-muted-foreground">
            With <strong>{selectedScenario} reform</strong> interventions, {data.indicator.toLowerCase()} could be reduced from <strong>{currentValue}%</strong> to <strong>{targetValue}%</strong> by 2030, 
            representing a <strong>{reduction.toFixed(1)} percentage point improvement</strong>. 
            This scenario assumes sustained political commitment and adequate resource allocation across all intervention areas.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GapLensChart;