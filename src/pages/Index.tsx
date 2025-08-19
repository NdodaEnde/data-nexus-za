import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SectorCards from "@/components/SectorCards";
import DataVisualization from "@/components/DataVisualization";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <SectorCards />
        <DataVisualization />
      </main>
    </div>
  );
};

export default Index;
