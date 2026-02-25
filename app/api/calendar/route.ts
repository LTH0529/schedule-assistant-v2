import { google } from 'googleapis';
import { NextRequest } from 'next/server';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  throw new Error('Google OAuth credentials not configured');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { events, accessToken } = body;
    
    if (!accessToken) {
      return Response.json({ error: 'No access token provided' }, { status: 401 });
    }
    
    // Initialize Google Calendar API client
    const auth = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
    auth.setCredentials({ access_token: accessToken });
    
    const calendar = google.calendar({ version: 'v3', auth });
    
    const createdEvents = [];
    
    for (const event of events) {
      const response = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: {
          summary: event.title,
          location: event.location,
          description: event.description,
          start: {
            dateTime: event.start,
            timeZone: 'Asia/Shanghai', // Adjust as needed
          },
          end: {
            dateTime: event.end,
            timeZone: 'Asia/Shanghai',
          },
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 24 * 60 },
              { method: 'popup', minutes: 15 },
            ],
          },
        },
      });
      
      createdEvents.push(response.data);
    }
    
    return Response.json({ 
      success: true, 
      message: `${createdEvents.length} events added to your calendar`,
      events: createdEvents
    });
  } catch (error) {
    console.error('Calendar API error:', error);
    return Response.json({ error: 'Failed to sync events to calendar' }, { status: 500 });
  }
}