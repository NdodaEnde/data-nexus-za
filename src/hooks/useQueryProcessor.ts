import { useState, useCallback } from 'react';
import { QueryProcessor, ParsedQuery } from '@/services/queryProcessor';
import { useToast } from '@/hooks/use-toast';

interface QueryState {
  isProcessing: boolean;
  result: ParsedQuery | null;
  error: string | null;
  originalQuery: string;
}

export const useQueryProcessor = () => {
  const { toast } = useToast();
  const [queryState, setQueryState] = useState<QueryState>({
    isProcessing: false,
    result: null,
    error: null,
    originalQuery: ''
  });

  const processQuery = useCallback(async (query: string) => {
    if (!query.trim()) {
      toast({
        title: "Empty Query",
        description: "Please enter a query to analyze.",
        variant: "destructive"
      });
      return;
    }

    setQueryState({
      isProcessing: true,
      result: null,
      error: null,
      originalQuery: query
    });

    try {
      // Show processing toast
      toast({
        title: "Processing Query",
        description: `Analyzing: "${query.length > 50 ? query.substring(0, 50) + '...' : query}"`,
      });

      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 800));

      // Parse the query using our template system
      const parsedQuery = QueryProcessor.parseQuery(query);

      if (!parsedQuery) {
        // Query didn't match any template
        const suggestions = QueryProcessor.getSuggestedQueries();
        setQueryState({
          isProcessing: false,
          result: null,
          error: `Query format not recognized. Try one of these formats:\n${suggestions.join('\n')}`,
          originalQuery: query
        });

        toast({
          title: "Query Not Supported",
          description: "This query format isn't supported yet. Check the suggestions below.",
          variant: "destructive"
        });
        return;
      }

      // Validate that we have the required data
      const validation = QueryProcessor.validateQuery(parsedQuery);
      if (!validation.valid) {
        setQueryState({
          isProcessing: false,
          result: null,
          error: validation.error || 'Query validation failed',
          originalQuery: query
        });

        toast({
          title: "Data Not Available",
          description: validation.error,
          variant: "destructive"
        });
        return;
      }

      // Success - we have a valid, processable query
      setQueryState({
        isProcessing: false,
        result: parsedQuery,
        error: null,
        originalQuery: query
      });

      toast({
        title: "Query Processed",
        description: "Results generated successfully",
      });

    } catch (error) {
      console.error('Query processing error:', error);
      
      setQueryState({
        isProcessing: false,
        result: null,
        error: 'An unexpected error occurred while processing your query.',
        originalQuery: query
      });

      toast({
        title: "Processing Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
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

  const getSuggestedQueries = useCallback(() => {
    return QueryProcessor.getSuggestedQueries();
  }, []);

  return {
    processQuery,
    clearQuery,
    getSuggestedQueries,
    isProcessing: queryState.isProcessing,
    result: queryState.result,
    error: queryState.error,
    originalQuery: queryState.originalQuery,
    hasResult: queryState.result !== null,
    hasError: queryState.error !== null
  };
};