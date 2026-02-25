import { NextRequest } from 'next/server';

// This route is handled by the main auth route
// It just needs to exist for the OAuth redirect

export async function GET(request: NextRequest) {
  // The actual token exchange happens in the main auth route
  return new Response('Authorization in progress...', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' }
  });
}