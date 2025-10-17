import { PrismaClient } from '@prisma/client'

export async function assertProjectMember(prisma: PrismaClient, userId: string, projectId: string) {
  const member = await prisma.project.findFirst({
    where: { 
      id: projectId, 
      OR: [
        { ownerId: userId }, 
        { team: { members: { some: { userId } } } }
      ] 
    },
    select: { id: true }
  })
  if (!member) throw new Error('FORBIDDEN')
}

