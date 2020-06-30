const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controller/register.js');
const signin = require('./controller/signin.js');
const profile = require('./controller/profile.js');
const image = require('./controller/image.js');
const Clarifai = require('clarifai');

const appImage = new Clarifai.App({apiKey: '6e0d007842fe431bbf3a8ee8e3480eb7'});


const postgres = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'smart-brains'
  }
});

console.log(postgres.select('*').from('users').then( data => {
	console.log(data);
}));


app.get('/', (req,res) =>{
	res.json ('The Home Of API');
} );

app.use(bodyParser.json()); //MIDDLEWARE TO USE JSON PARSER to automatically convert it into objects
app.use(cors());

app.post('/signin', signin.handledSignin(postgres,bcrypt));

app.post('/register',register.handledRegister(postgres,bcrypt));


app.get('/profile/:id', profile.handledProfileGet(postgres));

app.put('/image',image.handledImageEntries(postgres));
app.put('/imageURL',(req,res) => {

const {input} = req.body;

appImage.models.predict(Clarifai.FACE_DETECT_MODEL, input)
.then(response => {
	res.send(response);
})
.catch( err =>{
	console.log('UNABLE TO FETCH IMAGE API');
})
});


app.listen(process.env.PORT || 3000,()=>{
	console.log(`Application is listening at port ${process.env.PORT}`);
})

