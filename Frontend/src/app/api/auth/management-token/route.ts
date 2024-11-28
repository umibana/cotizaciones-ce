import { NextResponse } from 'next/server';

export async function GET() {
    try {


        const params = new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.NEXT_PUBLIC_AUTH0_MANAGEMENT_CLIENT_ID!,
            client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET!,
            audience: `${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/`
        });

        const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN!.startsWith('https://')
            ? process.env.NEXT_PUBLIC_AUTH0_DOMAIN
            : `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}`;


        const response = await fetch(`${domain}/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: params.toString(),
            cache: 'no-store'
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Auth0 token error response:', error);
            return NextResponse.json(error, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json({ access_token: data.access_token });
    } catch (error) {
        console.error('Management token error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to get management token' },
            { status: 500 }
        );
    }
}