const { io } = require('../server')

io.on('connection', ( client ) => {
    
    client.emit('enviarMensaje', {
        usuario:'Administrador',
        mensaje:'Bienvenido a esta aplicación'
    });    

    client.on('disconnect', () => {
        console.log("Usuario desconectado");
    });

    client.on('enviarMensaje', (data, callback) => {
        
        client.broadcast.emit('enviarMensaje', data);

        /* if(mensaje.usuario){
            callback({
                resp:'TODO SALIO BIEN!!'
            });
        }else{
            callback({
                resp:'TODO SALIO MAL!!!!!!!'
            });
        } */
    });
})