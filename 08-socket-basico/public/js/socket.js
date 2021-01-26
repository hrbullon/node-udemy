var socket = io();

socket.on('enviarMensaje', (mensaje) => {
    console.log(mensaje);
})

socket.on('connect', function() {
    console.log("Conectado al servidor");
}); 

socket.on('disconnect', function() {
    console.log("Perdimos la conexión al servidor");
});

socket.emit('enviarMensaje', {
    usuario:'Haderson',
    mensage:'Hola mundo con IO'
}, function(resp) {
    console.log(resp);
});