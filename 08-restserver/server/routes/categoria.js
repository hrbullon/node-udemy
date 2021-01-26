const express = require('express');

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion'); 

let app = express();

let Categoria = require('../models/categoria');

/*****Devuelve todas las categorias *****/
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec( (err, categorias) => {
            if(err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
    
            Categoria.countDocuments({}, (err, total) => {
                
                return res.json({
                    ok:true,
                    categorias,
                    total
                });
            });
        
            
        })
});

/*****Devuelve una categoria especifica por su ID ******/
app.get('/categoria/:id', verificaToken, (req, res) => {
    
    let id = req.params.id;

    Categoria.findById( id, (err, categoriaDB) => {

        if(err){
            return res.status(400).json({
                ok:false,
                err:{
                    message: 'Peticion inválida'
                }
            });
        }

        if(!categoriaDB){
            return res.status(404).json({
                ok:false,
                err:{
                    message:'Categoria no encontrada'
                }
            });
        }

        res.json({
            ok:true,
            categoria:categoriaDB
        });

    });

});

/*****Crea una nueva categoria *******/
app.post('/categoria', verificaToken ,(req, res) => {
    
    let body = req.body

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save( (err, categoriaDB) => {
        
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            categoria:categoriaDB
        });
    });
});

/*****Actualiza el nombre de una categoria *****/
app.put('/categoria/:id', (req, res) => {
    
    let id = req.params.id;
    let body = req.body;

    let data = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate( id, data, { new: true, runValidators: true }, (err, categoriaDB) => {
        
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            categoria: categoriaDB
        });

    });

});

/*****Elimina una categoria *****/
app.delete('/categoria/:id', [ verificaToken, verificaAdmin_Role ], (req, res) => {
    
    let id = req.params.id;

    Categoria.findByIdAndDelete(id, (err, categoriaDB) => {
        
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'El ID no existe'
                }
            });
        }

        res.json({
            ok:true,
            categoria
        });
    })
});

module.exports = app;