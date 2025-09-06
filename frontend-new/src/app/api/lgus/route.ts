import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lgu`, {
      headers: {
        'Authorization': `Bearer ${request.cookies.get('token')?.value}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch LGUs from backend');
    }

    const lgus = await response.json();
    return NextResponse.json(lgus);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
