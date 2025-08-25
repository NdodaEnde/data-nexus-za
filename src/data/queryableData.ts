// Sample data to support the 4 query templates
// In production, this would come from your DuckDB/PostGIS data warehouse

import { DataProvenance } from '@/types';

export interface DataQuality {
  freshness: 'current' | 'recent' | 'stale';
  completeness: number; // 0-100
  confidence: 'high' | 'medium' | 'low';
  lastUpdated: Date;
  source: string;
}

export interface IndicatorData {
  indicator: string;
  current_value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  change: string;
  target?: number;
  description: string;
  quality: DataQuality;
  provenance: DataProvenance;
}

export interface GapAnalysisData {
  indicator: string;
  place: string;
  peer_country: string;
  sa_value: number;
  peer_value: number;
  gap: number;
  historical_data: Array<{
    year: number;
    sa: number;
    peer: number;
  }>;
  quality: DataQuality;
  provenance: DataProvenance;
}

export interface GapLensData {
  indicator: string;
  scenarios: Array<{
    year: number;
    baseline: number;
    baseline_upper?: number;
    baseline_lower?: number;
    moderate: number;
    moderate_upper?: number;
    moderate_lower?: number;
    aggressive: number;
    aggressive_upper?: number;
    aggressive_lower?: number;
  }>;
  interventions: {
    moderate: string[];
    aggressive: string[];
  };
  quality: DataQuality;
  provenance: DataProvenance;
}

// Common quality and provenance data for reuse
const getQualityData = (freshness: 'current' | 'recent' | 'stale', confidence: 'high' | 'medium' | 'low', daysOld: number = 30): DataQuality => ({
  freshness,
  completeness: confidence === 'high' ? 95 : confidence === 'medium' ? 85 : 70,
  confidence,
  lastUpdated: new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000),
  source: 'Stats SA'
});

const getStatsProvenance = (datasetName: string): DataProvenance => ({
  source_organization: 'Statistics South Africa',
  dataset_name: datasetName,
  collection_date: '2024-10-15',
  publication_date: '2024-10-20',
  methodology_url: 'https://www.statssa.gov.za/methodology',
  license: 'Open Data',
  citation: `Statistics South Africa. ${datasetName}. 2024.`
});

// KPI card data for indicators
export const indicatorKPIs: Record<string, IndicatorData> = {
  'youth unemployment': {
    indicator: 'Youth Unemployment (15-24)',
    current_value: 61.0,
    unit: '%',
    trend: 'up',
    change: '+2.1% vs last quarter',
    target: 15.0,
    description: 'Percentage of youth (15-24) who are unemployed and actively seeking work',
    quality: getQualityData('recent', 'high', 45),
    provenance: getStatsProvenance('Quarterly Labour Force Survey Q3 2024')
  },
  'overall unemployment': {
    indicator: 'Overall Unemployment Rate',
    current_value: 32.9,
    unit: '%',
    trend: 'up',
    change: '+1.2% vs last year',
    target: 10.0,
    description: 'Percentage of economically active population that is unemployed',
    quality: getQualityData('recent', 'high', 45),
    provenance: getStatsProvenance('Quarterly Labour Force Survey Q3 2024')
  },
  'literacy rate': {
    indicator: 'Adult Literacy Rate',
    current_value: 87.0,
    unit: '%',
    trend: 'up',
    change: '+0.8% vs last year',
    target: 95.0,
    description: 'Percentage of population aged 20+ that can read and write',
    quality: getQualityData('stale', 'medium', 180),
    provenance: getStatsProvenance('Community Survey 2023')
  },
  'matric pass rate': {
    indicator: 'Matric Pass Rate',
    current_value: 80.1,
    unit: '%',
    trend: 'down',
    change: '-1.5% vs last year',
    target: 90.0,
    description: 'Percentage of Grade 12 learners who passed matric exams',
    quality: getQualityData('current', 'high', 15),
    provenance: getStatsProvenance('National Senior Certificate Results 2024')
  }
};

// Gap analysis data comparing SA with peer countries
export const gapAnalysisData: Record<string, GapAnalysisData[]> = {
  'youth unemployment': [
    {
      indicator: 'Youth Unemployment',
      place: 'South Africa',
      peer_country: 'South Korea',
      sa_value: 61.0,
      peer_value: 7.0,
      gap: 54.0,
      historical_data: [
        { year: 2018, sa: 58.2, peer: 9.8 },
        { year: 2019, sa: 58.5, peer: 8.9 },
        { year: 2020, sa: 63.2, peer: 9.0 },
        { year: 2021, sa: 66.5, peer: 7.8 },
        { year: 2022, sa: 60.7, peer: 7.2 },
        { year: 2023, sa: 61.0, peer: 7.0 }
      ],
      quality: getQualityData('recent', 'high', 45),
      provenance: getStatsProvenance('Youth Unemployment Comparative Analysis 2024')
    },
    {
      indicator: 'Youth Unemployment',
      place: 'South Africa',
      peer_country: 'China',
      sa_value: 61.0,
      peer_value: 10.0,
      gap: 51.0,
      historical_data: [
        { year: 2018, sa: 58.2, peer: 12.1 },
        { year: 2019, sa: 58.5, peer: 11.8 },
        { year: 2020, sa: 63.2, peer: 13.2 },
        { year: 2021, sa: 66.5, peer: 11.1 },
        { year: 2022, sa: 60.7, peer: 10.5 },
        { year: 2023, sa: 61.0, peer: 10.0 }
      ],
      quality: getQualityData('recent', 'medium', 60),
      provenance: getStatsProvenance('Youth Unemployment Comparative Analysis 2024')
    }
  ],
  'overall unemployment': [
    {
      indicator: 'Overall Unemployment',
      place: 'South Africa',
      peer_country: 'South Korea',
      sa_value: 32.9,
      peer_value: 3.1,
      gap: 29.8,
      historical_data: [
        { year: 2018, sa: 27.1, peer: 3.8 },
        { year: 2019, sa: 28.2, peer: 3.8 },
        { year: 2020, sa: 29.2, peer: 4.0 },
        { year: 2021, sa: 30.8, peer: 3.6 },
        { year: 2022, sa: 32.1, peer: 3.3 },
        { year: 2023, sa: 32.9, peer: 3.1 }
      ],
      quality: getQualityData('recent', 'high', 45),
      provenance: getStatsProvenance('Unemployment Comparative Analysis 2024')
    }
  ]
};

// Gap-Lens projection data for different scenarios
export const gapLensData: Record<string, GapLensData> = {
  'youth unemployment': {
    indicator: 'Youth Unemployment',
    scenarios: [
      { 
        year: 2024, 
        baseline: 61, baseline_upper: 63, baseline_lower: 59,
        moderate: 61, moderate_upper: 63, moderate_lower: 59,
        aggressive: 61, aggressive_upper: 63, aggressive_lower: 59
      },
      { 
        year: 2025, 
        baseline: 62, baseline_upper: 65, baseline_lower: 59,
        moderate: 58, moderate_upper: 62, moderate_lower: 54,
        aggressive: 55, aggressive_upper: 60, aggressive_lower: 50
      },
      { 
        year: 2026, 
        baseline: 62, baseline_upper: 66, baseline_lower: 58,
        moderate: 55, moderate_upper: 60, moderate_lower: 50,
        aggressive: 48, aggressive_upper: 55, aggressive_lower: 41
      },
      { 
        year: 2027, 
        baseline: 63, baseline_upper: 68, baseline_lower: 58,
        moderate: 52, moderate_upper: 58, moderate_lower: 46,
        aggressive: 42, aggressive_upper: 50, aggressive_lower: 34
      },
      { 
        year: 2028, 
        baseline: 63, baseline_upper: 69, baseline_lower: 57,
        moderate: 50, moderate_upper: 57, moderate_lower: 43,
        aggressive: 38, aggressive_upper: 46, aggressive_lower: 30
      },
      { 
        year: 2029, 
        baseline: 64, baseline_upper: 71, baseline_lower: 57,
        moderate: 47, moderate_upper: 55, moderate_lower: 39,
        aggressive: 32, aggressive_upper: 41, aggressive_lower: 23
      },
      { 
        year: 2030, 
        baseline: 64, baseline_upper: 72, baseline_lower: 56,
        moderate: 45, moderate_upper: 53, moderate_lower: 37,
        aggressive: 28, aggressive_upper: 37, aggressive_lower: 19
      }
    ],
    interventions: {
      moderate: [
        'Expand vocational training to 300k learners/year',
        'SME hiring incentives for youth',
        'Infrastructure jobs program',
        'Digital skills bootcamps'
      ],
      aggressive: [
        'Industrial policy transformation',
        'Skills revolution - STEM focus',
        'Manufacturing hub development',
        'Export-oriented job creation',
        'Education system overhaul'
      ]
    },
    quality: getQualityData('current', 'medium', 30),
    provenance: getStatsProvenance('Youth Employment Scenario Modeling 2024')
  },
  'overall unemployment': {
    indicator: 'Overall Unemployment',
    scenarios: [
      { 
        year: 2024, 
        baseline: 33, baseline_upper: 35, baseline_lower: 31,
        moderate: 33, moderate_upper: 35, moderate_lower: 31,
        aggressive: 33, aggressive_upper: 35, aggressive_lower: 31
      },
      { 
        year: 2025, 
        baseline: 34, baseline_upper: 37, baseline_lower: 31,
        moderate: 31, moderate_upper: 34, moderate_lower: 28,
        aggressive: 29, aggressive_upper: 33, aggressive_lower: 25
      },
      { 
        year: 2026, 
        baseline: 34, baseline_upper: 38, baseline_lower: 30,
        moderate: 29, moderate_upper: 33, moderate_lower: 25,
        aggressive: 26, aggressive_upper: 31, aggressive_lower: 21
      },
      { 
        year: 2027, 
        baseline: 35, baseline_upper: 40, baseline_lower: 30,
        moderate: 27, moderate_upper: 32, moderate_lower: 22,
        aggressive: 23, aggressive_upper: 29, aggressive_lower: 17
      },
      { 
        year: 2028, 
        baseline: 35, baseline_upper: 41, baseline_lower: 29,
        moderate: 25, moderate_upper: 31, moderate_lower: 19,
        aggressive: 20, aggressive_upper: 27, aggressive_lower: 13
      },
      { 
        year: 2029, 
        baseline: 36, baseline_upper: 43, baseline_lower: 29,
        moderate: 23, moderate_upper: 30, moderate_lower: 16,
        aggressive: 17, aggressive_upper: 25, aggressive_lower: 9
      },
      { 
        year: 2030, 
        baseline: 36, baseline_upper: 44, baseline_lower: 28,
        moderate: 22, moderate_upper: 29, moderate_lower: 15,
        aggressive: 15, aggressive_upper: 23, aggressive_lower: 7
      }
    ],
    interventions: {
      moderate: [
        'Job creation programs',
        'Skills development initiatives',
        'Small business support',
        'Public works expansion'
      ],
      aggressive: [
        'Economic transformation',
        'Industrial diversification',
        'Mass skills retraining',
        'Innovation economy development',
        'Infrastructure investment surge'
      ]
    },
    quality: getQualityData('current', 'medium', 30),
    provenance: getStatsProvenance('Employment Scenario Modeling 2024')
  }
};

// Chart explanations for different visualization types
export const chartExplanations: Record<string, string> = {
  'gap-analysis': `This gap analysis chart compares South Africa's performance with a peer country over time. 
    The red line shows South Africa's trajectory, while the blue line represents the peer country. 
    The gap between these lines illustrates the performance difference we need to close. 
    The larger the gap, the more urgent the need for targeted interventions.`,
    
  'kpi-card': `This KPI card shows the current status of a key indicator. The large number is the current value, 
    with the trend arrow indicating whether it's improving or worsening. The percentage change shows the rate of change 
    compared to the previous period. The target line indicates where we want to be.`,
    
  'gap-lens': `This Gap-Lens projection shows three possible future scenarios based on different policy interventions. 
    The gray area represents the status quo (baseline), orange shows moderate reform impacts, 
    and green displays aggressive transformation results. This helps policymakers understand the potential 
    impact of different intervention strategies over time.`
};

// Function to get data based on query parameters
export const getIndicatorKPI = (indicator: string): IndicatorData | null => {
  return indicatorKPIs[indicator.toLowerCase()] || null;
};

export const getGapAnalysisData = (indicator: string, place: string, peerCountry: string): GapAnalysisData | null => {
  const indicatorData = gapAnalysisData[indicator.toLowerCase()];
  if (!indicatorData) return null;
  
  return indicatorData.find(data => 
    data.place.toLowerCase() === place.toLowerCase() && 
    data.peer_country.toLowerCase() === peerCountry.toLowerCase()
  ) || null;
};

export const getGapLensData = (indicator: string): GapLensData | null => {
  return gapLensData[indicator.toLowerCase()] || null;
};

export const getChartExplanation = (chartType: string): string => {
  return chartExplanations[chartType] || 'This chart displays data trends and patterns to help with analysis and decision-making.';
};