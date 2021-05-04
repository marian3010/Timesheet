//Defino los eventos de la página

//Monitoreo el submitir del formulario (botón Confirmar)
$("#form-carga").submit(procesarFormulario);

//Monitoreo el botón Mostrar Resultados
$("#muestroResultados").on('click', handlerBoton);