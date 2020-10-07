export class DescripcionInmueble {
     idinmconstruccion: number;
     tipoconstruccion: string;
     idtipoconstruccion: number;
     superficie: number;
     descripcionmodulo: string;
     niveltipo: number;
     idusoconstruccion: string;
     idrangoniveltgdf: string;
     clasef: string;
     puntajef: number;
     edad: number;
     idestadoconservacion: number;
     indiviso: number;
     idclaseconstruccionf: number;
     estadogralconservacionf: string;
     vidaminimaremanentef: number;
     indicecostosremanentef: number;
     totalpuntosajustadosf: number;
     clasesm: number;
     puntajesm: number;

     constructor(descripcionInmueble) {
        this.idinmconstruccion = descripcionInmueble.idinmconstruccion;
        this.tipoconstruccion = descripcionInmueble.idinmconstruccion;
        this.idtipoconstruccion = descripcionInmueble.idinmconstruccion;
        this.superficie = descripcionInmueble.idinmconstruccion;
        this.descripcionmodulo = descripcionInmueble.idinmconstruccion;
        this.niveltipo = descripcionInmueble.idinmconstruccion;
        this.idusoconstruccion = descripcionInmueble.idinmconstruccion;
        this.idrangoniveltgdf = descripcionInmueble.idinmconstruccion;
        this.clasef = descripcionInmueble.idinmconstruccion;
        this.puntajef = descripcionInmueble.idinmconstruccion;
        this.edad = descripcionInmueble.idinmconstruccion;
        this.idestadoconservacion = descripcionInmueble.idinmconstruccion;
        this.indiviso = descripcionInmueble.idinmconstruccion;
        this.idclaseconstruccionf = descripcionInmueble.idinmconstruccion;
        this.estadogralconservacionf = descripcionInmueble.idinmconstruccion;
        this.vidaminimaremanentef = descripcionInmueble.idinmconstruccion;
        this.indicecostosremanentef = descripcionInmueble.idinmconstruccion;
        this.totalpuntosajustadosf = descripcionInmueble.idinmconstruccion;
        this.clasesm = descripcionInmueble.idinmconstruccion;
        this.puntajesm = descripcionInmueble.idinmconstruccion;

     }

}

export class TablaEdoGralConservacion {
  idpartidaporcentaje: number;
  descripcionpartida: string;
  puntospartida: number;
  idpartidaconserva: number;
  manttrequerido: string;
  indiceconservacion: number;
  vidaminimaanios: number;
  puntosajustados: number; 

  constructor(tablaEdoGralConservacion) {
     this.idpartidaporcentaje = tablaEdoGralConservacion.idpartidaporcentaje;
     this.descripcionpartida = tablaEdoGralConservacion.descripcionpartida;
     this.puntospartida = tablaEdoGralConservacion.puntospartida;
     this.idpartidaconserva = tablaEdoGralConservacion.idpartidaconserva;
     this.manttrequerido = tablaEdoGralConservacion.manttrequerido;
     this.indiceconservacion = tablaEdoGralConservacion.indiceconservacion;
     this.vidaminimaanios = tablaEdoGralConservacion.vidaminimaanios;
     this.puntosajustados = tablaEdoGralConservacion.puntosajustados;
  }

}