const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 4322;

app.use(cors());
app.use(express.json());

app.post('/api/check-login', (req, res) => {
  const { username, password } = req.body;
  const credPath = path.join(__dirname, '../credentials.txt');
  try {
    const data = fs.readFileSync(credPath, 'utf8');
    const lines = data.split('\n');
    const found = lines.some(line => {
      const [user, pass] = line.split(',');
      return user === username && pass === password;
    });
    if (found) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
