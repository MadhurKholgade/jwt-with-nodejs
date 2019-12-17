const express = require("express");

const jwt = require("jsonwebtoken");

const app = express();

const port = 5000;

app.get('/app', (req, res) => {
    res.send('This route is working fine');
});

app.post('/app/login', (req, res) => {
    // Mock user
    const user = {
        id: 1, 
        username: 'madhur',
        email: 'madhur@gmail.com'
    }

    // pass required info to sign method and get token
    //jwt.sign({user: user}, 'secretkey', { expiresIn: '30s'}, (error, token) => {
    jwt.sign({user: user}, 'secretkey', (error, token) => {
        res.json({token: token});
    });
});

app.post('/app/user', verifyJWT , (req, res) => {
    // verify token before new post get created
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
          res.json({
            message: 'Post created...',
            authData: authData
          });
        }
      });
});

app.put('/app/user', verifyJWT , (req, res) => {
    // verify token before new post get created
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
          res.json({
            message: 'Data updated...',
            authData: authData
          });
        }
      });
});

app.delete('/app/user', verifyJWT , (req, res) => {
    // verify token before new post get created
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
          res.json({
            message: 'Data deleted...',
            authData: authData
          });
        }
      });
});

// TOKEN FORMAT
// Authorization: Bearer <access_token>

// Verify Token
function verifyJWT(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      console.log('Bearer: ', bearer)
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

app.listen(port, () => {
    console.log('Server is listening..');
});