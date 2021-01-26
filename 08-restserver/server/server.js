require('./config/config');

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

//Parse application/json
app.use(bodyParser.json());

//Habilitar index
app.use(express.static( path.resolve(__dirname, '../public')));

//Routes
app.use( require('./routes/index') );

const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
};

mongoose.connect(process.env.URL_DB, opts, (err) => {
    
    if( err ) throw err;
    console.log('Base de datos ONLINE');

});


app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto', process.env.PORT);
});