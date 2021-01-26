const express = require('express');

let app = express();

const fs = require('fs');
const path = require('path');

const { verificaToken } = require('../middlewares/autenticacion');

app.get('/imagen/:tipo/:img', verificaToken, (req, res) => {
    
    let tipo = req.params.tipo;
    let img = req.params.img;

    let imagePath   = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
    let noImagePath = path.resolve(__dirname, `../assets/no-image.jpg`);

    if(fs.existsSync(imagePath)){
        res.sendFile(imagePath);
    }else{
        res.sendFile(noImagePath);
    }

});

module.exports = app;