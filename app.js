const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('assets'));

app.set('view engine', 'ejs');

const web = require('./routes/web');
app.use('/',web);

app.listen(port,()=>{
    console.log('listening on port 3000');
});