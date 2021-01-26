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


let getEmpleado = (id, callback) => {

    let empleadoDB = empleados.find( empleado => empleado.id === id);
    
    if(!empleadoDB){
        callback(`No existe un empleado con el ID ${ id }`)
    }else{
        callback(null, empleadoDB);
    }

}

let getSalario = (empleado, callback) => {
    
    let salarioDB = salarios.find( salario => empleado.id === salario.id);
    
    if(!salarioDB){
        callback(`No existe un salario para el empleado ${ empleado.nombre }`);
    }else{
        callback(null, {
            nombre: empleado.nombre,
            salario: salarioDB.salario
        });
    }
}

getEmpleado(2, (err, empleado) => {
        
    if( err ){
        return console.log(err);
    }

    getSalario(empleado, (err, resp) => {
        if(err){
            return console.log(err);
        }
        console.log(`El salario de ${ resp.nombre } es de ${ resp.salario }$`);
    })

});
    



