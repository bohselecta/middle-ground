import { NextResponse } from 'next/server'

// Placeholder: swap for real OAuth redirect to Slack
export async function POST(){
  return NextResponse.redirect(new URL('/integrations/slack/success', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'))
}
