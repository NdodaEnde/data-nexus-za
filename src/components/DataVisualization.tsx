import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Users, GraduationCap, Heart } from "lucide-react";
import saMapImage from "@/assets/sa-map-data.jpg";

// Sample data
const educationData = [
  { year: '2019', enrollment: 88.5, literacy: 87.0 },
  { year: '2020', enrollment: 89.2, literacy: 87.5 },
  { year: '2021', enrollment: 89.8, literacy: 88.1 },
  { year: '2022', enrollment: 90.1, literacy: 88.7 },
  { year: '2023', enrollment: 90.4, literacy: 89.2 }
];

const unemploymentData = [
  { province: 'WC', rate: 22.8, color: '#3b82f6' },
  { province: 'GP', rate: 28.9, color: '#10b981' },
  { province: 'KZN', rate: 42.1, color: '#f59e0b' },
  { province: 'EC', rate: 45.2, color: '#ef4444' },
  { province: 'FS', rate: 36.8, color: '#8b5cf6' },
  { province: 'NC', rate: 32.4, color: '#06b6d4' },
  { province: 'NW', rate: 38.6, color: '#84cc16' },
  { province: 'LP', rate: 41.5, color: '#f97316' },
  { province: 'MP', rate: 33.7, color: '#ec4899' }
];

const healthData = [
  { name: 'Vaccinated', value: 67.5, color: '#10b981' },
  { name: 'Partially Vaccinated', value: 12.3, color: '#f59e0b' },
  { name: 'Unvaccinated', value: 20.2, color: '#ef4444' }
];

const populationGrowth = [
  { year: '2018', population: 57.7 },
  { year: '2019', population: 58.4 },
  { year: '2020', population: 59.3 },
  { year: '2021', population: 60.4 },
  { year: '2022', population: 60.4 },
  { year: '2023', population: 60.4 }
];

const DataVisualization = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Live Data Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time visualizations powered by the latest government datasets and statistics
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Population</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold text-foreground">60.4M</span>
                <span className="text-sm text-accent ml-2">+0.8%</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-sa-green" />
                <span className="text-sm font-medium text-muted-foreground">Unemployment</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold text-foreground">32.9%</span>
                <span className="text-sm text-sa-red ml-2">+1.2%</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-5 w-5 text-sa-gold" />
                <span className="text-sm font-medium text-muted-foreground">Literacy Rate</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold text-foreground">89.2%</span>
                <span className="text-sm text-accent ml-2">+0.5%</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-sa-red" />
                <span className="text-sm font-medium text-muted-foreground">Healthcare Access</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold text-foreground">84.6%</span>
                <span className="text-sm text-accent ml-2">+2.1%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Education Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={educationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
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
                    dataKey="enrollment" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="School Enrollment (%)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="literacy" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    name="Literacy Rate (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Unemployment by Province */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Unemployment by Province</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={unemploymentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="province" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Population Growth */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Population Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={populationGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="population" 
                    stroke="hsl(var(--accent))" 
                    fill="hsl(var(--accent) / 0.2)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Health Coverage */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Healthcare Coverage</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={healthData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {healthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* South Africa Map */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Geographic Data Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-96 bg-muted/20 rounded-lg overflow-hidden">
              <img 
                src={saMapImage} 
                alt="South Africa Data Map" 
                className="w-full h-full object-contain opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-background/90 backdrop-blur-sm border border-border rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Maps Coming Soon</h3>
                  <p className="text-muted-foreground">Explore data across all 9 provinces with heat maps, choropleth visualizations, and regional comparisons</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DataVisualization;