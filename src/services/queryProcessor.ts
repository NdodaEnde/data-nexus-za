import { QueryRequest, QueryResponse } from '@/types';

// Template patterns for the 4 supported query types
const QUERY_TEMPLATES = [
  {
    id: 'gap-analysis',
    pattern: /show\s+(.+?)\s+in\s+(.+?)\s+vs\s+(.+?)$/i,
    description: 'Show [indicator] in [place] vs [peer-country]',
    example: 'Show youth unemployment in South Africa vs South Korea'
  },
  {
    id: 'kpi-card',
    pattern: /generate\s+kpi\s+card\s+for\s+(.+?)$/i,
    description: 'Generate KPI card for [indicator]',
    example: 'Generate KPI card for youth unemployment'
  },
  {
    id: 'gap-lens',
    pattern: /create\s+gap[\-\s]?lens\s+chart\s+for\s+(.+?)$/i,
    description: 'Create Gap-Lens chart for [indicator]',
    example: 'Create Gap-Lens chart for youth unemployment'
  },
  {
    id: 'explain-chart',
    pattern: /explain\s+this\s+chart\s+in\s+plain\s+language$/i,
    description: 'Explain this chart in plain language',
    example: 'Explain this chart in plain language'
  }
];

// Available indicators that can be queried
const AVAILABLE_INDICATORS = [
  'youth unemployment',
  'overall unemployment',
  'literacy rate',
  'matric pass rate',
  'clinic density',
  'school enrollment',
  'population growth',
  'poverty rate'
];

// Available places and peer countries
const AVAILABLE_PLACES = [
  'South Africa',
  'KwaZulu-Natal',
  'Western Cape',
  'Gauteng',
  'Eastern Cape',
  'Free State',
  'Limpopo',
  'Mpumalanga',
  'Northern Cape',
  'North West'
];

const PEER_COUNTRIES = [
  'South Korea',
  'China',
  'Brazil',
  'India',
  'Turkey',
  'Mexico',
  'OECD Average'
];

export interface ParsedQuery {
  templateId: string;
  indicator?: string;
  place?: string;
  peerCountry?: string;
  confidence: number;
}

export class QueryProcessor {
  /**
   * Parse natural language query and match to templates
   */
  static parseQuery(query: string): ParsedQuery | null {
    const cleanQuery = query.trim().toLowerCase();
    
    for (const template of QUERY_TEMPLATES) {
      const match = cleanQuery.match(template.pattern);
      
      if (match) {
        const result: ParsedQuery = {
          templateId: template.id,
          confidence: 0.8
        };

        // Extract entities based on template type
        switch (template.id) {
          case 'gap-analysis':
            if (match[1] && match[2] && match[3]) {
              result.indicator = this.findBestMatch(match[1], AVAILABLE_INDICATORS);
              result.place = this.findBestMatch(match[2], AVAILABLE_PLACES);
              result.peerCountry = this.findBestMatch(match[3], PEER_COUNTRIES);
              
              // Validate all entities found
              if (result.indicator && result.place && result.peerCountry) {
                result.confidence = 0.9;
                return result;
              }
            }
            break;

          case 'kpi-card':
          case 'gap-lens':
            if (match[1]) {
              result.indicator = this.findBestMatch(match[1], AVAILABLE_INDICATORS);
              if (result.indicator) {
                result.confidence = 0.9;
                return result;
              }
            }
            break;

          case 'explain-chart':
            result.confidence = 0.9;
            return result;
        }
      }
    }

    return null;
  }

  /**
   * Find best matching entity from available options
   */
  private static findBestMatch(input: string, options: string[]): string | null {
    const normalizedInput = input.toLowerCase().trim();
    
    // Exact match
    for (const option of options) {
      if (option.toLowerCase() === normalizedInput) {
        return option;
      }
    }

    // Partial match
    for (const option of options) {
      if (option.toLowerCase().includes(normalizedInput) || 
          normalizedInput.includes(option.toLowerCase())) {
        return option;
      }
    }

    return null;
  }

  /**
   * Generate suggested queries when parsing fails
   */
  static getSuggestedQueries(): string[] {
    return QUERY_TEMPLATES.map(template => template.example);
  }

  /**
   * Validate if all required data exists for the query
   */
  static validateQuery(parsedQuery: ParsedQuery): { valid: boolean; error?: string } {
    switch (parsedQuery.templateId) {
      case 'gap-analysis':
        if (!parsedQuery.indicator || !parsedQuery.place || !parsedQuery.peerCountry) {
          return { 
            valid: false, 
            error: `Missing required data. Available indicators: ${AVAILABLE_INDICATORS.join(', ')}` 
          };
        }
        break;

      case 'kpi-card':
      case 'gap-lens':
        if (!parsedQuery.indicator) {
          return { 
            valid: false, 
            error: `Indicator not found. Available indicators: ${AVAILABLE_INDICATORS.join(', ')}` 
          };
        }
        break;
    }

    return { valid: true };
  }
}