const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();

const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const Usuario = require('../models/usuario');

app.get('/usuario', verificaToken ,function (req, res) {
    
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;

    //El segundo parametro permite elegir los campos a mostrar 
    Usuario.find({ estado: true }, 'nombre email google img estado role')
    .skip(desde)
    .limit(limite)
    .exec( (err, usuarios ) => {
        if ( err ) {
            return res.status(400).json({
                ok:false
            });
        }

        Usuario.countDocuments({ estado: true }, (err, total) => {
            
            res.json({
                ok:true,
                usuarios,
                total
            });
        })

    })

});
 
app.post('/usuario', [verificaToken,verificaAdmin_Role], function (req, res) {
    
    let body = req.body;
    
    //Se crea el objeto a insertar
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        role: body.role
    })

    usuario.save((err, usuarioDB) => {

        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            usuario: usuarioDB
        });
    })

});

app.put('/usuario/:id', [verificaToken,verificaAdmin_Role], function (req, res) {
    
    let id = req.params.id;
    let body = _.pick( req.body, ['nombre','email','img','role','estado']);

    Usuario.findByIdAndUpdate( id, body, { new: true, runValidators: true}, (err, usuarioDB) => {
        
        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            usuario: usuarioDB
        });

    }); 

});

app.delete('/usuario/:id', [verificaToken,verificaAdmin_Role], function (req, res) {

    let id = req.params.id

    //Para un borrado fisico
    //Usuario.findByIdAndRemove( id, (err, usuarioBorrado) => {

    Usuario.findByIdAndUpdate( id, { estado: false }, { new: true }, (err, usuarioBorrado) => {
        
        if (err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        if(!usuarioBorrado){
            return res.status(400).json({
                ok:false,
                err:{
                    message: 'Error, usuario no existe'
                }
            })
        }

        res.json({
           ok:true,
           usuario:usuarioBorrado 
        });

    })
});

module.exports = app;