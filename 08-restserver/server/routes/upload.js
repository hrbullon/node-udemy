const express = require('express');
const fileUpload = require('express-fileupload');

const fs = require('fs');
const path = require('path');

let Usuario = require('../models/usuario');
let Producto = require('../models/producto');

let app = express();

app.use(fileUpload());

app.put('/upload/:tipo/:id', (req, res) => {
    
    let id = req.params.id;
    let tipo = req.params.tipo;

    if (!req.files) {
        return res.status(400).json({
            ok:false,
            err:{
                menssage:'No ha seleccionado ningun archivo'
            }
        });
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    archivo = req.files.archivo;

    let tiposValidos = ['usuarios','productos'];

    if(tiposValidos.indexOf(tipo) < 0){
        return res.status(400).json({
            ok:false,
            message: `Las tipos permitidos son ${ tiposValidos.join(', ') }`         
        });
    }

    let mimeTypeValidos = ['image/gif','image/png','image/jpg','image/jpeg'];
    
    if(mimeTypeValidos.indexOf(archivo.mimetype) < 0){
        return res.status(400).json({
            ok:false,
            message: `Las formatos permitidos son ${ mimeTypeValidos.join(', ') }`         
        });
    }

    let extension = archivo.name.split('.')[1];
    let nombreArchivo = `${id}-${ new Date().getMilliseconds() }.${extension}`;

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, function(err) {
        if (err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(tipo == "usuarios"){
            imagenUsuario(id, res, nombreArchivo);
        }

        if(tipo == "productos"){
            imagenProducto(id, res, nombreArchivo);
        }

    });

});

function borrarArchivo(archivo, tipo){

    let pathArchivo = path.resolve(__dirname, `../../uploads/${tipo}/${archivo}`);
    if(fs.existsSync(pathArchivo)){
        fs.unlinkSync(pathArchivo);
    }
}

function imagenUsuario(id, res, nombreArchivo){
    
    Usuario.findById(id, (err, usuarioDB) => {

        if (err){
            
            borrarArchivo(nombreArchivo,'usuarios');
            
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if (!usuarioDB){
            
            borrarArchivo(nombreArchivo,'usuarios');
            
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Usuario no existe'
                }
            });
        }

        borrarArchivo(usuarioDB.img,'usuarios');

        usuarioDB.img = nombreArchivo;
        usuarioDB.save( (err, usuarioActualizado) =>{

            return res.json({
                ok:true,
                usuario:usuarioActualizado,
                img: nombreArchivo
            });
        });

    })
}

function imagenProducto(id, res, nombreArchivo){

    Producto.findById(id, (err, productoDB) => {

        if (err){
            
            borrarArchivo(nombreArchivo,'productos');
            
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if (!productoDB){
            
            borrarArchivo(nombreArchivo,'productos');
            
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Producto no existe'
                }
            });
        }

        borrarArchivo(productoDB.img,'productos');

        productoDB.img = nombreArchivo;
        productoDB.save( (err, productoActualizado) =>{

            return res.json({
                ok:true,
                producto:productoActualizado,
                img: nombreArchivo
            });
        });

    });
}

module.exports = app;