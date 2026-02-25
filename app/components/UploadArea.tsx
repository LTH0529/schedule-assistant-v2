'use client';

import { useState, useRef } from 'react';

interface UploadAreaProps {
  onParse: (input: string | File) => void;
  isLoading: boolean;
}

export function UploadArea({ onParse, isLoading }: UploadAreaProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onParse(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onParse(e.target.files[0]);
    }
  };

  const handleTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get('text') as string;
    if (text.trim()) {
      onParse(text);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Add Schedule Information</h2>
      
      {/* Text Input */}
      <form onSubmit={handleTextSubmit} className="mb-6">
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
          Paste text or type your schedule details:
        </label>
        <textarea
          id="text"
          name="text"
          rows={4}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Example: Meeting with John tomorrow at 3pm for 1 hour..."
        />
        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Parse Text'}
        </button>
      </form>
      
      {/* File Upload */}
      <div
        className={`mt-4 border-2 border-dashed rounded-lg p-6 text-center ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        <p className="text-gray-600">
          Drag & drop a screenshot here, or{' '}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-blue-600 font-medium hover:text-blue-500"
          >
            browse files
          </button>
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Supported formats: PNG, JPG, GIF
        </p>
      </div>
    </div>
  );
}