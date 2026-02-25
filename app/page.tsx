'use client';

import { useState } from 'react';
import { UploadArea } from './components/UploadArea';
import { EventPreview } from './components/EventPreview';
import { CalendarSync } from './components/CalendarSync';

export default function Home() {
  const [parsedEvents, setParsedEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleParse = async (input: string | File) => {
    setIsLoading(true);
    // TODO: Implement parsing logic
    // This will call our API route to parse text or OCR images
    setTimeout(() => {
      setParsedEvents([
        {
          id: '1',
          title: 'Sample Meeting',
          start: new Date(),
          end: new Date(Date.now() + 3600000),
          location: 'Online',
          description: 'Parsed from your input'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Schedule Assistant</h1>
          <p className="mt-2 text-gray-600">
            Upload screenshots or paste text to extract and manage your schedule
          </p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <UploadArea onParse={handleParse} isLoading={isLoading} />
          </div>
          
          <div>
            {parsedEvents.length > 0 ? (
              <EventPreview events={parsedEvents} />
            ) : (
              <div className="bg-white rounded-lg shadow p-6 h-full flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  Upload a screenshot or paste text to get started
                </p>
              </div>
            )}
          </div>
        </div>
        
        {parsedEvents.length > 0 && (
          <div className="mt-8">
            <CalendarSync events={parsedEvents} />
          </div>
        )}
      </main>
    </div>
  );
}