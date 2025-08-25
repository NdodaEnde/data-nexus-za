import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Target } from 'lucide-react';

interface SimpleQueryResultProps {
  query: string;
  result: {
    type: 'kpi' | 'gap' | 'lens' | 'explain';
    data: any;
  } | null;
  error: string | null;
}

const SimpleQueryResult: React.FC<SimpleQueryResultProps> = ({ 
  query, 
  result, 
  error 
}) => {
  if (error) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Query Result</CardTitle>
          <Badge variant="outline">
            <Target className="h-3 w-3 mr-1" />
            {result.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Query:</p>
            <p className="font-medium">"{query}"</p>
          </div>
          
          <div className="p-4 bg-primary/5 rounded-lg">
            <p className="text-sm">
              ✅ Query processed successfully! Complex visualizations will be added in the next update.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleQueryResult;