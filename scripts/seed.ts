import { prisma } from '../src/lib/db'

async function main() {
  console.log('🌱 Seeding database...')

  // Create demo users
  const demoWorker = await prisma.user.upsert({
    where: { id: 'demo-worker' },
    update: {},
    create: {
      id: 'demo-worker',
      name: 'Demo Worker',
      role: 'worker',
      teamId: 'demo-team',
    },
  })

  const demoManager = await prisma.user.upsert({
    where: { id: 'demo-manager' },
    update: {},
    create: {
      id: 'demo-manager',
      name: 'Demo Manager',
      role: 'manager',
      teamId: 'demo-team',
    },
  })

  console.log('✅ Created users:', { demoWorker: demoWorker.name, demoManager: demoManager.name })

  // Create sample reflections
  const reflections = await Promise.all([
    prisma.reflection.create({
      data: {
        userId: 'demo-worker',
        mood: 'high',
        note: 'Great focus today, completed the main feature',
      },
    }),
    prisma.reflection.create({
      data: {
        userId: 'demo-worker',
        mood: 'neutral',
        note: 'Steady progress, some interruptions',
      },
    }),
    prisma.reflection.create({
      data: {
        userId: 'demo-worker',
        mood: 'low',
        note: 'Feeling overwhelmed with meetings',
      },
    }),
  ])

  console.log('✅ Created reflections:', reflections.length)

  // Create sample frictions
  const frictions = await Promise.all([
    prisma.friction.create({
      data: {
        userId: 'demo-worker',
        tag: 'meetings',
      },
    }),
    prisma.friction.create({
      data: {
        userId: 'demo-worker',
        tag: 'unclear',
      },
    }),
    prisma.friction.create({
      data: {
        userId: 'demo-worker',
        tag: 'context',
      },
    }),
  ])

  console.log('✅ Created frictions:', frictions.length)

  // Create sample experiments
  const experiments = await Promise.all([
    prisma.experiment.create({
      data: {
        title: 'No-Meeting Mornings',
        status: 'proposed',
        rationale: 'Focus time in the morning leads to better productivity',
      },
    }),
    prisma.experiment.create({
      data: {
        title: 'Async Retrospectives',
        status: 'running',
        rationale: 'Reduce meeting fatigue while maintaining team alignment',
      },
    }),
  ])

  console.log('✅ Created experiments:', experiments.length)

  // Create sample override log
  const overrideLog = await prisma.overrideLog.create({
    data: {
      managerId: 'demo-manager',
      reason: 'Sprint priority shift due to client request',
    },
  })

  console.log('✅ Created override log:', overrideLog.id)

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
