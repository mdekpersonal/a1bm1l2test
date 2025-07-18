import fs from 'fs';

export async function post({ request }) {
  const { username, password } = await request.json();
  const credPath = './credentials.txt';
  try {
    const data = fs.readFileSync(credPath, 'utf8');
    const lines = data.split('\n');
    const found = lines.some(line => {
      const [user, pass] = line.split(',');
      return user === username && pass === password;
    });
    if (found) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false }), { status: 401 });
    }
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), { status: 500 });
  }
}
