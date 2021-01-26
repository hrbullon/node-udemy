const argv = require('./config/yargs').argv;
const { crearArchivo, listarTabla } = require('./multiplicar/multiplicar');

let base = argv.base;
let limite = argv.limite;
let comando = argv._[0];

switch (comando) {
    case 'crear':
            crearArchivo(base,limite).then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
        break;
    case 'listar':
            listarTabla(base,limite);
        break;
    default:
        console.log('Comando no reconocido');
        break;
}

