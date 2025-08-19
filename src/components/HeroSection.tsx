import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Map, Users, Activity } from "lucide-react";
import heroImage from "@/assets/data-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="South Africa Data Analytics" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl">
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
              <Activity className="h-4 w-4 mr-2" />
              Live Data Analytics Platform
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            South Africa's
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Data Intelligence
            </span>
            Hub
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            Discover actionable insights from comprehensive data across education, health, 
            labour, and social development. Make informed decisions with real-time analytics 
            and beautiful visualizations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="group">
              Explore Dashboard
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              View Sample Data
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">Data Sets</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mx-auto mb-3">
                <Map className="h-6 w-6 text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground">9</div>
              <div className="text-sm text-muted-foreground">Provinces</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-sa-gold/20 rounded-lg mx-auto mb-3">
                <Users className="h-6 w-6 text-sa-gold" />
              </div>
              <div className="text-2xl font-bold text-foreground">60M+</div>
              <div className="text-sm text-muted-foreground">Population</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-data-tertiary/20 rounded-lg mx-auto mb-3">
                <Activity className="h-6 w-6 text-data-tertiary" />
              </div>
              <div className="text-2xl font-bold text-foreground">Real-time</div>
              <div className="text-sm text-muted-foreground">Updates</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;