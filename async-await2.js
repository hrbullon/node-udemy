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


let getSalario = async (empleado) => {
    
    let salarioDB = salarios.find( salario => empleado.id === salario.id);

    if(!salarioDB){
        throw new Error(`No existe un salario para el empleado ${ empleado.nombre }`);
    }else{
        return {
            nombre: empleado.nombre,
            salario: salarioDB.salario
        };
    }

}

let getEmpleado = async (id) => {

    let empleadoDB = empleados.find( empleado => empleado.id === id);

    if(!empleadoDB){
        throw new Error(`No existe un empleado con el ID ${ id }`)
    }else{
        return empleadoDB;
    }

}


let getInformacion = async (id) => {
    let empleado = await getEmpleado(id);   
    let resp = await getSalario(empleado);   
    return `${empleado.nombre} tiene un salario de ${resp.salario}$`;
}

getInformacion(1).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});;