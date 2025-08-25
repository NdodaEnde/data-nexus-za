import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3 text-sm">
        <p className="text-foreground font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="font-medium">
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
            {entry.name.includes('Rate') || entry.name.includes('Literacy') || entry.name.includes('Enrollment') ? '%' : ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Education Line Chart Component
interface EducationChartProps {
  data: Array<{ year: number; enrollment: number; literacy: number }>;
}

export const EducationChart: React.FC<EducationChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
      <XAxis 
        dataKey="year" 
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
      />
      <YAxis 
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Line 
        type="monotone" 
        dataKey="enrollment" 
        stroke="hsl(var(--data-primary))"
        strokeWidth={3}
        name="Enrollment Rate"
        dot={{ fill: "hsl(var(--data-primary))", strokeWidth: 2, r: 4 }}
      />
      <Line 
        type="monotone" 
        dataKey="literacy" 
        stroke="hsl(var(--data-secondary))"
        strokeWidth={3}
        name="Literacy Rate" 
        dot={{ fill: "hsl(var(--data-secondary))", strokeWidth: 2, r: 4 }}
      />
    </LineChart>
  </ResponsiveContainer>
);

// Unemployment Bar Chart Component
interface UnemploymentChartProps {
  data: Array<{ province: string; rate: number; color: string }>;
}

export const UnemploymentChart: React.FC<UnemploymentChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
      <XAxis 
        dataKey="province" 
        stroke="hsl(var(--muted-foreground))"
        fontSize={11}
        angle={-45}
        textAnchor="end"
        height={80}
      />
      <YAxis 
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
      />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="rate" name="Unemployment Rate" radius={[4, 4, 0, 0]}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

// Population Growth Area Chart Component
interface PopulationChartProps {
  data: Array<{ year: number; population: number }>;
}

export const PopulationChart: React.FC<PopulationChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
      <XAxis 
        dataKey="year" 
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
      />
      <YAxis 
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
      />
      <Tooltip content={<CustomTooltip />} />
      <Area 
        type="monotone" 
        dataKey="population" 
        stroke="hsl(var(--data-tertiary))"
        fill="hsl(var(--data-tertiary) / 0.3)"
        strokeWidth={3}
        name="Population (Millions)"
      />
    </AreaChart>
  </ResponsiveContainer>
);

// Healthcare Pie Chart Component
interface HealthcareChartProps {
  data: Array<{ category: string; value: number; color: string }>;
}

export const HealthcareChart: React.FC<HealthcareChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={120}
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

// KPI Card Component
interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  description?: string;
}

export const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  change, 
  trend = 'neutral', 
  icon, 
  description 
}) => {
  const trendColor = {
    up: 'text-data-success',
    down: 'text-data-error',
    neutral: 'text-muted-foreground'
  }[trend];

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      
      <div className="space-y-2">
        <div className="text-3xl font-bold text-foreground">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        
        {change && (
          <div className={`text-sm font-medium ${trendColor}`}>
            {change}
          </div>
        )}
        
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
};