const axios = require("axios");

const appid = "4e186149590d051b81ee8397c82af142";

const getClima = async (lat, lng) => {
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lng }&appid=${ appid }&units=imperial`);
    return resp.data.main.temp;
}

module.exports = {
    getClima
};