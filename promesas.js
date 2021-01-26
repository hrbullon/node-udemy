let empleados = [{
    id:1,
    nombre: "Haderson"
},{
    id:2,
    nombre: "Genesis"
},{
    id:3,
    nombre: "Alondra"
}];

let salarios = [{
    id:1,
    salario: 2000
},{
    id:2,
    salario: 3500
}];


let getSalario = (empleado) => {
    
    return new Promise( (resolve, reject) => {

        let salarioDB = salarios.find( salario => empleado.id === salario.id);

        if(!salarioDB){
            reject(`No existe un salario para el empleado ${ empleado.nombre }`);
        }else{
            resolve({
                nombre: empleado.nombre,
                salario: salarioDB.salario
            });
        }

    })
    
}


let getEmpleado = id => {

    return new Promise( (resolve, reject) => {

        let empleadoDB = empleados.find( empleado => empleado.id === id);
    
        if(!empleadoDB){
            reject(`No existe un empleado con el ID ${ id }`)
        }else{
            resolve(empleadoDB);
        }

    })

}

getEmpleado(2).then( empleado => {
    
    getSalario(empleado).then( resp => {
        console.log(`El salario de ${resp.nombre} es de ${resp.salario}$`);
    }, (err) => console.log(err));

}, (err) => console.log(err));