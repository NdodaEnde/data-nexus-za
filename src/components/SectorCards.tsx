import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Heart, 
  Briefcase, 
  Users, 
  Home, 
  TrendingUp,
  ArrowRight 
} from "lucide-react";

const sectors = [
  {
    title: "Education",
    description: "School enrollment, literacy rates, educational outcomes across all provinces",
    icon: GraduationCap,
    stats: "12.8M Students",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "Health",
    description: "Healthcare access, disease statistics, health outcomes and facility data",
    icon: Heart,
    stats: "4,200 Facilities",
    color: "text-sa-red",
    bgColor: "bg-sa-red/10"
  },
  {
    title: "Labour",
    description: "Employment rates, job market trends, skills development initiatives",
    icon: Briefcase,
    stats: "16.2M Employed",
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    title: "Social Development",
    description: "Social grants, poverty indicators, community development programs",
    icon: Users,
    stats: "18M Beneficiaries",
    color: "text-sa-gold",
    bgColor: "bg-sa-gold/20"
  },
  {
    title: "Housing",
    description: "Housing delivery, informal settlements, property market analytics",
    icon: Home,
    stats: "17.1M Households",
    color: "text-data-quaternary",
    bgColor: "bg-data-quaternary/10"
  },
  {
    title: "Economic Development",
    description: "GDP growth, inflation rates, business registrations and economic indicators",
    icon: TrendingUp,
    stats: "R6.4T GDP",
    color: "text-data-primary",
    bgColor: "bg-data-primary/10"
  }
];

const SectorCards = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Data by Sector
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive deep into comprehensive datasets across key sectors of South African society. 
            Each sector provides both high-level insights and granular analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((sector, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-border">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 ${sector.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  <sector.icon className={`h-6 w-6 ${sector.color}`} />
                </div>
                <CardTitle className="text-xl mb-2">{sector.title}</CardTitle>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {sector.description}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-foreground">
                    {sector.stats}
                  </span>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  View Analytics
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectorCards;