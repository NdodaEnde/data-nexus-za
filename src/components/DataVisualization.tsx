import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, GraduationCap, Heart } from 'lucide-react';
import {
  EducationChart,
  UnemploymentChart,
  PopulationChart,
  HealthcareChart,
  KPICard
} from '@/components/ChartComponents';
import {
  educationData,
  unemploymentData,
  healthData,
  populationData,
  kpiData
} from '@/data/sampleData';
import ProvenanceFooter from '@/components/ProvenanceFooter';
import { DataProvenance } from '@/types';
import saMapImage from '@/assets/sa-map-data.jpg';

// Sample provenance data for charts
const statsProvenance: DataProvenance = {
  source_organization: "Statistics South Africa",
  dataset_name: "Quarterly Labour Force Survey Q4 2023", 
  collection_date: "2023-12-31",
  publication_date: "2024-01-15",
  methodology_url: "https://www.statssa.gov.za/publications/P0211/P02114thQuarter2023.pdf",
  license: "CC BY 4.0",
  citation: "Statistics South Africa. (2024). Quarterly Labour Force Survey Q4 2023. Pretoria: Stats SA."
};

const DataVisualization = () => {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Data Insights & Analytics</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore key metrics and trends across South Africa's development indicators
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Population"
          value={`${kpiData.totalPopulation.toLocaleString()}`}
          change="+1.2% from last year"
          trend="up"
          icon={<Users className="h-4 w-4" />}
          description="Total South African population"
        />
        
        <KPICard
          title="Unemployment"
          value={`${kpiData.overallUnemployment}%`}
          change="-0.7% from Q3"
          trend="down"
          icon={<TrendingUp className="h-4 w-4" />}
          description="National unemployment rate"
        />
        
        <KPICard
          title="Literacy Rate"
          value={`${kpiData.literacyRate}%`}
          change="+2.1% improvement"
          trend="up"
          icon={<GraduationCap className="h-4 w-4" />}
          description="Adult literacy percentage"
        />
        
        <KPICard
          title="Healthcare Access"
          value={`${kpiData.healthcareAccess}%`}
          change="+1.8% coverage"
          trend="up"
          icon={<Heart className="h-4 w-4" />}
          description="Population with healthcare access"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Education Trends */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Education Trends</CardTitle>
              <Badge variant="secondary">2018-2023</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <EducationChart data={educationData} />
            <ProvenanceFooter 
              provenance={statsProvenance}
              lastUpdated="2024-01-15"
              dataQuality="high"
            />
          </CardContent>
        </Card>

        {/* Unemployment by Province */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Unemployment by Province</CardTitle>
              <Badge variant="secondary">Q4 2023</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <UnemploymentChart data={unemploymentData} />
            <ProvenanceFooter 
              provenance={statsProvenance}
              lastUpdated="2024-01-15"
              dataQuality="high"
            />
          </CardContent>
        </Card>

        {/* Population Growth */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Population Growth</CardTitle>
              <Badge variant="secondary">2018-2023</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <PopulationChart data={populationData} />
            <ProvenanceFooter 
              provenance={statsProvenance}
              lastUpdated="2024-01-15"
              dataQuality="medium"
            />
          </CardContent>
        </Card>

        {/* Healthcare Coverage */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Healthcare Coverage</CardTitle>
              <Badge variant="secondary">2023</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <HealthcareChart data={healthData} />
            <ProvenanceFooter 
              provenance={statsProvenance}
              lastUpdated="2024-01-15"
              dataQuality="high"
            />
          </CardContent>
        </Card>
      </div>

      {/* Interactive Map Placeholder */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground">Ward-Level Interactive Map</CardTitle>
            <Badge variant="outline">Coming Soon</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
            <img 
              src={saMapImage}
              alt="South Africa ward-level data visualization"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-white">Interactive Ward Map</h3>
                <p className="text-white/80">Click on any ward to explore detailed indicators</p>
                <Badge className="bg-white text-black">Phase 2 Feature</Badge>
              </div>
            </div>
          </div>
          <ProvenanceFooter 
            provenance={{
              source_organization: "Municipal Demarcation Board",
              dataset_name: "Ward Boundaries 2021",
              collection_date: "2021-08-01", 
              publication_date: "2021-08-15",
              license: "Open Data",
              citation: "Municipal Demarcation Board. (2021). Ward Boundaries 2021. South Africa."
            }}
            lastUpdated="2021-08-15"
            dataQuality="high"
          />
        </CardContent>
      </Card>
    </section>
  );
};

export default DataVisualization;