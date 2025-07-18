# Netlify Authentication Troubleshooting

## The Problem
You deployed to Netlify but the login authentication is not working.

## Root Cause
The issue is likely that Astro API routes need to be properly configured for Netlify Functions.

## What I Fixed

### 1. Enhanced API Route (`src/pages/api/check-login.js`)
- Added proper CORS headers for Netlify
- Added OPTIONS handler for CORS preflight
- Added better error handling and logging
- Made it more robust for serverless environments

### 2. Fixed `netlify.toml` Configuration
- Removed incorrect API redirects (they're handled by Astro automatically)
- Kept only necessary redirects for client-side routing
- Maintained security headers

### 3. Added Debugging
- Console logs to help identify where the issue occurs
- Better error messages

## How to Test

### Option 1: Test API Endpoint Directly
1. Go to your Netlify site
2. Open browser developer tools (F12)
3. Go to Console tab
4. Run this command (replace `YOUR_SITE_URL` with your actual Netlify URL):

```javascript
fetch('https://YOUR_SITE_URL/api/check-login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username: 'samira', password: '040391' }),
})
.then(response => response.json())
.then(data => console.log('API Response:', data))
.catch(error => console.error('API Error:', error));
```

### Option 2: Check Netlify Functions Dashboard
1. Go to your Netlify dashboard
2. Click on your site
3. Go to the "Functions" tab
4. You should see a function called `check-login`
5. Click on it to see logs and test it

### Option 3: Test with curl
```bash
curl -X POST https://YOUR_SITE_URL/api/check-login \
     -H 'Content-Type: application/json' \
     -d '{"username":"samira","password":"040391"}'
```

## Expected Behavior
- If working: You should get `{"success":true,"message":"Login successful","username":"samira"}`
- If not working: You'll get an error or the function won't be found

## Common Issues and Solutions

### Issue 1: Function Not Found (404)
**Symptoms:** API returns 404 error
**Solution:** 
- Check that your `astro.config.mjs` has `output: 'server'` and `adapter: netlify()`
- Redeploy your site

### Issue 2: Function Exists but Errors
**Symptoms:** Function exists in dashboard but returns errors
**Solution:**
- Check the function logs in Netlify dashboard
- Look for JavaScript errors in the logs

### Issue 3: CORS Errors
**Symptoms:** Browser shows CORS-related errors
**Solution:**
- The updated API route includes CORS headers
- Make sure you're testing from the same domain

## Next Steps

1. **Deploy the fixes:**
   ```bash
   git add .
   git commit -m "Fix Netlify authentication and API routing"
   git push
   ```

2. **Wait for deployment** (usually 1-2 minutes)

3. **Test using one of the methods above**

4. **If still not working:**
   - Check Netlify build logs for errors
   - Check the Functions tab in Netlify dashboard
   - Try the direct API test in browser console

## Test Credentials
- Username: `samira`, Password: `040391`
- Username: `oumaima`, Password: `bouhya2025`
- Username: `nouhaila`, Password: `metnani2025`

## Important Notes
- The API route will be automatically converted to a Netlify Function
- Functions may take a few seconds to "warm up" on first request
- Check the Netlify Functions dashboard to confirm the function deployed correctly
