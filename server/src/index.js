import { nanoid } from 'nanoid';
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:1999');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true'); 
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(cookieParser());

const userDetails = {
  email: 'ayooluwa@ay.com',
  password: 'password'
};

const generateToken = () => {
  return nanoid();
};

const tokens = new Map();

app.get('/verify-auth', (req, res) => {
  const token = req.cookies.auth_token;
  
  if (!token || !tokens.has(token)) {
    return res.status(200).json({ isAuthenticated: false });
  }

  return res.status(200).json({ 
    isAuthenticated: true,
    user: { email: userDetails.email }
  });
});

app.post('/login', (req, res) => { 
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' });
  }

  if (email === userDetails.email && password === userDetails.password) {
    const token = generateToken();
    tokens.set(token, { email });

    res.cookie('auth_token', token, { 
      httpOnly: true, 
      sameSite: 'strict', 
      domain: 'localhost',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000 
    });
    
    return res.json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
});

app.post('/logout', (req, res) => {
  const token = req.cookies.auth_token;
  if (token) {
    tokens.delete(token); 
  }
  
  res.clearCookie('auth_token', { 
    path: '/', 
    domain: 'localhost' 
  });
  
  return res.json({ message: 'Logout successful' });
});

app.get('/dashboard-data', (req, res) => {
  const token = req.cookies.auth_token;

  if (!token || !tokens.has(token)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return res.json({ message: 'This is the Dashboard data' });
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 