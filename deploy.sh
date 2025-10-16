#!/bin/bash

# Tablature Deployment Script
# This script helps deploy Tablature to Vercel with Neon integration

echo "🚀 Tablature Deployment Script"
echo "================================"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel:"
    vercel login
fi

echo "📦 Building project..."
pnpm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

echo "✅ Build successful!"

echo "🌐 Deploying to Vercel..."
vercel --prod

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your Vercel project dashboard"
echo "2. Navigate to 'Storage' tab"
echo "3. Click 'Create Database' → 'Neon'"
echo "4. Follow the one-click integration"
echo "5. Set environment variables:"
echo "   - SLACK_BOT_TOKEN"
echo "   - SLACK_SIGNING_SECRET" 
echo "   - SLACK_CHANNEL_ID"
echo "6. Run database migration:"
echo "   vercel env pull .env.local"
echo "   pnpm dlx prisma migrate deploy"
echo "   pnpm run seed"
echo ""
echo "🔗 Your app will be available at the Vercel URL shown above"
