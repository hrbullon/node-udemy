let deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneración',
    getNombre: function() {
        return `${ this.nombre } ${ this.apellido } - poder: ${ this.poder}`
    } 
}

//Destruccturación de un objeto
let { nombre: primerNombre, apellido, poder } = deadpool;

console.log(primerNombre, apellido, poder);