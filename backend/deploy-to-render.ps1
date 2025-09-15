# First Thought - Render Deployment Script
# This script helps you prepare for Render deployment

Write-Host "🚀 First Thought - Render Deployment Helper" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Please run this script from the backend directory" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Found package.json" -ForegroundColor Green

# Check if .env exists
if (Test-Path "../.env") {
    Write-Host "✅ Found .env file" -ForegroundColor Green
} else {
    Write-Host "⚠️  Warning: .env file not found" -ForegroundColor Yellow
}

# Display environment variables that will be used
Write-Host "`n📋 Environment Variables for Render:" -ForegroundColor Cyan
Write-Host "NODE_ENV=production"
Write-Host "TOKEN_SECRET=your-super-secret-jwt-key-minimum-32-characters"
Write-Host "DATABASE_URL=postgresql://neondb_owner:npg_niW0Bc9bZIam@ep-dawn-recipe-a19lcwot-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
Write-Host "EMAIL_USER=firstthought.platform@gmail.com"
Write-Host "EMAIL_PASS=jwsa zjzq yyto mqta"
Write-Host "FRONTEND_SERVER_PROD=https://first-thought.netlify.app"
Write-Host "FRONTEND_URL=https://first-thought.netlify.app"

Write-Host "`n🔧 Render Configuration:" -ForegroundColor Cyan
Write-Host "Name: firstthought-backend"
Write-Host "Environment: Node"
Write-Host "Root Directory: backend"
Write-Host "Build Command: npm install && npm run build"
Write-Host "Start Command: npm run start"

Write-Host "`n📝 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Go to https://render.com"
Write-Host "2. Sign up/Login with GitHub"
Write-Host "3. Click 'New +' → 'Web Service'"
Write-Host "4. Connect your GitHub repository"
Write-Host "5. Use the configuration above"
Write-Host "6. Add the environment variables listed above"
Write-Host "7. Deploy!"

Write-Host "`n🌐 After deployment:" -ForegroundColor Yellow
Write-Host "1. Note your backend URL (e.g., https://firstthought-backend.onrender.com)"
Write-Host "2. Update frontend with: `$env:VITE_BACKEND_SERVER_PROD='YOUR_BACKEND_URL'"
Write-Host "3. Rebuild and redeploy frontend"

Write-Host "`n✅ Ready for deployment!" -ForegroundColor Green
