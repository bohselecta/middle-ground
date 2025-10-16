import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export async function POST(){
  const session = await auth()
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const uid = session.user.id

  try {
    // Check if user already has a team
    const existing = await prisma.teamMember.findFirst({ 
      where: { userId: uid } 
    })
    
    if (!existing){
      // Create team
      const team = await prisma.team.create({ 
        data: { name: 'My Team' } 
      })
      
      // Add user as owner
      await prisma.teamMember.create({ 
        data: { 
          teamId: team.id, 
          userId: uid, 
          role: 'owner' 
        } 
      })
    }

    // Seed starter data (check if already exists to avoid duplicates)
    const existingReflections = await prisma.reflection.count({ 
      where: { userId: uid } 
    })
    
    if (existingReflections === 0) {
      await prisma.reflection.createMany({ 
        data: [
          { userId: uid, mood: 'neutral', note: 'Getting started with Tablature' },
          { userId: uid, mood: 'high', note: 'Great to have a clear view of patterns' },
        ]
      })
      
      await prisma.friction.create({ 
        data: { userId: uid, tag: 'meetings' } 
      })
      
      await prisma.experiment.create({ 
        data: { 
          title: 'Focus mornings', 
          rationale: 'Reduce meeting load before 11am', 
          status: 'proposed' 
        } 
      })
    }

    // Redirect to dashboard
    return NextResponse.redirect(
      new URL('/my-flow', process.env.NEXTAUTH_URL || 'http://localhost:3000')
    )
  } catch (error) {
    console.error('Onboarding error:', error)
    return new NextResponse('Error setting up account', { status: 500 })
  }
}
