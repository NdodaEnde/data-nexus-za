import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SectorCards from "@/components/SectorCards";
import DataVisualization from "@/components/DataVisualization";
import AskDataBar from "@/components/AskDataBar";
import WardMap from "@/components/WardMap";
import ProvenanceFooter from "@/components/ProvenanceFooter";
import QueryResult from "@/components/QueryResult";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, MapPin, Database } from "lucide-react";
import { useQueryProcessor } from "@/hooks/useQueryProcessor";

const Index = () => {
  const { toast } = useToast();
  const { 
    processQuery, 
    clearQuery, 
    getSuggestedQueries,
    isProcessing, 
    result, 
    error, 
    originalQuery,
    hasResult 
  } = useQueryProcessor();

  // Sample provenance data for the platform
  const platformProvenance = {
    source_organization: "Statistics South Africa & Municipal IDP",
    dataset_name: "Ward-level Socioeconomic Indicators 2023",
    last_updated: "2024-01-15",
    collection_date: "2023-12-01",
    publication_date: "2024-01-15",
    methodology_url: "https://statssa.gov.za/methodology/ward-data",
    license: "CC BY 4.0",
    citation: "Statistics South Africa. (2024). Ward-level Socioeconomic Indicators. Pretoria: Stats SA."
  };

  const handleQuery = async (query: string) => {
    await processQuery(query);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Enhanced Hero with Ask Data Bar */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge className="mx-auto">
                <Database className="h-3 w-3 mr-1" />
                Evidence-Based Insights Platform
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                South African Data
                <span className="text-primary block">Made Accessible</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore ward-level data, compare with peer countries, and discover evidence-based policy solutions
              </p>
            </div>
            
            {/* Ask Data Bar */}
            <div className="max-w-4xl mx-auto">
              <AskDataBar onQuery={handleQuery} isProcessing={isProcessing} />
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center">
                  <Database className="h-6 w-6 text-primary mr-2" />
                  <span className="text-2xl font-bold">4,392</span>
                </div>
                <p className="text-sm text-muted-foreground">Ward-level datasets</p>
              </div>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary mr-2" />
                  <span className="text-2xl font-bold">9</span>
                </div>
                <p className="text-sm text-muted-foreground">Provinces covered</p>
              </div>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary mr-2" />
                  <span className="text-2xl font-bold">60M+</span>
                </div>
                <p className="text-sm text-muted-foreground">Population data points</p>
              </div>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary mr-2" />
                  <span className="text-2xl font-bold">Daily</span>
                </div>
                <p className="text-sm text-muted-foreground">Data updates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 space-y-12">
        {/* Query Results Section */}
        {hasResult && result && (
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Query Results</h2>
              <p className="text-muted-foreground">
                AI-powered analysis based on your natural language query
              </p>
            </div>
            <QueryResult 
              parsedQuery={result} 
              originalQuery={originalQuery}
              onNewQuery={clearQuery}
            />
          </section>
        )}

        {/* Error Display */}
        {error && (
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Query Suggestions</h2>
              <p className="text-muted-foreground">
                Try one of these supported query formats
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="text-sm text-destructive whitespace-pre-line">{error}</div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Suggested queries:</h4>
                    {getSuggestedQueries().map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => processQuery(suggestion)}
                        className="block w-full text-left p-3 text-sm bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors"
                      >
                        "{suggestion}"
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Ward Map Preview */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Interactive Ward Explorer</h2>
            <p className="text-muted-foreground">
              Click on any ward to explore local indicators and compare with national averages
            </p>
          </div>
          <WardMap height="600px" />
        </section>

        <SectorCards />
        <DataVisualization />
      </main>
      
      <ProvenanceFooter 
        provenance={platformProvenance}
        lastUpdated="2024-01-15"
        dataQuality="high"
      />
    </div>
  );
};

export default Index;
