import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Heart, 
  Briefcase, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SectorData {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  stats: {
    current: string;
    change: string;
    trend: 'up' | 'down';
    period: string;
  };
  color: string;
  bgColor: string;
  route: string;
}

const sectors: SectorData[] = [
  {
    title: "Education",
    description: "Track literacy rates, enrollment statistics, and educational outcomes across all provinces",
    icon: GraduationCap,
    stats: {
      current: "84.2%",
      change: "+2.1%",
      trend: "up",
      period: "vs 2022"
    },
    color: "text-data-primary",
    bgColor: "bg-data-primary/10",
    route: "/education"
  },
  {
    title: "Healthcare",
    description: "Monitor health indicators, facility access, and population health metrics",
    icon: Heart,
    stats: {
      current: "73.1%",
      change: "+1.8%",
      trend: "up",
      period: "coverage rate"
    },
    color: "text-data-error",
    bgColor: "bg-data-error/10",
    route: "/healthcare"
  },
  {
    title: "Labour Market",
    description: "Analyze employment rates, job creation, and workforce development trends",
    icon: Briefcase,
    stats: {
      current: "32.9%",
      change: "-0.7%",
      trend: "down",
      period: "unemployment"
    },
    color: "text-data-secondary",
    bgColor: "bg-data-secondary/10",
    route: "/labour"
  },
  {
    title: "Demographics",
    description: "Explore population dynamics, migration patterns, and demographic transitions",
    icon: Users,
    stats: {
      current: "60.4M",
      change: "+1.2%",
      trend: "up",
      period: "population"
    },
    color: "text-data-tertiary",
    bgColor: "bg-data-tertiary/10",
    route: "/demographics"
  }
];

const SectorCards = () => {
  const navigate = useNavigate();

  const handleSectorClick = (route: string) => {
    if (route === "/labour") {
      navigate("/labour");
    } else {
      // For other routes, we'll just show a toast for now
      console.log(`Navigating to ${route} - Coming soon!`);
    }
  };

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Explore Key Sectors
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Dive deep into South Africa's critical development areas with comprehensive data and analytics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sectors.map((sector) => {
          const IconComponent = sector.icon;
          const TrendIcon = sector.stats.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card 
              key={sector.title} 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/30"
              onClick={() => handleSectorClick(sector.route)}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${sector.bgColor}`}>
                    <IconComponent className={`h-8 w-8 ${sector.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Updated daily
                  </Badge>
                </div>
                
                <div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                    {sector.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {sector.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {sector.stats.current}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {sector.stats.period}
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 ${
                    sector.stats.trend === 'up' ? 'text-data-success' : 'text-data-warning'
                  }`}>
                    <TrendIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {sector.stats.change}
                    </span>
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                >
                  View Analytics
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default SectorCards;