import {NextResponse} from 'next/server';

export async function POST(request: Request) {
  try {
    const {firstName, lastName, email, password} = await request.json();

    const response = await fetch(`${process.env.BASE_URL}/auth/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {message: errorData.message},
        {status: response.status}
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({message: 'Internal Server Error'}, {status: 500});
  }
}
