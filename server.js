const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the "public" and "assets" folders
app.use(express.static('public'));
app.use('/assets', express.static('assets'));

// --- API ROUTES ---

// Registration Route (Replacing register.php)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/api/register', (req, res) => {
    const { fullname, email, password } = req.body;
    console.log(`New Registration: ${fullname} (${email})`);
    
    // Logic: In the future, save to a database here
    res.status(200).json({ message: "Registration successful! Please login." });
});

// Login Route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Direct answer to your login logic
    if (email === 'admin@harem.com.ph' && password === 'admin123') {
        res.json({ role: 'admin', redirect: '/schedule.html' });
    } else if (email === 'user@harem.com.ph' && password === 'user123') {
        res.json({ role: 'user', redirect: '/landingpage.html' });
    } else {
        res.status(401).json({ message: "Invalid Credentials" });
    }
});

app.listen(PORT, () => {
    console.log(`HaRem Inc. Portal running at http://localhost:${PORT}`);
});