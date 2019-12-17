const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/app', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

app.post('/app/posts', verifyToken, (req, res) => {
  // verify token before new post creation
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});


app.post('/app/login', (req, res) => {
  // Mock user
  const user = {
    id: 1, 
    username: 'madhur',
    email: 'madhur@gmail.com'
  }

  // Token creation using sign method
  // values of expiresIn: could be Eg: 60, "2 days", "10h", "7d".
  jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
    res.json({
      token
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

app.listen(5000, () => console.log('Server started on port 5000'));