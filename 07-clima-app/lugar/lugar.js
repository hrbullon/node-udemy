const axios = require("axios");

const getLugarLatLng = async( direccion ) => {
    const direccionEncoded = encodeURI(direccion);
    const instance = axios.create({
        baseURL:'https://community-open-weather-map.p.rapidapi.com/find?q='+direccionEncoded,
        headers:{'x-rapidapi-key':'159f0f9f50msh3fb92022384a304p16a7a0jsn316df1d5d04e'}
    });

    const resp = await instance.get();

    if ( resp.data.list.length === 0){
        throw new Error(`No hay resultados para ${direccion}`);
    }

    const data = resp.data.list[0];
   
    const address = data.name;
    const lat = data.coord.lat; 
    const lng = data.coord.lon; 

    return {
        address,
        lat,
        lng
    };

}

module.exports = {
    getLugarLatLng
};

