//Defino los eventos de la página
// formulario de alta de proyectos
$("#altaProyecto").submit(procesoForm);

//Monitoreo el submitir del formulario de carga de horas (botón Confirmar)
$("#form-carga").submit(procesarFormulario);

//Monitoreo el botón Mostrar Resultados en carga de horas
$("#muestroResultados").on('click', handlerBoton);

//handler del botón subir en 3.Simulación carga de horas
$('#subir1').click(()  =>  {    
    $('body').animate({ scrollTop:  $("body").offset().top }, 1000);

});

// handler del botón subir en 4.Resultados
$('#subir2').click(()  =>  {    
    $('body').animate({ scrollTop:  $("body").offset().top }, 1000);

});