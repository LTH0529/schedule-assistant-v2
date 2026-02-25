import { NextRequest } from 'next/server';
import Tesseract from 'tesseract.js';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const text = formData.get('text') as string | null;

    if (!file && !text) {
      return Response.json({ error: 'No input provided' }, { status: 400 });
    }

    let extractedText = '';
    
    // Handle text input
    if (text) {
      extractedText = text;
    }
    // Handle image input
    else if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Use Tesseract.js for OCR
      const { data: { text: ocrText } } = await Tesseract.recognize(
        uint8Array,
        'chi_sim+eng', // Chinese Simplified + English
        {
          logger: info => console.log(info),
          tessjs_create_pdf: '0',
        }
      );
      
      extractedText = ocrText;
    }

    // TODO: Add NLP parsing to extract structured events from text
    // For now, return the raw extracted text
    return Response.json({ 
      success: true, 
      extractedText,
      // Mock parsed events for demo
      events: [
        {
          id: '1',
          title: 'Meeting from parsed text',
          start: new Date(Date.now() + 3600000).toISOString(),
          end: new Date(Date.now() + 7200000).toISOString(),
          location: 'Online',
          description: extractedText.substring(0, 100) + '...'
        }
      ]
    });
  } catch (error) {
    console.error('Parse error:', error);
    return Response.json({ error: 'Failed to parse input' }, { status: 500 });
  }
}