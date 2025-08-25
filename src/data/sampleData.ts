// Sample data for Phase 1 MVP - South African Evidence & Insights Platform

export interface EducationData {
  year: number;
  enrollment: number;
  literacy: number;
}

export interface UnemploymentData {
  province: string;
  rate: number;
  color: string;
}

export interface HealthData {
  category: string;
  value: number;
  color: string;
}

export interface PopulationData {
  year: number;
  population: number;
}

export interface WardIndicator {
  wardId: string;
  wardName: string;
  municipality: string;
  province: string;
  unemployment: number;
  literacy: number;
  healthAccess: number;
  population: number;
}

// Education trends data
export const educationData: EducationData[] = [
  { year: 2018, enrollment: 78.2, literacy: 79.1 },
  { year: 2019, enrollment: 79.8, literacy: 80.3 },
  { year: 2020, enrollment: 76.5, literacy: 81.2 }, // COVID impact
  { year: 2021, enrollment: 77.9, literacy: 82.1 },
  { year: 2022, enrollment: 81.4, literacy: 83.5 },
  { year: 2023, enrollment: 83.7, literacy: 84.2 }
];

// Unemployment by province
export const unemploymentData: UnemploymentData[] = [
  { province: "Eastern Cape", rate: 43.2, color: "hsl(var(--data-error))" },
  { province: "Free State", rate: 34.8, color: "hsl(var(--data-warning))" },
  { province: "Gauteng", rate: 28.9, color: "hsl(var(--data-tertiary))" },
  { province: "KwaZulu-Natal", rate: 31.5, color: "hsl(var(--data-quaternary))" },
  { province: "Limpopo", rate: 23.1, color: "hsl(var(--data-success))" },
  { province: "Mpumalanga", rate: 35.7, color: "hsl(var(--data-warning))" },
  { province: "Northern Cape", rate: 29.3, color: "hsl(var(--data-primary))" },
  { province: "North West", rate: 38.4, color: "hsl(var(--data-error))" },
  { province: "Western Cape", rate: 21.8, color: "hsl(var(--data-success))" }
];

// Healthcare coverage data
export const healthData: HealthData[] = [
  { category: "Public Healthcare", value: 84.2, color: "hsl(var(--data-primary))" },
  { category: "Private Healthcare", value: 15.8, color: "hsl(var(--data-secondary))" }
];

// Population growth data
export const populationData: PopulationData[] = [
  { year: 2018, population: 57.8 },
  { year: 2019, population: 58.4 },
  { year: 2020, population: 59.0 },
  { year: 2021, population: 59.6 },
  { year: 2022, population: 60.1 },
  { year: 2023, population: 60.4 }
];

// Sample ward-level data for interactive map
export const wardData: WardIndicator[] = [
  {
    wardId: "79900001",
    wardName: "Ward 1",
    municipality: "Buffalo City",
    province: "Eastern Cape",
    unemployment: 45.2,
    literacy: 76.8,
    healthAccess: 67.3,
    population: 8421
  },
  {
    wardId: "79900002", 
    wardName: "Ward 2",
    municipality: "Buffalo City",
    province: "Eastern Cape",
    unemployment: 41.7,
    literacy: 79.2,
    healthAccess: 71.5,
    population: 9156
  },
  {
    wardId: "52300001",
    wardName: "Ward 1", 
    municipality: "City of Cape Town",
    province: "Western Cape",
    unemployment: 18.9,
    literacy: 91.3,
    healthAccess: 89.7,
    population: 12845
  },
  {
    wardId: "52300002",
    wardName: "Ward 2",
    municipality: "City of Cape Town", 
    province: "Western Cape",
    unemployment: 21.4,
    literacy: 88.6,
    healthAccess: 87.2,
    population: 11234
  },
  {
    wardId: "79800001",
    wardName: "Ward 1",
    municipality: "City of Johannesburg",
    province: "Gauteng", 
    unemployment: 26.3,
    literacy: 87.9,
    healthAccess: 81.4,
    population: 15678
  }
];

// Key performance indicators for dashboard
export const kpiData = {
  totalPopulation: 60400000,
  overallUnemployment: 32.9,
  literacyRate: 84.2,
  healthcareAccess: 73.1,
  lastUpdated: "2024-01-15"
};

// Peer country comparison data
export const peerCountryData = {
  southAfrica: {
    youthUnemployment: 59.7,
    gdpGrowth: 0.7,
    literacyRate: 84.2
  },
  southKorea: {
    youthUnemployment: 9.8,
    gdpGrowth: 3.1,
    literacyRate: 97.9,
    target2027: 8.5
  },
  brazil: {
    youthUnemployment: 17.9,
    gdpGrowth: 2.9,
    literacyRate: 93.2
  },
  turkey: {
    youthUnemployment: 19.6,
    gdpGrowth: 5.6,
    literacyRate: 96.2
  }
};

// Sample data quality indicators
export const dataQualityMetrics = {
  completeness: 94.7,
  accuracy: 91.3,
  timeliness: 87.9,
  consistency: 96.2
};