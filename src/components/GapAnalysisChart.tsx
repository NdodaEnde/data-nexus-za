import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingDown, AlertTriangle } from 'lucide-react';
import { GapAnalysisData } from '@/data/queryableData';

interface GapAnalysisChartProps {
  data: GapAnalysisData;
}

const GapAnalysisChart: React.FC<GapAnalysisChartProps> = ({ data }) => {
  const currentGap = data.sa_value - data.peer_value;
  const gapDirection = currentGap > 0 ? 'higher' : 'lower';

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">
            {data.indicator}: {data.place} vs {data.peer_country}
          </CardTitle>
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            {Math.abs(currentGap).toFixed(1)}pp gap
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <div className="text-2xl font-bold text-destructive">{data.sa_value}%</div>
            <div className="text-sm text-muted-foreground">{data.place}</div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="text-center">
              <TrendingDown className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <div className="text-sm font-medium">
                {Math.abs(currentGap).toFixed(1)}pp {gapDirection}
              </div>
            </div>
          </div>
          
          <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="text-2xl font-bold text-primary">{data.peer_value}%</div>
            <div className="text-sm text-muted-foreground">{data.peer_country}</div>
          </div>
        </div>

        {/* Historical Trend Chart */}
        <div>
          <h4 className="font-semibold mb-4">Historical Trend Comparison</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.historical_data}>
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
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="sa" 
                stroke="hsl(var(--destructive))"
                strokeWidth={3}
                name={data.place}
                dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="peer" 
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                name={data.peer_country}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gap Analysis Summary */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            Gap Analysis Summary
          </h4>
          <p className="text-sm text-muted-foreground">
            {data.place} currently has a <strong>{data.indicator.toLowerCase()}</strong> rate of <strong>{data.sa_value}%</strong>, 
            which is <strong>{Math.abs(currentGap).toFixed(1)} percentage points {gapDirection}</strong> than {data.peer_country}'s rate of <strong>{data.peer_value}%</strong>. 
            To close this gap, {data.place} would need comprehensive policy interventions targeting the root causes of this disparity.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GapAnalysisChart;