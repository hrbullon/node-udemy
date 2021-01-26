const fs = require('fs');
var colors = require('colors');

let listarTabla = ( base, limite) => {
    
    console.log("==============");
    console.log(`Tabla del ${base}`.green);
    console.log("==============");

    for (let i = 1; i <= limite; i++) {
        console.log(`${base}x${i}=${base*i}`);
    }
}

let crearArchivo = ( base, limite ) => {
    return new Promise((resolve, reject) => {
        
        if(!Number(base)){
            reject(colors.red(`El valor introducido ${base} no es un numero`));
            return;
        }
        let file = `tabla-${base}.txt`;
        let data = "";
        
        for (let i = 1; i <= limite; i++) {
            data += `${base}x${i}=${base*i}\n`;
        }
        
        fs.writeFile(`tablas/${file}`,data, (err) =>{
            if(err) reject(err)
            else
                resolve(`El archivo ${colors.green(file)} ha sido creado`);
        });        
    });
}

module.exports = {
    crearArchivo,
    listarTabla
}





