import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Secure with secret token - set this in your environment variables
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  // Verify secret token
  const secret = request.nextUrl.searchParams.get('secret');
  
  if (!REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'Revalidation secret not configured' },
      { status: 500 }
    );
  }

  if (secret !== REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret token' },
      { status: 401 }
    );
  }

  try {
    // Revalidate home page (where books are listed)
    revalidatePath('/');
    
    // Revalidate all dynamic book pages
    revalidatePath('/book/[id]', 'page');
    
    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      message: 'Successfully revalidated book catalog',
    });
  } catch (err) {
    console.error('Error revalidating:', err);
    return NextResponse.json(
      {
        message: 'Error revalidating',
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint for testing (remove in production or add auth)
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Revalidation API - Use POST with secret parameter',
    usage: 'POST /api/revalidate?secret=your-secret-token',
  });
}
