const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	}
});


const app = express();



app.use(cors())
app.use(express.json());

app.get('/',(req,res)=>{ res.send('it is working')})

app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)})
app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)})
app.put('/image', (req,res) => {image.handleImagePut(req,res,db)})
app.post('/imageURL', (req,res) => {image.handleApiCall(req,res,db)})

app.listen(process.env.PORT || 8080, ()=>{
	console.log(`App is running on port ${process.env.PORT}`)
})

