#!/bin/bash

# Nexus Dashboard Deployment Script
# This script helps you deploy your dashboard to Vercel

echo "🚀 Nexus Dashboard Deployment Helper"
echo "===================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo ""
echo "📋 Pre-deployment checklist:"
echo "✅ Code pushed to GitHub"
echo "✅ Build process tested locally"
echo "✅ Environment variables ready"
echo ""

# Test build locally first
echo "🔨 Testing local build..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix the errors before deploying."
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
echo "Please set these environment variables in Vercel:"
echo ""
echo "NEXTAUTH_URL=https://your-app-name.vercel.app"
echo "NEXTAUTH_SECRET=your-super-secret-key-min-32-chars"
echo "DATABASE_URL=your-postgresql-connection-string"
echo ""

# Login and deploy
vercel login
vercel

echo ""
echo "🎉 Deployment initiated!"
echo "📖 Check the deployment guide in DEPLOYMENT.md for detailed instructions."
echo "🔗 Don't forget to set up your production database!"
