const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'QazWellDone1',
		database: 'smart_brain_database'
	}
});





app.use(express.json());

app.use(cors())

app.get('/',(req,res)=>{ res.send('it is working')})

app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)})
app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)})
app.put('/image', (req,res) => {image.handleImagePut(req,res,db)})
app.post('/imageURL', (req,res) => {image.handleApiCall(req,res,db)})

app.listen(process.env.PORT || 8080, ()=>{
	console.log(`App is running on port ${process.env.PORT}`)
})

