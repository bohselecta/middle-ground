export type SlackClient = {
  postMessage: (channel: string, text: string) => Promise<void>
}

export function getSlack(): SlackClient {
  const token = process.env.SLACK_BOT_TOKEN
  const safeMode = process.env.SAFE_MODE === 'true'
  
  if (!token || token === 'mock' || safeMode) {
    return {
      postMessage: async (channel: string, text: string) => {
        console.log('[SLACK:mock]', { channel, text })
      }
    }
  }

  return {
    async postMessage(channel: string, text: string) {
      try {
        const response = await fetch('https://slack.com/api/chat.postMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ channel, text }),
        })

        if (!response.ok) {
          throw new Error(`Slack API error: ${response.status}`)
        }

        const result = await response.json()
        if (!result.ok) {
          throw new Error(`Slack API error: ${result.error}`)
        }
      } catch (error) {
        console.error('Failed to post to Slack:', error)
        throw error
      }
    }
  }
}
