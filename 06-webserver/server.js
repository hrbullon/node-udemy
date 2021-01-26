const express = require('express');
const app = express();

const hbs = require('hbs');
require('./hbs/helpers');
 
app.use( express.static ( __dirname + '/public'));

//Express HBS
hbs.registerPartials( __dirname + '/views/partials');
app.set('view engine', 'hbs');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('home',{
        titulo:'home page'
    });
});

app.get('/about', (req, res) => {
    res.render('about',{
        titulo:'About Page'
    });
});


app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});