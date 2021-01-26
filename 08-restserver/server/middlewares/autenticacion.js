const jwt = require("jsonwebtoken");

const verificaAdmin_Role = ( req, res, next ) => {

      let usuario = req.usuario

      if(usuario.role === "ADMIN_ROLE"){
          next();
      }else{
          return  res.json({
              ok:false,
              err: {
                  message: `El usuario ${ usuario.nombre } no es administrador`
              }
          });
      }
}

const verificaToken = ( req, res, next ) => {

    let tokenHeader = req.get('Authorization');
    let tokenUrl = req.query.token;
    let token = tokenHeader? tokenHeader : tokenUrl;

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if(err){
            res.status(401).json({
                ok:false,
                err
            });
        }
        
        req.usuario = decoded.usuario;
        next();
    });
}

module.exports = {
    verificaToken,
    verificaAdmin_Role
}