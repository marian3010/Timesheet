//Inicializo variables
let primeraVezEmp = true;
let primeraVezProy = true;
let empleadosDecodificado = [];

//Defino funciones
//Proceso los valores ingresados en el formulario al hacer click en Confirmar

function procesarFormulario(e) {
    empleadosDecodificado = JSON.parse(localStorage.getItem('tablaEmpleados'));
    proyectosDecodificado = JSON.parse(localStorage.getItem('tablaProyectos'));
    console.log("entro al evento submit");
    console.log(proyectosDecodificado);
    e.preventDefault();
    error = false;
    let formulario = e.target;
    let nombre = formulario.children[1].value;
    let proyecto = formulario.children[3].value;
    let horasTexto = formulario.children[5].value;
    let horas = Number(horasTexto);
    if (horas < 0) {
        alert("La cantidad de horas no es válida. Intentá nuevamente.");
        error = true;
    }
    let indexEmpleado = empleadosDecodificado.findIndex(c => c.nombre == nombre);
    if (indexEmpleado < 0) {
        alert("El nombre de empleado ingresado no es válido. Intentá nuevamente.");
        error = true;
    }
    let indexProyecto = proyectosDecodificado.findIndex(c => c.nomProyecto == proyecto);
    if (indexProyecto < 0) {
        alert("El nombre de proyecto ingresado no es válido. Intentá nuevamente.");
        error = true;
    }

    //Totalizo horas por proyecto y por empleado
    if (error == false) {
        empleadosDecodificado[indexEmpleado].horas = empleadosDecodificado[indexEmpleado].horas + horas;
        proyectosDecodificado[indexProyecto].horasTot = Number(proyectosDecodificado[indexProyecto].horasTot) + horas;
        localStorage.setItem('tablaProyectos', JSON.stringify(proyectosDecodificado));
        localStorage.setItem('tablaEmpleados', JSON.stringify(empleadosDecodificado));
    }
    console.log("sume horas al proyecto - boton confirmar");
}


//Llamo a las funciones de actualizacion de resultados al hacer click en Mostrar Resultados
function handlerBoton() {
    console.log("entro al evento mostrar");
    empleadosDecodificado = JSON.parse(localStorage.getItem('tablaEmpleados'));
    proyectosDecodificado = JSON.parse(localStorage.getItem('tablaProyectos'));
    actualizoValoresProyecto();
    actualizoValoresEmpleado();

}

// Agrego nodos hijos al nodo Proyectos
function actualizoValoresProyecto() {
    borroValoresProyecto();
    //Agrego los títulos al div
    $("#proyecto").append(`<div id="proyecto" class="proyectos-item"><strong>Proyecto</strong>`);

    $("#proyecto").append(`<div id="proyecto" class="proyectos-item"><strong>Horas presupuestadas</strong>`);

    $("#proyecto").append(`<div id="proyecto" class="proyectos-item"><strong>Horas utilizadas</strong>`);

    $("#proyecto").append(`<div id="proyecto" class="proyectos-item"><strong>% horas utilizadas</strong>`);

    $("#proyecto").append(`<div id="proyecto" class="proyectos-item"><strong>Horas restantes</strong>`);

    for (let proy of proyectosDecodificado) {
        agregarProyecto(proy);
        primeraVezProy = false;
    }
}

function borroValoresProyecto() {
    //if (primeraVezProy != true) {
    $("#proyecto").html("");
    //}
}
//Agrego los resultados de proyectos al grid
function agregarProyecto(proyecto) {
    // Agrego los valores al div

    let porcentaje = proyecto.horasTot / proyecto.horasEst * 100;

    if (porcentaje > 100) {
        $("#proyecto").append(`<div id="proyecto" class="proyectos-item-rojo">${proyecto.nomProyecto}`);
        $("#proyecto").append(`<div id="proyecto" class="proyectos-item-rojo">${proyecto.horasEst}`);
        $("#proyecto").append(`<div id="proyecto" class="proyectos-item-rojo">${proyecto.horasTot}`);
        $("#proyecto").append(`<div id="proyecto" class="proyectos-item-rojo">${((proyecto.horasTot/proyecto.horasEst)*100).toFixed(2)}`);
        $("#proyecto").append(`<div id="proyecto" class="proyectos-item-rojo">${proyecto.horasEst-proyecto.horasTot}`);
    } else {
        $("#proyecto").append(`<div id="proyecto" class="proyectos-item">${proyecto.nomProyecto}`);
        $("#proyecto").append(`<div id="proyecto" class="proyectos-item">${proyecto.horasEst}`);
        $("#proyecto").append(`<div id="proyecto" class="proyectos-item">${proyecto.horasTot}`);
        $("#proyecto").append(`<div id="proyecto" class="proyectos-item">${((proyecto.horasTot/proyecto.horasEst)*100).toFixed(2)}`);
        $("#proyecto").append(`<div id="proyecto" class="proyectos-item">${proyecto.horasEst-proyecto.horasTot}`);
    }
}

function borroValoresEmpleado() {
    $("#empleado").html("");

}

//Armo la lista de empleados y su total de horas
function actualizoValoresEmpleado() {
    borroValoresEmpleado();
    //Agrego los títulos al div

    $("#empleado").append(`<div id="empleado" class="empleados-item"><strong>Nombre empleado</strong>`);

    $("#empleado").append(`<div id="empleado" class="empleados-item"><strong>Horas cargadas</strong>`);

    //recorro array empleados y armo la grilla
    for (const empleadoItem of empleadosDecodificado) {
        $("#empleado").append(`<div id="empleado" class="empleados-item">${empleadoItem.nombre}`);

        $("#empleado").append(`<div id="empleado" class="empleados-item"> ${empleadoItem.horas}`);

        primeraVezEmp = false;
    }
}