var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

$('h1').text('Escritorio ' + escritorio);

$('button').click(function () { 
    socket.emit('atenderTicket', {escritorio : escritorio} , function(respuesta) {
        
        if(respuesta.err){
            alert(respuesta.message);
        }else{
            label.text('Ticket: ' + respuesta.ticket);
        }
    })
});