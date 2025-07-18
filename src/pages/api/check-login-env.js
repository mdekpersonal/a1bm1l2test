// More secure version using environment variables
// Set VALID_USERS environment variable in Netlify dashboard

export async function POST({ request }) {
  try {
    const { username, password } = await request.json();
    
    // Validate input
    if (!username || !password) {
      return new Response(
        JSON.stringify({ success: false, error: 'Username and password required' }), 
        { status: 400 }
      );
    }
    
    // Get credentials from environment variables or fallback to hardcoded
    const validUsersEnv = process.env.VALID_USERS || 'samira:040391,oumaima:bouhya2025,nouhaila:metnani2025';
    
    const validUsers = validUsersEnv.split(',').map(userPass => {
      const [user, pass] = userPass.split(':');
      return { username: user.trim(), password: pass.trim() };
    });
    
    // Check credentials
    const found = validUsers.some(user => 
      user.username === username && user.password === password
    );
    
    if (found) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Login successful',
          username: username
        }), 
        { 
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid credentials' }), 
        { status: 401 }
      );
    }
  } catch (err) {
    console.error('Login error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Server error' }), 
      { status: 500 }
    );
  }
}
