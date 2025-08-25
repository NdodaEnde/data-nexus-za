import React, { useState, useRef, useEffect } from 'react';
import { Search, ArrowRight, Sparkles, Clock, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface QuerySuggestion {
  text: string;
  category: 'trending' | 'recent' | 'template';
  icon: React.ReactNode;
}

const QUERY_SUGGESTIONS: QuerySuggestion[] = [
  {
    text: "Show youth unemployment in South Africa vs South Korea",
    category: 'template',
    icon: <TrendingUp className="h-3 w-3" />
  },
  {
    text: "Generate KPI card for youth unemployment",
    category: 'template',
    icon: <Sparkles className="h-3 w-3" />
  },
  {
    text: "Create Gap-Lens chart for youth unemployment",
    category: 'template',
    icon: <TrendingUp className="h-3 w-3" />
  },
  {
    text: "Show overall unemployment in South Africa vs China",
    category: 'trending',
    icon: <Clock className="h-3 w-3" />
  }
];

interface AskDataBarProps {
  onQuery?: (query: string) => void;
  placeholder?: string;
  className?: string;
  isProcessing?: boolean;
}

const AskDataBar: React.FC<AskDataBarProps> = ({
  onQuery,
  placeholder = "Ask anything about South African data...",
  className,
  isProcessing = false
}) => {
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Combined loading state
  const isDisabled = isLoading || isProcessing;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      await onQuery?.(query.trim());
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setIsActive(false);
    onQuery?.(suggestion);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsActive(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={cn("relative w-full max-w-4xl mx-auto", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsActive(true)}
            onBlur={() => setTimeout(() => setIsActive(false), 200)}
            placeholder={placeholder}
            className="pl-12 pr-24 h-14 text-base bg-background/95 backdrop-blur border-border/50 focus:border-primary/50 focus:bg-background"
            disabled={isDisabled}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <Badge variant="secondary" className="text-xs hidden sm:flex">
              ⌘K
            </Badge>
            <Button
              type="submit"
              size="sm"
              disabled={!query.trim() || isDisabled}
              className="h-10"
            >
              {isDisabled ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {isActive && (
        <Card className="absolute top-full mt-2 w-full bg-background/95 backdrop-blur border-border/50 shadow-lg z-50">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Try asking:</span>
            </div>
            <div className="space-y-2">
              {QUERY_SUGGESTIONS.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className="w-full text-left p-2 rounded-md hover:bg-accent/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      {suggestion.icon}
                    </div>
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                      {suggestion.text}
                    </span>
                    <Badge
                      variant={suggestion.category === 'trending' ? 'default' : 'secondary'}
                      className="ml-auto text-xs"
                    >
                      {suggestion.category}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AskDataBar;