var socket = io();

let label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log("Nuevo ticket conectado");
});

socket.on('disconnect', function() {
    console.log("Nuevo ticket desconectado");
});

socket.on('estadoActual', function(respuesta){
    label.text(respuesta.actual);
});

$('button').click(function(){
    socket.emit('siguienteTicket', function(siguienteTicket){
        label.text(siguienteTicket);
    });
})