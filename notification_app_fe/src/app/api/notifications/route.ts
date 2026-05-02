import { NextResponse } from 'next/server'

// Handle CORS for all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
  'Content-Type': 'application/json',
}

const EXTERNAL_URL = 'http://20.207.122.201/evaluation-service/notifications'

export async function GET(req: Request) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: corsHeaders })
  }

  // Determine token: Authorization header or env var
  const authHeader = req.headers.get('authorization')
  let token = ''
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7)
  } else {
    token = process.env.NEXT_PUBLIC_EVAL_API_TOKEN || ''
  }

  const headers: Record<string, string> = {}
  if (token) headers['Authorization'] = `Bearer ${token}`

  try {
    const res = await fetch(EXTERNAL_URL, { headers })
    if (!res.ok) {
      return new NextResponse(
        JSON.stringify({ error: 'External API error', status: res.status }),
        { status: 500, headers: corsHeaders }
      )
    }
    const data = await res.json()
    const notifications = data?.notifications ?? []
    // Always return an object with notifications array to satisfy client expectations
    return NextResponse.json({ notifications }, { headers: corsHeaders })
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch from external API' }),
      { status: 500, headers: corsHeaders }
    )
  }
}
