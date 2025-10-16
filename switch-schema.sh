#!/bin/bash

# Schema switcher for Tablature
# Usage: ./switch-schema.sh [local|production]

MODE=${1:-local}

if [ "$MODE" = "local" ]; then
    echo "🔄 Switching to local development (SQLite)..."
    cp prisma/schema.local.prisma prisma/schema.prisma
    echo "✅ Switched to SQLite schema"
    echo "📝 Run 'pnpm dlx prisma generate' to update Prisma client"
elif [ "$MODE" = "production" ]; then
    echo "🔄 Switching to production (PostgreSQL)..."
    # Restore the PostgreSQL schema
    cat > prisma/schema.prisma << 'EOF'
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id          String       @id @default(cuid())
  name        String
  role        String       // 'worker' | 'manager'
  teamId      String?
  reflections Reflection[]
  frictions   Friction[]
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}

model Reflection {
  id        String   @id @default(cuid())
  userId    String
  date      DateTime @default(now())
  mood      String   // 'low' | 'neutral' | 'high'
  note      String?
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Friction {
  id        String   @id @default(cuid())
  userId    String
  date      DateTime @default(now())
  tag       String   // 'meetings' | 'unclear' | 'context' | 'tools' | 'fatigue'
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Experiment {
  id        String   @id @default(cuid())
  title     String
  status    String   @default("proposed") // 'proposed' | 'running' | 'done'
  start     DateTime?
  end       DateTime?
  rationale String?
  outcome   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model OverrideLog {
  id        String   @id @default(cuid())
  managerId String
  reason    String
  date      DateTime @default(now())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
EOF
    echo "✅ Switched to PostgreSQL schema"
    echo "📝 Run 'pnpm dlx prisma generate' to update Prisma client"
else
    echo "❌ Invalid mode. Use 'local' or 'production'"
    echo "Usage: ./switch-schema.sh [local|production]"
    exit 1
fi
