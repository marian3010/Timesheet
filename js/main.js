//Defino los eventos de la página

//Monitoreo el submitir del formulario (botón Confirmar)
$("#form-carga").submit(procesarFormulario);

//Monitoreo el botón Mostrar Resultados
$("#muestroResultados").on('click', handlerBoton);

$('#subir').click(()  =>  {    
    $('html, body').animate({ scrollTop:  $("body").offset().top }, 1000);
    console.log("subi");
});