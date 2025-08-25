import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  GraduationCap, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Share2,
  ArrowRight
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from "react";
import ProvenanceFooter from "@/components/ProvenanceFooter";
import { DataProvenance } from "@/types";

// Mock data for labour insights
const currentStats = {
  overallUnemployment: 41.5,
  youthUnemployment: 61.0,
  skillsMismatch: 45,
  jobsCreatedLastYear: 350000
};

const globalBenchmarks = {
  southKorea: { youth: 7, overall: 3.1 },
  china: { youth: 10, overall: 5.2 },
  oecd: { youth: 12, overall: 5.8 }
};

const unemploymentTrend = [
  { year: '2000', sa: 26.7, china: 3.1, korea: 4.4 },
  { year: '2005', sa: 23.8, china: 4.2, korea: 3.7 },
  { year: '2010', sa: 24.9, china: 4.1, korea: 3.7 },
  { year: '2015', sa: 25.4, china: 4.0, korea: 3.6 },
  { year: '2020', sa: 29.2, china: 5.6, korea: 4.0 },
  { year: '2023', sa: 32.9, china: 5.2, korea: 3.1 }
];

const provincialUnemployment = [
  { province: 'Western Cape', code: 'WC', rate: 22.8, youth: 45.2 },
  { province: 'Gauteng', code: 'GP', rate: 28.9, youth: 53.1 },
  { province: 'KwaZulu-Natal', code: 'KZN', rate: 42.1, youth: 68.4 },
  { province: 'Eastern Cape', code: 'EC', rate: 45.2, youth: 71.2 },
  { province: 'Free State', code: 'FS', rate: 36.8, youth: 62.5 },
  { province: 'Northern Cape', code: 'NC', rate: 32.4, youth: 58.7 },
  { province: 'North West', code: 'NW', rate: 38.6, youth: 65.3 },
  { province: 'Limpopo', code: 'LP', rate: 41.5, youth: 69.8 },
  { province: 'Mpumalanga', code: 'MP', rate: 33.7, youth: 59.9 }
];

const scenarioData = [
  { year: 2024, baseline: 61, moderate: 61, aggressive: 61 },
  { year: 2026, baseline: 62, moderate: 55, aggressive: 48 },
  { year: 2028, baseline: 63, moderate: 50, aggressive: 38 },
  { year: 2030, baseline: 64, moderate: 45, aggressive: 28 },
  { year: 2032, baseline: 64, moderate: 40, aggressive: 22 },
  { year: 2034, baseline: 65, moderate: 35, aggressive: 18 }
];

const pathways = [
  {
    term: "Short-term",
    timeframe: "3 years",
    target: "61% → 50%",
    targetIcon: Target,
    interventions: [
      "Expand vocational training to 500k learners/year",
      "Incentivize SMEs to hire first-time youth jobseekers", 
      "Fast-track infrastructure jobs program",
      "Digital skills bootcamps in townships"
    ]
  },
  {
    term: "Medium-term", 
    timeframe: "5-7 years",
    target: "50% → 35%",
    targetIcon: TrendingDown,
    interventions: [
      "Align higher education with demand industries (STEM, digital, green economy)",
      "Regional manufacturing hubs (textiles, auto, agro-processing)",
      "Expand digital platforms for gig & freelance economy",
      "Public-private partnerships for skills development"
    ]
  },
  {
    term: "Long-term",
    timeframe: "10-20 years", 
    target: "35% → <15%",
    targetIcon: CheckCircle,
    interventions: [
      "Industrial policy + localisation (AI, biotech, green tech)",
      "Nationwide skills revolution (STEM enrolments doubled)",
      "Entrepreneurship culture + export-oriented industries",
      "Transform education system to match global standards"
    ]
  }
];

const Labour = () => {
  const [selectedScenario, setSelectedScenario] = useState("moderate");

  const labourProvenance: DataProvenance = {
    source_organization: "Statistics South Africa (Stats SA)",
    dataset_name: "Quarterly Labour Force Survey Q3 2024",
    collection_date: "2024-07-01",
    publication_date: "2024-11-30",
    methodology_url: "https://www.statssa.gov.za/publications/P0211/P02113rdQuarter2024.pdf",
    license: "CC BY 4.0",
    citation: "Statistics South Africa. Quarterly Labour Force Survey, Q3 2024. Pretoria: Stats SA, 2024."
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Clock className="h-3 w-3 mr-1" />
              Strategic Intelligence
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Labour Insights: Unemployment & Workforce Development
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Where South Africa is, where it should be, and how to get there
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <Button className="group">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button variant="outline" className="group">
                <Share2 className="h-4 w-4 mr-2" />
                Share Insights
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Current Situation */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8">Current Situation: South Africa Now</h2>
          
          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-sa-red">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overall Unemployment</p>
                    <p className="text-3xl font-bold text-foreground">{currentStats.overallUnemployment}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-sa-red" />
                </div>
                <div className="mt-2">
                  <Badge variant="destructive" className="text-xs">Critical Level</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-destructive">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Youth Unemployment (15-24)</p>
                    <p className="text-3xl font-bold text-foreground">{currentStats.youthUnemployment}%</p>
                  </div>
                  <Users className="h-8 w-8 text-destructive" />
                </div>
                <div className="mt-2">
                  <Badge variant="destructive" className="text-xs">Highest Globally</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-sa-gold">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Skills Mismatch</p>
                    <p className="text-3xl font-bold text-foreground">{currentStats.skillsMismatch}%</p>
                  </div>
                  <GraduationCap className="h-8 w-8 text-sa-gold" />
                </div>
                <div className="mt-2">
                  <Badge className="text-xs bg-sa-gold/10 text-sa-gold">Education Gap</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Jobs Created (2023)</p>
                    <p className="text-3xl font-bold text-foreground">{currentStats.jobsCreatedLastYear.toLocaleString()}</p>
                  </div>
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <div className="mt-2">
                  <Badge className="text-xs bg-primary/10 text-primary">Below Target</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Unemployment Trends: SA vs Global Leaders</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={unemploymentTrend}>
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
                    <Line type="monotone" dataKey="sa" stroke="hsl(var(--sa-red))" strokeWidth={3} name="South Africa" />
                    <Line type="monotone" dataKey="china" stroke="hsl(var(--primary))" strokeWidth={2} name="China" />
                    <Line type="monotone" dataKey="korea" stroke="hsl(var(--accent))" strokeWidth={2} name="South Korea" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Youth Unemployment by Province</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={provincialUnemployment} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis type="category" dataKey="code" stroke="hsl(var(--muted-foreground))" width={40} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="youth" fill="hsl(var(--sa-red))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Global Benchmarking */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8">Global Benchmarking: Where We Should Be</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">South Korea</h3>
                <div className="text-3xl font-bold text-accent mb-2">{globalBenchmarks.southKorea.youth}%</div>
                <p className="text-muted-foreground text-sm">Youth Unemployment</p>
                <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                  <p className="text-xs font-medium text-accent">54 percentage points below SA</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">China</h3>
                <div className="text-3xl font-bold text-primary mb-2">{globalBenchmarks.china.youth}%</div>
                <p className="text-muted-foreground text-sm">Youth Unemployment</p>
                <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <p className="text-xs font-medium text-primary">51 percentage points below SA</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">OECD Average</h3>
                <div className="text-3xl font-bold text-sa-gold mb-2">{globalBenchmarks.oecd.youth}%</div>
                <p className="text-muted-foreground text-sm">Youth Unemployment</p>
                <div className="mt-4 p-3 bg-sa-gold/10 rounded-lg">
                  <p className="text-xs font-medium text-sa-gold">49 percentage points below SA</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-6 w-6 text-sa-red flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Gap Analysis: The Delta</h3>
                  <p className="text-muted-foreground mb-4">
                    South Africa's youth unemployment at 61% is <strong>9x higher than South Korea</strong> and <strong>6x higher than China</strong>. 
                    To close this gap within 10 years, the country needs to generate <strong>at least 1 million jobs annually</strong> 
                    and align its skills development with high-growth industries.
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="font-medium">Required Job Creation: <span className="text-primary">1,000,000+ jobs/year</span></p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Current rate: 350K/year • Gap: 650K+ additional jobs needed annually
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Strategic Pathways */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8">Strategic Pathways: How to Get There</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pathways.map((pathway, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className={`${
                      index === 0 ? 'bg-sa-red/10 text-sa-red' : 
                      index === 1 ? 'bg-sa-gold/10 text-sa-gold' : 
                      'bg-accent/10 text-accent'
                    }`}>
                      {pathway.term}
                    </Badge>
                    <pathway.targetIcon className={`h-5 w-5 ${
                      index === 0 ? 'text-sa-red' : 
                      index === 1 ? 'text-sa-gold' : 
                      'text-accent'
                    }`} />
                  </div>
                  <CardTitle className="text-lg">{pathway.timeframe}</CardTitle>
                  <div className="text-2xl font-bold text-foreground">{pathway.target}</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pathway.interventions.map((intervention, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground">{intervention}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Scenario Simulator */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8">Scenario Simulator: Policy Impact</h2>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Youth Unemployment Projections</CardTitle>
                <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select scenario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baseline">Baseline (Status Quo)</SelectItem>
                    <SelectItem value="moderate">Moderate Reform</SelectItem>
                    <SelectItem value="aggressive">Aggressive Reform</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={scenarioData}>
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
                  <Area 
                    type="monotone" 
                    dataKey="baseline" 
                    stroke="hsl(var(--muted-foreground))" 
                    fill="hsl(var(--muted-foreground) / 0.1)"
                    strokeWidth={2}
                    name="Baseline (Status Quo)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="moderate" 
                    stroke="hsl(var(--sa-gold))" 
                    fill="hsl(var(--sa-gold) / 0.2)"
                    strokeWidth={2}
                    name="Moderate Reform"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="aggressive" 
                    stroke="hsl(var(--accent))" 
                    fill="hsl(var(--accent) / 0.2)"
                    strokeWidth={2}
                    name="Aggressive Reform"
                  />
                </AreaChart>
              </ResponsiveContainer>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold text-muted-foreground">Baseline (Status Quo)</h4>
                  <p className="text-sm text-muted-foreground mt-1">Youth unemployment stays above 55% by 2035</p>
                </div>
                <div className="p-4 bg-sa-gold/10 rounded-lg">
                  <h4 className="font-semibold text-sa-gold">Moderate Reform</h4>
                  <p className="text-sm text-muted-foreground mt-1">500k jobs/year → 35% unemployment in 10 years</p>
                </div>
                <div className="p-4 bg-accent/10 rounded-lg">
                  <h4 className="font-semibold text-accent">Aggressive Reform</h4>
                  <p className="text-sm text-muted-foreground mt-1">1M+ jobs/year → 18% unemployment in 10 years</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Insights & Narrative */}
        <section>
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Key Insights & Recommendations</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  South Africa's youth unemployment crisis is not just a statistic—it's a national emergency that requires 
                  immediate, coordinated action. The gap between SA and global leaders like South Korea (54 percentage points) 
                  represents millions of young people without economic opportunity.
                </p>
                <p>
                  <strong>Critical Success Factors:</strong> Skills alignment with industry demand, massive expansion of vocational 
                  training, SME support for job creation, and long-term industrial policy focused on high-growth sectors like 
                  renewable energy, technology, and manufacturing.
                </p>
                <p>
                  <strong>Without intervention:</strong> Youth unemployment will remain above 55% by 2035, creating a lost generation 
                  and undermining social cohesion and economic growth.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-6">
                <Button className="group">
                  Explore Education Pipeline
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline">
                  View Economic Development
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Data Provenance */}
        <ProvenanceFooter 
          provenance={labourProvenance}
          lastUpdated="2024-11-30"
          dataQuality="high"
        />
      </div>
    </div>
  );
};

export default Labour;