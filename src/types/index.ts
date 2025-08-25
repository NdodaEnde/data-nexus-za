// Core data models for South African Evidence & Insights Platform

export interface Ward {
  id: string;
  code: string;
  name: string;
  municipality: string;
  district: string;
  province: string;
  geometry: GeoJSON.Polygon;
  population: number;
  area_km2: number;
  classification: 'urban' | 'rural' | 'semi-urban';
  last_updated: string;
}

export interface Indicator {
  id: string;
  code: string;
  name: string;
  description: string;
  unit: string;
  category: string;
  subcategory: string;
  source: string;
  methodology: string;
  last_updated: string;
  frequency: 'monthly' | 'quarterly' | 'annually';
  quality_score: number; // 0-100
  provenance: DataProvenance;
}

export interface Metric {
  id: string;
  ward_id: string;
  indicator_id: string;
  value: number;
  period: string;
  year: number;
  quarter?: number;
  month?: number;
  confidence_interval?: [number, number];
  data_quality: 'high' | 'medium' | 'low';
  flags: string[];
}

export interface DataProvenance {
  source_organization: string;
  dataset_name: string;
  collection_date: string;
  publication_date: string;
  methodology_url?: string;
  license: string;
  citation: string;
}

export interface PeerCountry {
  id: string;
  name: string;
  iso_code: string;
  population: number;
  gdp_per_capita: number;
  development_level: 'developed' | 'emerging' | 'developing';
}

export interface Target {
  id: string;
  peer_country_id: string;
  indicator_id: string;
  target_value: number;
  target_year: number;
  trajectory: Array<{ year: number; value: number }>;
  policy_context: string;
}

export interface PolicyLever {
  id: string;
  name: string;
  description: string;
  category: 'regulatory' | 'fiscal' | 'investment' | 'institutional';
  impact_indicators: string[];
  implementation_complexity: 'low' | 'medium' | 'high';
  time_horizon: 'short' | 'medium' | 'long';
  estimated_cost: number;
  evidence_strength: number; // 0-100
}

export interface Story {
  id: string;
  title: string;
  author_id: string;
  template: string;
  content: StorySection[];
  published: boolean;
  created_at: string;
  updated_at: string;
  moderation_status: 'pending' | 'approved' | 'rejected';
  fact_check_score: number;
}

export interface StorySection {
  id: string;
  type: 'text' | 'map' | 'chart' | 'gap_lens' | 'kpi_card';
  content: any;
  position: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'public' | 'analyst' | 'journalist' | 'admin';
  organization?: string;
  api_key?: string;
  rate_limit_tier: 'public' | 'authenticated' | 'premium';
  created_at: string;
}

export interface QueryRequest {
  natural_query: string;
  template_match?: string;
  parameters: Record<string, any>;
  user_id?: string;
}

export interface QueryResponse {
  chart_type: 'bar' | 'line' | 'map' | 'kpi' | 'gap_lens';
  title: string;
  data: any[];
  x_axis?: string;
  y_axis?: string;
  filters: Record<string, any>;
  provenance: DataProvenance;
  execution_time_ms: number;
}

export interface ApiEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  rate_limit: number;
  requires_auth: boolean;
}

// UI Component Types
export interface ChartConfig {
  type: 'bar' | 'line' | 'area' | 'scatter' | 'heatmap';
  data: any[];
  x_field: string;
  y_field: string;
  color_field?: string;
  title: string;
  subtitle?: string;
  provenance: DataProvenance;
}

export interface MapConfig {
  center: [number, number];
  zoom: number;
  style: string;
  layers: MapLayer[];
}

export interface MapLayer {
  id: string;
  type: 'fill' | 'line' | 'circle' | 'heatmap';
  source: string;
  paint: Record<string, any>;
  filter?: any[];
}

// Search and Filter Types
export interface SearchFilters {
  provinces?: string[];
  municipalities?: string[];
  districts?: string[];
  indicators?: string[];
  years?: number[];
  classification?: ('urban' | 'rural' | 'semi-urban')[];
  data_quality?: ('high' | 'medium' | 'low')[];
}

export interface SearchResult {
  type: 'ward' | 'indicator' | 'story' | 'policy_lever';
  id: string;
  title: string;
  description: string;
  relevance_score: number;
  metadata: Record<string, any>;
}