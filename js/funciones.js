//Inicializo variables

//let empleadosDecodificado = [];

//Cargo proyectos del Json al presionar boton
//Declaro la url donde tengo el archivo JSON local
const URLJSONPROY = "./datos/proyectos.json";

$.getJSON(URLJSONPROY, function(respuesta, estado) {
    console.log("entre a cargar el json proyectos");
    if (estado === "success") {
        respuesta.map(p => proyectos.push(p));
        //localStorage.setItem('tablaProyectos', JSON.stringify(proyectos));
        mostrarProyectos();
        console.log("se cargó el json de proyectos");
    } else {
        console.log('Error al cargar proyectos')
    }
});

//Cargo empleados del Json al presionar boton
//Declaro la url donde tengo el archivo JSON local
const URLJSON = "./datos/empleados.json";
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
            //localStorage.setItem('tablaEmpleados', JSON.stringify(empleados));
        }
    })
});


var proyId = 0;
//var proyectosDecodificado = [];

//proyectosDecodificado = JSON.parse(localStorage.getItem('tablaProyectos'));

//Función que reasigna los Id y pone en 0 las horas totales de proyecto y de empleados
function reasignarId() {
    //recorro el array de proyectos
    console.log("entro a reasignar Id");
    proyId = 0;
    for (let proy of proyectos) {
        proy.id = proyId;
        proy.horasTot = 0;
        proyId++;
    }
    for (let emp of empleados) {
        emp.horasTot = 0;

    }
}

//Función que agrega los proyectos al grid
function mostrarProyectos() {
    //proyectosDecodificado = JSON.parse(localStorage.getItem('tablaProyectos'));
    console.log("muestro proyectos");
    //recorro el array de proyectos
    for (let proy of proyectos) {
        agregarLinea(proy);
    }
}

function agregarLinea(proy) {
    //agrego el proyecto al HTML
    console.log("entro a agregar linea");
    $("#tabProyectos").append(
        `
          <div id="row${proy.id}" style="display: none" class="fila">
              <div class="columna3 proyectos-item">
                ${proy.nomProyecto}
              </div>
              <div class="columna3 proyectos-item">
                ${proy.horasEst}
              </div>
              <div class="columna3 proyectos-item">
              <button id="btn-${proy.id}" class="boton-eliminar">Eliminar</button>
              </div>
          </div>
        `
    );
    // asigno handler para el boton eliminar
    $(`#btn-${proy.id}`).click((e) => {
        // borro del array y actualizo local storage para la carga de horas
        console.log("entro al evento del boton eliminar");
        var index = proyectos.findIndex(proy => proy.id == ($(e.target).attr('id')).split('-')[1]);
        //proyectosDecodificado.splice(index, 1);
        proyectos = proyectos.filter(proy => proy.id != index);
        console.log(proyectos);
        reasignarId();
        // borro la fila del html
        const nodoFila = $(e.target).parent().parent();
        // animaciones al borrar
        nodoFila.animate({ "opacity": "0.5", }, 1000)
            .fadeOut(1000, () => {
                nodoFila.remove();
            });
        alert("Si ya procesó una simulación, actualice los resultados presionando el botón Resultados de la siguiente sección.");
        //localStorage.setItem('tablaProyectos', JSON.stringify(proyectosDecodificado));
    });
    console.log("se agregara fila de proyecto");
    console.log(proy.id);
    console.log(proyectos);
    $(`#row${proy.id}`).fadeIn(2000, () => { console.log('Agrego fila') });

}

function procesoForm(e) {
    console.log("entro al evento agregar proyecto");
    e.preventDefault();
    let formulario = e.target;
    let nomProyecto = formulario.children[1].value;
    let horasEst = Number(formulario.children[3].value);
    let horasTot = 0;
    let indProyecto = proyectos.findIndex(c => c.nomProyecto == nomProyecto);
    if (indProyecto >= 0) {
        alert("El proyecto ya existe!");
        return;
    }
    let canti = proyectos.length;
    const nuevoProyecto = {
        id: canti,
        nomProyecto,
        horasEst,
        horasTot,
    };
    proyectos.push(nuevoProyecto);
    agregarLinea(nuevoProyecto);

}


//Defino funciones
//Proceso los valores ingresados en el formulario de carga de horas al hacer click en Confirmar
function procesarFormulario(e) {

    console.log("entro al evento submit");
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
    let indexEmpleado = empleados.findIndex(c => c.nombre == nombre);
    if (indexEmpleado < 0) {
        alert("El nombre de empleado ingresado no es válido. Intentá nuevamente.");
        error = true;
    }
    let indexProyecto = proyectos.findIndex(c => c.nomProyecto == proyecto);
    if (indexProyecto < 0) {
        alert("El nombre de proyecto ingresado no es válido. Intentá nuevamente.");
        error = true;
    }

    //Totalizo horas por proyecto y por empleado
    if (error == false) {
        empleados[indexEmpleado].horas = empleados[indexEmpleado].horas + horas;
        proyectos[indexProyecto].horasTot = Number(proyectos[indexProyecto].horasTot) + horas;
    }
    console.log("sume horas al proyecto - boton confirmar");

}


//Llamo a las funciones de actualizacion de resultados al hacer click en Mostrar Resultados
function handlerBoton() {
    console.log("entro al evento mostrar");

    actualizoValoresProyecto();
    actualizoValoresEmpleado();
}

// Agrego nodos hijos al nodo Resultado Proyectos
function actualizoValoresProyecto() {
    borroValoresProyecto();
    //Agrego los títulos al div
    $("#proyecto").append(`<div id="proyecto" class="proyectos-item"><strong>Proyecto</strong>`);
    $("#proyecto").append(`<div id="proyecto" class="proyectos-item"><strong>Horas presupuestadas</strong>`);
    $("#proyecto").append(`<div id="proyecto" class="proyectos-item"><strong>Horas utilizadas</strong>`);
    $("#proyecto").append(`<div id="proyecto" class="proyectos-item"><strong>% horas utilizadas</strong>`);
    $("#proyecto").append(`<div id="proyecto" class="proyectos-item"><strong>Horas restantes</strong>`);

    for (let proy of proyectos) {
        agregarProyecto(proy);
    }
}

function borroValoresProyecto() {
    $("#proyecto").html("");
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
    for (const empleadoItem of empleados) {
        $("#empleado").append(`<div id="empleado" class="empleados-item">${empleadoItem.nombre}`);
        $("#empleado").append(`<div id="empleado" class="empleados-item"> ${empleadoItem.horas}`);

    }
}