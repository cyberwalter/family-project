const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Sample data (in place of a real database)
const familyData = {
  familyMembers: [
    { username: 'family', password: 'password', role: 'member' },
    { username: 'tenant', password: 'tenantpass', role: 'tenant' },
  ],
  rentShares: [
    { name: 'John Doe', share: '30%' },
    { name: 'Jane Doe', share: '20%' },
    { name: 'Tenant 1', share: '50%' },
  ],
  updates: [
    { date: '2024-11-01', text: 'House maintenance completed.' },
    { date: '2024-11-10', text: 'Tenant rent payment due on the 15th.' },
  ],
};

// API to check login credentials
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = familyData.familyMembers.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    res.status(200).json({ message: 'Login successful', role: user.role });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// API to fetch rent shares
app.get('/rent-shares', (req, res) => {
  res.status(200).json(familyData.rentShares);
});

// API to fetch updates
app.get('/updates', (req, res) => {
  res.status(200).json(familyData.updates);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
