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