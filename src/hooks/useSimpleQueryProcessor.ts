import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SimpleQueryState {
  isProcessing: boolean;
  result: { type: 'kpi' | 'gap' | 'lens' | 'explain'; data: any } | null;
  error: string | null;
  originalQuery: string;
}

// Simple template matching without heavy processing
const parseSimpleQuery = (query: string): { type: 'kpi' | 'gap' | 'lens' | 'explain'; data: any } | null => {
  const cleanQuery = query.toLowerCase().trim();
  
  if (cleanQuery.includes('kpi') || cleanQuery.includes('generate')) {
    return { type: 'kpi', data: { indicator: 'youth unemployment' } };
  }
  
  if (cleanQuery.includes('vs') || cleanQuery.includes('show')) {
    return { type: 'gap', data: { comparison: true } };
  }
  
  if (cleanQuery.includes('gap-lens') || cleanQuery.includes('lens')) {
    return { type: 'lens', data: { projection: true } };
  }
  
  if (cleanQuery.includes('explain')) {
    return { type: 'explain', data: { explanation: true } };
  }
  
  return null;
};

export const useSimpleQueryProcessor = () => {
  const { toast } = useToast();
  const [queryState, setQueryState] = useState<SimpleQueryState>({
    isProcessing: false,
    result: null,
    error: null,
    originalQuery: ''
  });

  const processQuery = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setQueryState({
      isProcessing: true,
      result: null,
      error: null,
      originalQuery: query
    });

    try {
      // Simple processing
      await new Promise(resolve => setTimeout(resolve, 500));

      const result = parseSimpleQuery(query);
      
      if (!result) {
        setQueryState({
          isProcessing: false,
          result: null,
          error: 'Try: "Generate KPI card for youth unemployment" or "Show youth unemployment in SA vs Korea"',
          originalQuery: query
        });
        return;
      }

      setQueryState({
        isProcessing: false,
        result,
        error: null,
        originalQuery: query
      });

      toast({
        title: "Query Processed",
        description: "Simple result generated",
      });

    } catch (error) {
      setQueryState({
        isProcessing: false,
        result: null,
        error: 'Processing failed',
        originalQuery: query
      });
    }
  }, [toast]);

  const clearQuery = useCallback(() => {
    setQueryState({
      isProcessing: false,
      result: null,
      error: null,
      originalQuery: ''
    });
  }, []);

  return {
    processQuery,
    clearQuery,
    isProcessing: queryState.isProcessing,
    result: queryState.result,
    error: queryState.error,
    originalQuery: queryState.originalQuery,
    hasResult: queryState.result !== null
  };
};