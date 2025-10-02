# 🚀 Deployment Guide - Nexus Admin Dashboard

This guide will help you deploy your Nexus Admin Dashboard to various platforms. The recommended approach is **Vercel** for its seamless Next.js integration.

## 📋 Prerequisites

- ✅ Code pushed to GitHub repository
- ✅ Node.js 18+ installed locally
- ✅ Project builds successfully (`npm run build`)

## 🎯 Recommended: Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure the project:**
   - Framework Preset: **Next.js**
   - Root Directory: `./` (or your project root)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. **Set Environment Variables:**
   ```
   NEXTAUTH_URL=https://your-app-name.vercel.app
   NEXTAUTH_SECRET=your-super-secret-key-min-32-chars
   DATABASE_URL=your-database-url
   ```

6. **Click "Deploy"**

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from your project directory
vercel

# Follow the prompts:
# - Link to existing project? N
# - What's your project's name? nexus-dashboard
# - In which directory is your code located? ./
# - Want to override the settings? N

# Set environment variables
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET
vercel env add DATABASE_URL

# Deploy to production
vercel --prod
```

## 🗄️ Database Setup for Production

### Option 1: Vercel Postgres (Recommended)

1. **Go to your Vercel project dashboard**
2. **Navigate to "Storage" tab**
3. **Click "Create Database" → "Postgres"**
4. **Copy the connection string**
5. **Update your environment variables:**
   ```
   DATABASE_URL=postgresql://username:password@host:port/database
   ```

### Option 2: Supabase (Free Alternative)

1. **Go to [Supabase](https://supabase.com)**
2. **Create new project**
3. **Go to Settings → Database**
4. **Copy the connection string**
5. **Update DATABASE_URL in Vercel**

### Option 3: PlanetScale (MySQL)

1. **Go to [PlanetScale](https://planetscale.com)**
2. **Create new database**
3. **Get connection string**
4. **Update your Prisma schema to use MySQL:**
   ```prisma
   datasource db {
     provider = "mysql"
     url      = env("DATABASE_URL")
   }
   ```

## 🔧 Environment Variables Setup

Create these environment variables in your deployment platform:

### Required Variables:
```bash
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-super-secret-key-minimum-32-characters
DATABASE_URL=your-database-connection-string
```

### Optional Variables:
```bash
BASEPATH=""  # If deploying to a subdirectory
GOOGLE_CLIENT_ID=your-google-oauth-id
GOOGLE_CLIENT_SECRET=your-google-oauth-secret
GITHUB_CLIENT_ID=your-github-oauth-id
GITHUB_CLIENT_SECRET=your-github-oauth-secret
```

## 🔄 Database Migration for Production

After setting up your production database:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to production database
npx prisma db push

# Optional: Seed with initial data
npx prisma db seed
```

## 🌐 Alternative Deployment Options

### Deploy to Netlify

1. **Connect GitHub repository**
2. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
3. **Add environment variables**
4. **Deploy**

### Deploy to Railway

1. **Go to [Railway](https://railway.app)**
2. **Connect GitHub repository**
3. **Add environment variables**
4. **Deploy automatically**

### Deploy to DigitalOcean App Platform

1. **Create new app**
2. **Connect GitHub repository**
3. **Configure build settings**
4. **Add environment variables**
5. **Deploy**

## 🔍 Troubleshooting

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try building locally
npm run build
```

### Database Connection Issues

1. **Check DATABASE_URL format**
2. **Ensure database is accessible from deployment platform**
3. **Verify Prisma schema matches database**
4. **Run migrations: `npx prisma db push`**

### Authentication Issues

1. **Verify NEXTAUTH_URL matches your domain**
2. **Ensure NEXTAUTH_SECRET is set and secure**
3. **Check OAuth provider configurations**

## ✅ Post-Deployment Checklist

- [ ] App loads successfully
- [ ] Authentication works
- [ ] Database connections work
- [ ] All pages render correctly
- [ ] API routes respond properly
- [ ] Environment variables are set
- [ ] SSL certificate is active
- [ ] Custom domain configured (if needed)

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [NextAuth.js Deployment](https://next-auth.js.org/deployment)

## 🆘 Need Help?

If you encounter issues:

1. **Check the deployment logs**
2. **Verify all environment variables**
3. **Test the build locally first**
4. **Check database connectivity**
5. **Review the troubleshooting section above**

---

**🎉 Your Nexus Dashboard should now be live and accessible to the world!**
