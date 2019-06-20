const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'juan',
    password: '1111',
    database: 'smart-brain'
  }
});


const app = express();

app.use(bodyparser.json());
app.use(cors());



// testing for working 
app.get('/', (req, res) => { res.send(database.users) });

// signin
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

// register
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

// get id with request.params
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

// image
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

 
app.listen(3001, () => {
  console.log("app is running on port 3001");
});





/*
    Skeleton for website routes
    /                --> res  = this is working
    /signin          --> POST =  success/fail (post because of sending pass inside object)
    /register        --> POST = new user object
    /profile/:userid --> GET = user object
    /image           --> PUT = updated user object

*/


