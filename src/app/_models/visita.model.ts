export class Visita {
    nombreContacto: string;
    paternoContacto: string;
    maternoContacto: string;
    correoElectronico: string;
    telefonoFijo: string;
    extTelefono: string;
    telefonoMovil: string;
    fechaVisita: Date;
    horaVisita: string;
    observaciones: string;
   
   constructor(visita) {
       this.nombreContacto = visita.nombrecontacto;
       this.paternoContacto = visita.paternoContacto;
       this.maternoContacto = visita.maternoContacto;
       this.correoElectronico = visita.correoElectronico;
       this.telefonoFijo = visita.telefonoFijo;
       this.extTelefono = visita.extTelefono;
       this.telefonoMovil = visita.telefonoMovil;
       this.fechaVisita = visita.fechaVisita;
       this.horaVisita = visita.horaVisita;
       this.observaciones = visita.observaciones;
   }
}