const express = require('express');
const { mongo, default: mongoose } = require('mongoose');
const app = express();
var path = require('path');
require('dotenv').config();
const connectDB = require('./config/connection');
var hbs = require('express-handlebars');
const db = process.env.MONGO_URI;
const { layoutsDir, partialsDir } = require('express-hbs');
const bcrypt = require('bcrypt')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs.engine({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialDir:__dirname+'views/partials/'}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const User = require('./models/models')

app.get('/',(req,res)=>{
    res.send('<H1>Shopping App</H1>')
})
app.get('/signup', (req,res)=>{
    // res.send('<H1>Signup Page</H1>')
    res.render('user/signup')
})

app.post('/submit',async (req,res)=>{
    req.body.pw = await bcrypt.hash(req.body.pw,10)
    User.create(req.body)
    res.render('user/homepage')
})

app.get('/login',(req,res)=>{
    res.render('user/login')
})
app.post('/loginsubmit',async (req,res)=>{
    try {
        const hi = await User.findOne({ email: req.body.email })
        if(hi.pw === req.body.pw){  
            console.log('login success');
        }else{
            console.log('login failed');
        }
    } catch (error) {
        console.log(error);
    }
})

const start = async ()=>{
    try {
        await connectDB(db)
        app.listen(3000 , ()=>{
            console.log('connected to port 3000');
        })
    } catch (error) {
        console.log(error);
    }
}

start();

