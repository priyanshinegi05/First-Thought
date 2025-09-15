# First Thought - Render Deployment Helper
Write-Host "🚀 First Thought - Render Deployment Helper" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green

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

Write-Host "`n✅ Ready for deployment!" -ForegroundColor Green
