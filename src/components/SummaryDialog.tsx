import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';

interface FileStatus {
  name: string;
  size: string;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

interface SummaryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  files: FileStatus[];
}

const SummaryDialog: React.FC<SummaryDialogProps> = ({ isOpen, onClose, files }) => {
  const [isSummarizing, setIsSummarizing] = useState(false);

  if (!isOpen) return null;

  const staticFiles = [
    {
      name: 'third-quarter-2024-financial-result.pdf',
      size: '2.5 MB',
      status: 'completed' as const
    },
    {
      name: 'market-analysis-2024.pdf',
      size: '1.8 MB',
      status: 'completed' as const
    },
    {
      name: 'competitor-insights-q3.pdf',
      size: '3.2 MB',
      status: 'completed' as const
    }
  ];

  const allFiles = [...files, ...staticFiles];

  const handleSummarize = () => {
    setIsSummarizing(true);
    // Simulate summarization process
    setTimeout(() => {
      setIsSummarizing(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 pt-6 pb-4">
            <h3 className="text-lg font-medium text-gray-900">File Summary</h3>
            <div className="mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allFiles.map((file, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {file.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          file.status === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : file.status === 'error'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 flex justify-end">
            <button
              type="button"
              onClick={handleSummarize}
              disabled={isSummarizing || allFiles.some(f => f.status === 'uploading')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSummarizing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Summarizing...
                </>
              ) : (
                'Summarize Files'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryDialog;