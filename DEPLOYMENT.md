# Tablature Environment Setup Guide

## 🚀 Quick Start

### 1. Local Development (SQLite)
```bash
# Copy environment template
cp env.example .env.local

# Install dependencies
pnpm install

# Generate Prisma client
pnpm dlx prisma generate

# Run database migrations
pnpm dlx prisma migrate dev --name init

# Seed the database
pnpm run seed

# Start development server
pnpm dev
```

### 2. Docker Development (PostgreSQL)
```bash
# Start with Docker Compose
docker-compose -f docker-compose.dev.yml up --build

# Or for production build
docker-compose up --build
```

### 3. Production Deployment

#### Vercel + Neon Integration
1. **Deploy to Vercel:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

2. **Connect Neon Database:**
   - Go to your Vercel project dashboard
   - Navigate to "Storage" tab
   - Click "Create Database" → "Neon"
   - Follow the one-click integration
   - Vercel will automatically set `DATABASE_URL`

3. **Set Environment Variables in Vercel:**
   ```
   NEXT_PUBLIC_APP_NAME=Tablature
   SLACK_BOT_TOKEN=your-slack-bot-token
   SLACK_SIGNING_SECRET=your-slack-signing-secret
   SLACK_CHANNEL_ID=your-channel-id
   SAFE_MODE=false
   ```

4. **Run Database Migration:**
   ```bash
   # After deployment, run migrations
   vercel env pull .env.local
   pnpm dlx prisma migrate deploy
   pnpm run seed
   ```

## 🔧 Environment Variables

### Required for Production
```bash
# Database (automatically set by Neon integration)
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# App Configuration
NEXT_PUBLIC_APP_NAME=Tablature

# Slack Integration
SLACK_BOT_TOKEN=xoxb-your-slack-bot-token
SLACK_SIGNING_SECRET=your-signing-secret
SLACK_CHANNEL_ID=C1234567890

# Optional
SAFE_MODE=false  # Set to true to disable Slack posting
```

### Development Only
```bash
# For local development with SQLite
DATABASE_URL="file:./dev.db"

# For Docker development
DATABASE_URL="postgresql://postgres:password@localhost:5432/tablature"
```

## 🐳 Docker Commands

### Development
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up --build

# View logs
docker-compose -f docker-compose.dev.yml logs -f app

# Stop services
docker-compose -f docker-compose.dev.yml down
```

### Production Testing
```bash
# Build and test production
docker-compose up --build

# Clean up
docker-compose down -v
```

## 🧪 Testing Checklist

### Local Testing
- [ ] App loads at http://localhost:3000
- [ ] All dashboard pages render
- [ ] Reflection logging works
- [ ] Friction reporting works
- [ ] Database operations succeed
- [ ] Slack integration logs to console

### Docker Testing
- [ ] PostgreSQL connection works
- [ ] Migrations run successfully
- [ ] Seed data loads
- [ ] Hot reload works in dev mode
- [ ] Production build works

### Production Testing
- [ ] Vercel deployment succeeds
- [ ] Neon database connects
- [ ] Environment variables are set
- [ ] All API endpoints work
- [ ] Slack integration posts messages

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Errors:**
   ```bash
   # Check if database is running
   docker-compose ps
   
   # Reset database
   docker-compose down -v
   docker-compose up --build
   ```

2. **Prisma Client Errors:**
   ```bash
   # Regenerate Prisma client
   pnpm dlx prisma generate
   ```

3. **Migration Errors:**
   ```bash
   # Reset migrations
   rm -rf prisma/migrations
   pnpm dlx prisma migrate dev --name init
   ```

4. **Build Errors:**
   ```bash
   # Clean and rebuild
   rm -rf .next node_modules
   pnpm install
   pnpm run build
   ```

## 📋 Pre-Deployment Checklist

- [ ] Next.js config warning fixed
- [ ] All TypeScript errors resolved
- [ ] ESLint passes without errors
- [ ] Production build succeeds
- [ ] Docker containers build successfully
- [ ] Database migrations work
- [ ] Environment variables configured
- [ ] Slack integration tested
- [ ] All pages load correctly
- [ ] API endpoints respond properly
