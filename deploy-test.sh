#!/bin/bash

# Deployment verification script for Netlify

echo "🔍 Verifying Netlify deployment..."

# Check if the API endpoint is accessible
echo "Testing API endpoint..."

# You can test this on your deployed site
# Replace YOUR_NETLIFY_URL with your actual Netlify URL
NETLIFY_URL="https://your-site-name.netlify.app"

echo "📝 Manual test commands:"
echo "1. Test API endpoint directly:"
echo "   curl -X POST ${NETLIFY_URL}/api/check-login \\"
echo "        -H 'Content-Type: application/json' \\"
echo "        -d '{\"username\":\"samira\",\"password\":\"040391\"}'"
echo ""
echo "2. Check Netlify Functions logs:"
echo "   - Go to your Netlify dashboard"
echo "   - Click on your site"
echo "   - Go to 'Functions' tab"
echo "   - Check if 'check-login' function is deployed"
echo ""
echo "3. If API still doesn't work, check the build logs:"
echo "   - In Netlify dashboard, go to 'Deploys'"
echo "   - Click on the latest deploy"
echo "   - Check the build logs for any errors"
echo ""
echo "🏗️ Building for production..."
npm run build

echo "✅ Build complete. Ready for deployment!"
echo ""
echo "🚀 Next steps:"
echo "1. Commit these changes:"
echo "   git add ."
echo "   git commit -m 'Fix Netlify authentication and API routing'"
echo "   git push"
echo ""
echo "2. Deploy to Netlify (if auto-deploy is enabled, it will deploy automatically)"
echo ""
echo "3. Test the login on your live site"
echo ""
echo "📋 Test credentials:"
echo "   Username: samira, Password: 040391"
echo "   Username: oumaima, Password: bouhya2025"
echo "   Username: nouhaila, Password: metnani2025"
