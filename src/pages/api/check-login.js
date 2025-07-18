// Netlify-compatible authentication
// Store credentials as environment variables or hardcoded for simplicity
const validUsers = [
  { username: 'samira', password: '040391' },
  { username: 'oumaima', password: 'bouhya2025' },
  { username: 'nouhaila', password: 'metnani2025' }
];

export async function POST({ request }) {
  // Add CORS headers for Netlify
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  try {
    const { username, password } = await request.json();
    
    // Log for debugging (remove in production)
    console.log('Login attempt:', { username, password: '***' });
    
    // Validate input
    if (!username || !password) {
      return new Response(
        JSON.stringify({ success: false, error: 'Username and password required' }), 
        { status: 400, headers }
      );
    }
    
    // Check credentials
    const found = validUsers.some(user => 
      user.username === username && user.password === password
    );
    
    console.log('Authentication result:', found);
    
    if (found) {
      // In a real app, you'd generate a JWT token here
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Login successful',
          username: username
        }), 
        { 
          status: 200,
          headers
        }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid credentials' }), 
        { status: 401, headers }
      );
    }
  } catch (err) {
    console.error('Login error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Server error' }), 
      { status: 500, headers }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
