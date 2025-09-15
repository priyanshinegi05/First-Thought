# First Thought - Render Deployment Guide

## 🚀 Quick Deploy to Render

### Step 1: Prepare Your Repository
1. Push your code to GitHub (if not already done)
2. Make sure your backend folder contains all necessary files

### Step 2: Deploy to Render
1. Go to https://render.com
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Select your repository

### Step 3: Configure the Service
- **Name**: `firstthought-backend`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)
- **Root Directory**: `backend`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start`

### Step 4: Environment Variables
Add these environment variables in Render dashboard:

```
NODE_ENV=production
TOKEN_SECRET=your-super-secret-jwt-key-minimum-32-characters
DATABASE_URL=postgresql://neondb_owner:npg_niW0Bc9bZIam@ep-dawn-recipe-a19lcwot-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
EMAIL_USER=firstthought.platform@gmail.com
EMAIL_PASS=jwsa zjzq yyto mqta
FRONTEND_SERVER_PROD=https://first-thought.netlify.app
FRONTEND_URL=https://first-thought.netlify.app
```

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note your backend URL (e.g., `https://firstthought-backend.onrender.com`)

### Step 6: Update Frontend
After getting your backend URL, update the frontend:

1. Go to your frontend directory
2. Set the backend URL:
   ```bash
   $env:VITE_BACKEND_SERVER_PROD="https://your-backend-url.onrender.com"
   npm run build
   netlify deploy --prod --dir=dist
   ```

## 🔧 Troubleshooting

### Common Issues:
1. **Build fails**: Check that all dependencies are in package.json
2. **Database connection**: Verify DATABASE_URL is correct
3. **CORS errors**: Make sure FRONTEND_SERVER_PROD matches your frontend URL exactly

### Logs:
- Check Render dashboard → Your service → Logs
- Check Netlify dashboard → Your site → Deploys → Build logs

## 📋 Current Status:
- ✅ Frontend: https://first-thought.netlify.app
- ⏳ Backend: Ready for Render deployment
- ✅ Database: Neon PostgreSQL configured
- ✅ Environment: All variables prepared
