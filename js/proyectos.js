//busco los proyectos en localStorage
var proyId = 0;
var proyectosDecodificado = [];

proyectosDecodificado = JSON.parse(localStorage.getItem('tablaProyectos'));

//Función que reasigna los Id y pone en 0 las horas totales
function reasignarId() {
    //recorro el array de proyectos
    proyId = 0;
    for (let proy of proyectosDecodificado) {
        proy.id = proyId;
        proy.horasTot = 0;
        proyId++;
    }
}

//Función que agrega los proyectos al grid
function mostrarProyectos() {
    //recorro el array de proyectos
    for (let proy of proyectosDecodificado) {
        agregarLinea(proy);
    }
}

function agregarLinea(proy) {
    //agrego el proyecto al HTML
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
        var index = proyectosDecodificado.findIndex(proy => proy.id == ($(e.target).attr('id')).split('-')[1]);
        proyectosDecodificado.splice(index, 1);
        reasignarId();
        // borro la fila del html
        const nodoFila = $(e.target).parent().parent();
        // concateno animaciones al borrar
        nodoFila.animate({ "opacity": "0.5", }, 1000)
            .fadeOut(1000, () => {
                nodoFila.remove();
            });
        alert("Si ya procesó una simulación, actualice los resultados presionando el botón Resultados de la siguiente sección.");
        localStorage.setItem('tablaProyectos', JSON.stringify(proyectosDecodificado));
    });
    $(`#row${proy.id}`).fadeIn(2000, () => { console.log('Agrego fila') });
    localStorage.setItem('tablaProyectos', JSON.stringify(proyectosDecodificado));
}

function procesoForm(e) {
    e.preventDefault();
    let formulario = e.target;
    let nomProyecto = formulario.children[1].value;
    let horasEst = Number(formulario.children[3].value);
    let horasTot = 0;
    let indProyecto = proyectosDecodificado.findIndex(c => c.nomProyecto == nomProyecto);
    if (indProyecto >= 0) {
        alert("El proyecto ya existe!");
        return;
    }
    const nuevoProyecto = {
        id: proyId,
        nomProyecto,
        horasEst,
        horasTot,
    };
    proyectosDecodificado.push(nuevoProyecto);
    agregarLinea(nuevoProyecto);
    proyId++;
    localStorage.setItem('tablaProyectos', JSON.stringify(proyectosDecodificado));
}

if (proyectosDecodificado != '') {
    reasignarId();
    mostrarProyectos();
}

$("#altaProyecto").submit(procesoForm);