//Inicializo variables
var proyectos = [];
var empleados = [];

// Defino objetos Proyecto y Empleado
class Proyecto {
    constructor(proyectoId, nombreProyecto, horasEstimadas, horasTotales) {
        this.proyId = proyectoId;
        this.nomProyecto = nombreProyecto;
        this.horasEst = horasEstimadas;
        this.horasTot = horasTotales;
    }
}
class Empleado {
    constructor(nombreEmpleado, hsProyectos) {
        this.nombre = nombreEmpleado;
        this.horas = hsProyectos;
    }
};

//Cargo empleados del Json al presionar boton
//Declaro la url donde tengo el archivo JSON local
const URLJSON = "./datos/empleados.json"
    //Agrego botón con jQuery
$("#empleados").append('<button id="btnJ" class="boton-cargar">Cargar</button>');
//Escucho el evento click del botón json
$("#btnJ").click(() => {
    $.getJSON(URLJSON, function(respuesta, estado) {
        if (estado === "success") {
            empleados = respuesta;
            $("#listaEmpleados").html("");
            $("#listaEmpleados").append(`<div id="listaEmpleados" class="desarrolladores"><strong>Desarrolladores</strong>`);
            for (let des of empleados) {
                $("#listaEmpleados").append(`<div id="listaEmpleados" class="desarrolladores">${des.nombre}`);
            }
            localStorage.setItem('tablaEmpleados', JSON.stringify(empleados));
        }
    })
});

//Cargo proyectos del Json al presionar boton
//Declaro la url donde tengo el archivo JSON local
const URLJSONPROY = "./datos/proyectos.json"
$.getJSON(URLJSONPROY, function(respuesta, estado) {
    if (estado === "success") {
        proyectos = respuesta;
        localStorage.setItem('tablaProyectos', JSON.stringify(proyectos));
    }
})