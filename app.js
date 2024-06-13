const express = require('express');
const app = express();
const port = 3000;

//connect flash and sessions
const session = require('express-session')
const flash = require('connect-flash');
//messages
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  }))
//Flash messages
app.use(flash());

// cookies
const cookieparser = require('cookie-parser')
app.use(cookieparser())

// To upload image
const fileUpload = require('express-fileupload')
//Tempfiles uploaderz
app.use(fileUpload({useTempFiles:true}))

//To get data as Object
app.use(express.urlencoded({extended:false}))

const connectDb = require('./db/dbcon.js');
connectDb();

app.use(express.static('assets'));

app.set('view engine', 'ejs');

const web = require('./routes/web');
app.use('/',web);



app.listen(port,()=>{
    console.log('listening on port 3000');
});







