// Sample data to support the 4 query templates
// In production, this would come from your DuckDB/PostGIS data warehouse

export interface IndicatorData {
  indicator: string;
  current_value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  change: string;
  target?: number;
  description: string;
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
}

export interface GapLensData {
  indicator: string;
  scenarios: Array<{
    year: number;
    baseline: number;
    moderate: number;
    aggressive: number;
  }>;
  interventions: {
    moderate: string[];
    aggressive: string[];
  };
}

// KPI card data for indicators
export const indicatorKPIs: Record<string, IndicatorData> = {
  'youth unemployment': {
    indicator: 'Youth Unemployment (15-24)',
    current_value: 61.0,
    unit: '%',
    trend: 'up',
    change: '+2.1% vs last quarter',
    target: 15.0,
    description: 'Percentage of youth (15-24) who are unemployed and actively seeking work'
  },
  'overall unemployment': {
    indicator: 'Overall Unemployment Rate',
    current_value: 32.9,
    unit: '%',
    trend: 'up',
    change: '+1.2% vs last year',
    target: 10.0,
    description: 'Percentage of economically active population that is unemployed'
  },
  'literacy rate': {
    indicator: 'Adult Literacy Rate',
    current_value: 87.0,
    unit: '%',
    trend: 'up',
    change: '+0.8% vs last year',
    target: 95.0,
    description: 'Percentage of population aged 20+ that can read and write'
  },
  'matric pass rate': {
    indicator: 'Matric Pass Rate',
    current_value: 80.1,
    unit: '%',
    trend: 'down',
    change: '-1.5% vs last year',
    target: 90.0,
    description: 'Percentage of Grade 12 learners who passed matric exams'
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
      ]
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
      ]
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
      ]
    }
  ]
};

// Gap-Lens projection data for different scenarios
export const gapLensData: Record<string, GapLensData> = {
  'youth unemployment': {
    indicator: 'Youth Unemployment',
    scenarios: [
      { year: 2024, baseline: 61, moderate: 61, aggressive: 61 },
      { year: 2025, baseline: 62, moderate: 58, aggressive: 55 },
      { year: 2026, baseline: 62, moderate: 55, aggressive: 48 },
      { year: 2027, baseline: 63, moderate: 52, aggressive: 42 },
      { year: 2028, baseline: 63, moderate: 50, aggressive: 38 },
      { year: 2029, baseline: 64, moderate: 47, aggressive: 32 },
      { year: 2030, baseline: 64, moderate: 45, aggressive: 28 }
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
    }
  },
  'overall unemployment': {
    indicator: 'Overall Unemployment',
    scenarios: [
      { year: 2024, baseline: 33, moderate: 33, aggressive: 33 },
      { year: 2025, baseline: 34, moderate: 31, aggressive: 29 },
      { year: 2026, baseline: 34, moderate: 29, aggressive: 26 },
      { year: 2027, baseline: 35, moderate: 27, aggressive: 23 },
      { year: 2028, baseline: 35, moderate: 25, aggressive: 20 },
      { year: 2029, baseline: 36, moderate: 23, aggressive: 17 },
      { year: 2030, baseline: 36, moderate: 22, aggressive: 15 }
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
    }
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