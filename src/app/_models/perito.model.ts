export class Perito {

        idperito: number;
        nombre: string;
        paterno: string;
        materno: string;
        nombrecompleto: string;
        iniciales: string;
        registrovaluador: string;
        titulo: string;
        cedulaprofesional: string;
        registrocolegiado: string;
        especialidad: string;
        idsociedad: number;
        sociedad: string;
        idusuario: number;
        rol: string;
        estatus: boolean;
 


constructor(perito){

    this.idperito = perito.idperito;
    this.nombre = perito.nombre;
    this.paterno = perito.paterno;
    this.materno = perito.materno;
    this.nombrecompleto = perito.nombrecompleto;
    this.iniciales = perito.iniciales;
    this.registrovaluador = perito.registrovaluador;
    this.titulo = perito.titulo;
    this.cedulaprofesional = perito.cedulaprofesional;
    this.registrocolegiado = perito.registrocolegiado;
    this.especialidad = perito.estatus;
    this.idsociedad = perito.idsociedad;
    this.sociedad = perito.sociedad;
    this.idusuario = perito.idusuario;
    this.rol = perito.rol;
    this.estatus = perito.estatus;
    
}
}
