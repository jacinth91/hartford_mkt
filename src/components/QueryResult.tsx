import React from 'react';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface FinancialMetric {
  category: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  details?: string;
}

interface QueryResultProps {
  isVisible: boolean;
  metrics: FinancialMetric[];
  query?: string;
}

const QueryResult: React.FC<QueryResultProps> = ({ isVisible, metrics, query }) => {
  if (!isVisible) return null;

  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
      {query && (
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Query:</span> {query}
          </p>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trend
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {metrics.map((metric, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                  {metric.category}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {metric.value}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    {getTrendIcon(metric.trend)}
                  </div>
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {metric.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QueryResult;