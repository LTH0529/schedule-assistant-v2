'use client';

import { useState } from 'react';
import { format } from 'date-fns';

interface EventPreviewProps {
  events: any[];
}

export function EventPreview({ events }: EventPreviewProps) {
  const [editedEvents, setEditedEvents] = useState(events);

  const handleEdit = (id: string, field: string, value: string) => {
    setEditedEvents(prev =>
      prev.map(event =>
        event.id === id ? { ...event, [field]: value } : event
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Parsed Events</h2>
      
      <div className="space-y-4">
        {editedEvents.map(event => (
          <div key={event.id} className="border border-gray-200 rounded-md p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={event.title}
                  onChange={e => handleEdit(event.id, 'title', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={event.location}
                  onChange={e => handleEdit(event.id, 'location', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Start</label>
                <input
                  type="datetime-local"
                  value={format(event.start, "yyyy-MM-dd'T'HH:mm")}
                  onChange={e => handleEdit(event.id, 'start', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">End</label>
                <input
                  type="datetime-local"
                  value={format(event.end, "yyyy-MM-dd'T'HH:mm")}
                  onChange={e => handleEdit(event.id, 'end', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={event.description}
                onChange={e => handleEdit(event.id, 'description', e.target.value)}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}