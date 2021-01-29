let socket = io();

socket.on('estadoActual', function(data){

    actualizaHtml(data.ultimos4);

});

socket.on('ultimos4', function(data){
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHtml(data.ultimos4);
})

function actualizaHtml(tickets){

    for (let i = 1; i <= 4; i++) {
        
        if(tickets.length > 0){

            const ticket = tickets[i-1].ticket;
            const escritorio = tickets[i-1].escritorio;
        
            if(ticket && escritorio){
                $("#lblTicket" + i).text('Ticket: ' + ticket);
                $("#lblEscritorio" + i).text('Escritorio: ' + escritorio);
            }
        }else{
            $("#lblTicket" + i).text('Ticket: S/A');
            $("#lblEscritorio" + i).text('Escritorio: S/A');
        }

    }

}