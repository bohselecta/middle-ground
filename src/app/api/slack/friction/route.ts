import { NextResponse } from 'next/server'
import { getSlack } from '@/lib/slack'
import { z } from 'zod'

const frictionSlackSchema = z.object({
  userId: z.string(),
  tag: z.enum(['meetings', 'unclear', 'context', 'tools', 'fatigue']),
})

export async function POST(req: Request) {
  try {
    const { userId, tag } = frictionSlackSchema.parse(await req.json())
    
    const text = `:guitar: Friction logged by ${userId}: *${tag}*`
    const channel = process.env.SLACK_CHANNEL_ID || 'general'
    
    await getSlack().postMessage(channel, text)
    
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error posting friction to Slack:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to post to Slack' }, { status: 500 })
  }
}
