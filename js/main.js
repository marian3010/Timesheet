//Defino los eventos de la página

//Monitoreo el submitir del formulario (botón Confirmar)
$("#form-carga").submit(procesarFormulario);

//Monitoreo el botón Mostrar Resultados
$("#muestroResultados").on('click', handlerBoton);

$('#subir1').click(()  =>  {    
    $('body').animate({ scrollTop:  $("body").offset().top }, 1000);
    console.log("subi");
});

$('#subir2').click(()  =>  {    
    $('body').animate({ scrollTop:  $("body").offset().top }, 1000);
    console.log("subi");
});