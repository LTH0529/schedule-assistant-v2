# Schedule Assistant

A web app that helps you manage your schedule by parsing screenshots or text messages and syncing events to Google Calendar.

## Features

- Upload screenshots or paste text to extract schedule information
- Automatically parse dates, times, event titles, and locations
- Sync parsed events to Google Calendar with one click
- Edit and manage events before syncing
- Responsive design for mobile and desktop

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **OCR**: Tesseract.js (client-side) + Google Vision API (server-side fallback)
- **Calendar Integration**: Google Calendar API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- Google Cloud Project with Calendar API enabled

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```env
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
schedule-assistant/
├── app/
│   ├── api/                 # API routes
│   │   ├── auth/            # Google OAuth
│   │   ├── calendar/        # Calendar operations
│   │   └── parse/           # Text/OCR parsing
│   ├── components/          # React components
│   ├── lib/                 # Utility functions
│   └── page.tsx             # Main application page
├── public/                  # Static assets
└── README.md
```

## Future Enhancements

- iOS app using React Native
- Recurring event detection
- Natural language processing improvements
- Event conflict detection
- Email integration for meeting invites