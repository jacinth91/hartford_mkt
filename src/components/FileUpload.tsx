import React, { useState, useRef } from 'react';
import { Upload, X, Check, Loader2, AlertCircle, FileText } from 'lucide-react';
import SummaryDialog from './SummaryDialog';

interface FileStatus {
  name: string;
  size: string;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

const FileUpload = () => {
  const [files, setFiles] = useState<FileStatus[]>([]);
  const [error, setError] = useState<string>('');
  const [showSummary, setShowSummary] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (selectedFiles: File[]): { valid: File[], errors: string[] } => {
    const errors: string[] = [];
    const valid: File[] = [];
    
    if (files.length + selectedFiles.length > 5) {
      errors.push('Maximum 5 files allowed');
      return { valid, errors };
    }

    selectedFiles.forEach(file => {
      const isTextFile = file.type.includes('text/');
      const isPdfFile = file.type === 'application/pdf';
      
      if (!isTextFile && !isPdfFile) {
        errors.push(`${file.name} is not a text or PDF file`);
      } else {
        valid.push(file);
      }
    });

    return { valid, errors };
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const { valid, errors } = validateFiles(selectedFiles);
      
      if (errors.length > 0) {
        setError(errors.join('. '));
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      handleFiles(valid);
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const fileStatuses: FileStatus[] = newFiles.map(file => ({
      name: file.name,
      size: formatFileSize(file.size),
      status: 'uploading'
    }));

    setFiles(prev => [...prev, ...fileStatuses]);

    // Simulate file upload
    fileStatuses.forEach((_, index) => {
      setTimeout(() => {
        setFiles(prev => {
          const updated = [...prev];
          const currentIndex = prev.length - fileStatuses.length + index;
          updated[currentIndex] = { ...updated[currentIndex], status: 'completed' };
          return updated;
        });
      }, 1000 + (index * 500));
    });

    // Show summary dialog after all files are processed
    setTimeout(() => {
      setShowSummary(true);
    }, 1000 + (fileStatuses.length * 500));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const remainingSlots = 5 - files.length;

  return (
    <>
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Upload Files</h3>
            <p className="mt-2 text-sm text-gray-500">
              Upload up to 5 text or PDF files
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Supported formats: .txt, .md, .pdf, .json, .csv, .log, .xml, .yaml, .yml
            </p>
            {remainingSlots > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                {remainingSlots} {remainingSlots === 1 ? 'slot' : 'slots'} remaining
              </p>
            )}
            <div className="mt-6">
              <input
                type="file"
                className="hidden"
                multiple
                accept=".txt,.md,.pdf,.json,.csv,.log,.xml,.yaml,.yml,text/*,application/pdf"
                onChange={handleFileInput}
                ref={fileInputRef}
              />
              <button
                onClick={openFileDialog}
                disabled={remainingSlots === 0}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Select Files
              </button>
            </div>
            
            {error && (
              <div className="mt-4 p-3 bg-red-50 rounded-md flex items-center gap-2 text-red-700">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>

          {files.length > 0 && (
            <div className="mt-8">
              <h4 className="text-sm font-medium text-gray-900">Uploaded Files</h4>
              <ul className="mt-3 divide-y divide-gray-200">
                {files.map((file, index) => (
                  <li key={index} className="py-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {file.name}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">{file.size}</span>
                    </div>
                    <div>
                      {file.status === 'uploading' && (
                        <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                      )}
                      {file.status === 'completed' && (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                      {file.status === 'error' && (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <SummaryDialog
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        files={files}
      />
    </>
  );
};

export default FileUpload;