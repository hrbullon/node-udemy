const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

const ticket = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (callback) => {
        let siguiente = ticket.siguiente();
        callback(siguiente);
    });

    client.emit('estadoActual',{ 
        actual: ticket.getUltimoTicket(),
        ultimos4: ticket.getUltimos4()
    });

    

    client.on('atenderTicket', (data, callback) => {

        if(!data.escritorio){
            return callback({
                err:true,
                message:'El escritorio  es necesario'
            })
        }

        let atenderTicket = ticket.atenderTicket(data.escritorio);
        
        if(!atenderTicket){
            return callback({
                err:true,
                message:'No hay tickets para atender'
            });
        }else{
            callback(atenderTicket);
    
            client.broadcast.emit('ultimos4', {
                actual: ticket.getUltimoTicket(),
                ultimos4: ticket.getUltimos4()
            });
        }

    });
});