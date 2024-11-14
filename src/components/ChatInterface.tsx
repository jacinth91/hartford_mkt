import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import QueryResult from './QueryResult';

interface QuerySummary {
  query: string;
  timestamp: string;
}

interface FinancialMetric {
  category: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  details?: string;
}

const ChatInterface = () => {
  const [query, setQuery] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [summaries, setSummaries] = useState<QuerySummary[]>([]);

  const [metrics] = useState<FinancialMetric[]>([
    {
      category: "Revenue",
      value: "$20.4 billion",
      trend: "down",
      details: "Down 2% YoY"
    },
    {
      category: "Net Income",
      value: "$5.1 billion",
      trend: "up",
      details: "$1.42 per diluted share"
    },
    {
      category: "Net Interest Income",
      value: "$11.7 billion",
      trend: "down",
      details: "Down 11% YoY"
    },
    {
      category: "Noninterest Income",
      value: "$8.7 billion",
      trend: "up",
      details: "Up 12% YoY"
    },
    {
      category: "Average Loans",
      value: "$910.3 billion",
      trend: "down",
      details: "Down 3% YoY"
    },
    {
      category: "Average Deposits",
      value: "$1.3 trillion",
      trend: "neutral",
      details: "Stable YoY"
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setShowResults(false);
    setCurrentQuery(query);
    
    setTimeout(() => {
      const newSummary: QuerySummary = {
        query,
        timestamp: new Date().toLocaleString()
      };
      
      setSummaries([newSummary, ...summaries]);
      setQuery('');
      setIsLoading(false);
      setShowResults(true);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <QueryResult isVisible={showResults} metrics={metrics} query={currentQuery} />

      <div className="mt-auto">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <div className="relative">
                <input
                  type="text"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-12"
                  placeholder="Ask about Q3 2024 financial metrics..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;