import { NextRequest, NextResponse } from 'next/server';
import api from '@/lib/api';

export async function POST(request: NextRequest) {
  try {
    const { message, userId } = await request.json();

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }
    
    const { data } = await api.post('/chat', {
      message: message.trim(),
      userId
    });

    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Unable to process your message. Please try again later.' 
      },
      { status: 500 }
    );
  }
}