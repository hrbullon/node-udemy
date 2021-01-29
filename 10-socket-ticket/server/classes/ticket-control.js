const fs = require('fs');

class Ticket {

    constructor(ticket, escritorio){
        this.ticket = ticket;
        this.escritorio = escritorio;
    }

}

class TicketControl {

    constructor(){

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');
        
        if(this.hoy === data.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        }else{
            this.reiniciarConteo();
        }
    }
    
    siguiente(){
        this.ultimo +=1;
        let ticket = new Ticket(this.ultimo,null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        return `Ticket: ${this.ultimo}`;
    }

    getUltimoTicket(){
        return `Ticket: ${this.ultimo}`;
    }

    getUltimos4(){
        return this.ultimos4;
    }

    atenderTicket(escritorio){

        if (this.tickets.length === 0) {
            return false;
        }

        let numeroTicket = this.tickets[0].ticket;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // borra el último
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;
         

    }

    reiniciarConteo() {
        
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
        console.log("Se ah inicializado el sistema");

    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
 
        let data = JSON.stringify(jsonData);
        
        fs.writeFileSync('./server/data/data.json', data);
    }
}

module.exports = {
    TicketControl
}