import React, { useState } from 'react';
import { Send, Loader2, TrendingUp } from 'lucide-react';
import QueryResult from './QueryResult';

interface QuerySummary {
  query: string;
  timestamp: string;
  tokens: number;
  category: string;
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
  const [summaries, setSummaries] = useState<QuerySummary[]>([
    {
      query: "What was the Q3 2024 revenue?",
      timestamp: "2024-03-15 10:30",
      tokens: 156,
      category: "Financial"
    },
    {
      query: "Compare net income with previous year",
      timestamp: "2024-03-15 10:25",
      tokens: 189,
      category: "Financial Analysis"
    },
    {
      query: "Explain the decline in net interest income",
      timestamp: "2024-03-15 10:20",
      tokens: 245,
      category: "Income Analysis"
    }
  ]);

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
      details: "Down 11% YoY, driven by higher funding costs"
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
        timestamp: new Date().toLocaleString(),
        tokens: Math.floor(Math.random() * 300) + 100,
        category: "Financial Analysis"
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

      <div className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-1 gap-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Financial Query History</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Analysis based on Q3 2024 Financial Results
                </p>
              </div>
              <TrendingUp className="h-6 w-6 text-blue-500" />
            </div>
            <div className="border-t border-gray-200">
              <div className="overflow-x-auto max-h-[calc(100vh-20rem)] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Query
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {summaries.map((summary, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="max-w-md break-words">
                            {summary.query}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex flex-col space-y-1">
                            <span>{summary.timestamp}</span>
                            <span>{summary.tokens} tokens</span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {summary.category}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="query" className="block text-sm font-medium text-gray-700">
                Ask about Q3 2024 Financial Results
              </label>
              <div className="mt-1 relative">
                <textarea
                  id="query"
                  rows={3}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-none"
                  placeholder="Example: What was the Q3 2024 revenue? How does it compare to previous year?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Ask questions about revenue, income, expenses, loans, deposits, or any other financial metrics.
              </p>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Send Query
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;