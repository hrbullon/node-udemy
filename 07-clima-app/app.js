const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs').options({
    direccion:{
        alias:'d',
        desc:'Direccion de la ciudad para obtener el clima',
        demand:true
    }
}).argv;

const direccion = argv.direccion;

const getInfo = async ( direccion ) => {

    try {
        
        const coords = await lugar.getLugarLatLng(direccion);
        const temp = await clima.getClima(coords.lat, coords.lng);
        return `El clima de ${coords.address} es de ${temp}.`    

    } catch (error) {
        return `No se pudo determinar el clma de ${direccion}`;    
    }

}

getInfo(direccion).then(console.log).catch(console.log);