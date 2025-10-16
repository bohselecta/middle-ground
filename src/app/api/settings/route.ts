import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/auth"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 })
  }
  
  const body = await req.json() as { 
    shareTrends?: boolean
    safeMode?: boolean 
  }

  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: { 
      ...(typeof body.shareTrends === "boolean" ? { shareTrends: body.shareTrends } : {}),
      ...(typeof body.safeMode === "boolean" ? { safeMode: body.safeMode } : {}),
    },
  })
  
  return NextResponse.json({ 
    ok: true, 
    user: { 
      shareTrends: user.shareTrends, 
      safeMode: user.safeMode 
    } 
  })
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 })
  }
  
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { shareTrends: true, safeMode: true, role: true }
  })
  
  return NextResponse.json({ user })
}
