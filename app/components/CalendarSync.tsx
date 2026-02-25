'use client';

interface CalendarSyncProps {
  events: any[];
}

export function CalendarSync({ events }: CalendarSyncProps) {
  const handleSync = async () => {
    // TODO: Implement Google Calendar sync
    console.log('Syncing events to Google Calendar:', events);
    alert('Google Calendar sync functionality will be implemented next!');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Sync to Google Calendar</h2>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-700">
            You have <span className="font-medium">{events.length}</span> event{events.length !== 1 ? 's' : ''} ready to sync.
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Events will be added to your primary Google Calendar.
          </p>
        </div>
        
        <button
          onClick={handleSync}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Sync to Google Calendar
        </button>
      </div>
    </div>
  );
}