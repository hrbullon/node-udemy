const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');
const _ = require('underscore');

let app = express(); 

let Producto = require('../models/producto');

//=================================
// Obtener productos
//=================================

app.get('/producto', verificaToken, (req, res) => {
    
    let desde = Number(req.query.desde) || 0;
    let termino = req.query.termino || "";
    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex, disponible: true})
    .skip(desde)
    .limit(5)
    .populate('categoria','descripcion')
    .populate('usuario','nombre email')
    .exec( (err, productos) => {
        
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        Producto.countDocuments({}, (err, total) => {
            return res.json({
                ok:true,
                productos,
                total
            });
        });

    });
});


//=================================
// Obtener producto por ID
//=================================

app.get('/producto/:id', (req, res) => {
    
    let id = req.params.id;

    Producto.findById( id )
        .populate('usuario','email nombre')
        .populate('categoria','descripcion')
        .exec( (err, productoDB) =>{
        
        if(err){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Petición inválida'
                }
            });
        }

        if(!productoDB){
            return res.status(404).json({
                ok:false,
                err:{
                    message:'Producto no encontrado'
                }
            });
        }

        res.json({
            ok:true,
            producto:productoDB
        });
    });
});

//=================================
// Crear un nuevo producto
//=================================

app.post('/producto', verificaToken, (req, res) => {
    
    let body = _.pick( req.body, ['nombre','precioUni','descripcion','categoria']);
    body.usuario = req.usuario._id;

    let producto = new Producto(body);
    producto.save( (err, productoDB) => {

        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.status(201).json({
            ok:true,
            producto:productoDB
        })
    })

});

//=================================
// Actualizar el producto
//=================================

app.put('/producto/:id', verificaToken, (req, res) => {
    
    let id = req.params.id;
    let body = _.pick( req.body, ['nombre','precioUni','descripcion','categoria']);

    Producto.findByIdAndUpdate( id, body, { new:true, runValidators: true}, (err, productoDB) => {
        
        if(err){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Petición inválida'
                }
            });
        }

        if(!productoDB){
            return res.status(404).json({
                ok:false,
                err:{
                    message:'Producto no encontrado'
                }
            });
        }

        res.json({
            ok:true,
            producto:productoDB
        })
    });
});

//=================================
// Borrar un producto
//=================================

app.delete('/producto/:id', verificaToken, (req, res) => {
    
    let id = req.params.id;
    let disponible = { disponible: false }

    Producto.findByIdAndUpdate( id, disponible, { new: true }, (err, productoDB) => {
        
        if (err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        if(!productoDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message: 'Error, producto no existe'
                }
            })
        }

        res.json({
           ok:true,
           producto:productoDB 
        });

    });
});

module.exports = app;

