//busco los proyectos en localStorage
var proyId = 0;
var proyectosDecodificado = [];

proyectosDecodificado = JSON.parse(localStorage.getItem('tablaProyectos'));

//Función que reasigna los Id y pone en 0 las horas totales de proyecto y de empleados
function reasignarId() {
    //recorro el array de proyectos
    console.log("entro a reasignar Id");
    proyId = 0;
    for (let proy of proyectosDecodificado) {
        proy.id = proyId;
        proy.horasTot = 0;
        proyId++;
    }
    console.log(proyId);
    console.log(proyectosDecodificado);
    //for (let emp of empleadosDecodificado) {
    //  emp.horasTot = 0;

    //}
}

//Función que agrega los proyectos al grid
function mostrarProyectos() {
    proyectosDecodificado = JSON.parse(localStorage.getItem('tablaProyectos'));
    console.log("muestro proyectos");
    //recorro el array de proyectos
    for (let proy of proyectosDecodificado) {
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
        var index = proyectosDecodificado.findIndex(proy => proy.id == ($(e.target).attr('id')).split('-')[1]);
        //proyectosDecodificado.splice(index, 1);
        proyectosDecodificado = proyectosDecodificado.filter(proy => proy.id != index);
        console.log(proyectosDecodificado);
        reasignarId();
        // borro la fila del html
        const nodoFila = $(e.target).parent().parent();
        // animaciones al borrar
        nodoFila.animate({ "opacity": "0.5", }, 1000)
            .fadeOut(1000, () => {
                nodoFila.remove();
            });
        alert("Si ya procesó una simulación, actualice los resultados presionando el botón Resultados de la siguiente sección.");
        localStorage.setItem('tablaProyectos', JSON.stringify(proyectosDecodificado));
    });
    console.log("se agregara fila de proyecto");
    console.log(proy.id);
    console.log(proyectosDecodificado);
    $(`#row${proy.id}`).fadeIn(2000, () => { console.log('Agrego fila') });

}

function procesoForm(e) {
    console.log("entro al evento agregar proyecto");
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
    let canti = proyectosDecodificado.length;
    console.log(canti);
    const nuevoProyecto = {
        id: canti,
        nomProyecto,
        horasEst,
        horasTot,
    };
    proyectosDecodificado.push(nuevoProyecto);
    localStorage.setItem('tablaProyectos', JSON.stringify(proyectosDecodificado));
    agregarLinea(nuevoProyecto);

}

$("#altaProyecto").submit(procesoForm);

$('#subir').click(()  =>  {    
    $('html, body').animate({ scrollTop:  $("body").offset().top }, 5000);
    console.log(subi);
});