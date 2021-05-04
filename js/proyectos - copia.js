//busco los proyectos en localStorage
var proyId = 0;
var proyectosDecodificado = [];
//Agrego los proyectos al grid
function mostrarProyectos() {
    //recorro el array de proyctos
    proyectosDecodificado = JSON.parse(localStorage.getItem('tablaProyectos'));
    for (let proy of proyectosDecodificado) {
        agregarLinea(proy);
        proyId++;
    }
    console.log("DATA QUE TRAE ", JSON.parse(localStorage.getItem('tablaProyectos')))
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
        var index = proyectosDecodificado.findIndex(proy => proy.id == ($(e.target).attr('id')).split('-')[1]);
        proyectosDecodificado = proyectosDecodificado.filter(proy => proy.id != index);
        localStorage.setItem('tablaProyectos', JSON.stringify(proyectosDecodificado));
        // borro la fila del html
        const nodoFila = $(e.target).parent().parent();
        // concateno animaciones al borrar
        nodoFila.animate({ "opacity": "0.5", }, 1000)
            .fadeOut(1000, () => {
                nodoFila.remove();
            });
    });
    $(`#row${proy.id}`).fadeIn(2000, () => { console.log('Agrego fila') });
}

function procesoForm(e) {
    console.log("ENTRAMOS")
    e.preventDefault();
    let formulario = e.target;
    let nomProyecto = formulario.children[1].value;
    let horasEst = Number(formulario.children[5].value);
    let horasTot = 0;
    let indProyecto = proyectosDecodificado.findIndex(c => c.nomProyecto == nomProyecto);
    if (indProyecto >= 0) {
        alert("El proyecto ya existe!");
        return;
    }
    const proyecto = {
        id: proyId,
        nomProyecto,
        horasEst,
        horasTot,
    };
    proyectosDecodificado.push(proyecto);
    localStorage.setItem('tablaProyectos', JSON.stringify(proyectosDecodificado));
    agregarLinea(proyecto);
    proyId++;

}
mostrarProyectos();
$("#altaProyecto").submit(procesoForm);