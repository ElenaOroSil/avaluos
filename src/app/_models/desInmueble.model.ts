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
     claseCMFF: number;

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
        this.claseCMFF = descripcionInmueble.claseCMFF;

     }

}

export class TablaEdoGralConservacion {
  idinmuebleconstruccion: number;
  claseconstruccion: string;
  idpartidaporcentaje: number;
  descripcionpartida: string;
  puntospartida: number;
  idpartidaconserva: number;
  manttrequerido: string;
  indiceconservacion: number;
  vidaminimaanios: number;
  puntosajustados: number; 

  constructor(tablaEdoGralConservacion) {
     this.idinmuebleconstruccion = tablaEdoGralConservacion.idinmuebleconstruccion;
     this.claseconstruccion = tablaEdoGralConservacion.claseconstruccion;
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

export class SinMatrices {
    idinmuebleconstruccion: number;
    tipoconstruccion: string;
    clasesm: string;
    puntajesm: number;

    constructor(sinMatrices) {
      this.idinmuebleconstruccion = sinMatrices.idinmuebleconstruccion;
      this.tipoconstruccion = sinMatrices.tipoconstruccion;
      this.clasesm = sinMatrices.clasem;
      this.puntajesm = sinMatrices.puntajesm;

    }

}

export class TablaMatrices {
  idinmconstruccion: number;
  idmatriz: number;
  idseccion: number;
  idsubseccion: number;
  clase: number;
  puntos: number;

  constructor(tablamatrices) {
    this.idinmconstruccion = tablamatrices.idinmconstruccion;
    this.idmatriz = tablamatrices.idmatriz;
    this.idseccion = tablamatrices.idseccion;
    this.idsubseccion = tablamatrices.idsubseccion;
    this.clase = tablamatrices.clase;
    this.puntos = tablamatrices.puntos;
  }
}

export class PrivativaComun {
  idinmconstruccion: number;
  tipoconstruccion: string;
  idusoconstruccion: string;
  idrangoniveltgdf: string;
  clasef: string;
  clasifica1f: string;
  clasifica2f: string;
  clasifica3f: string; 
  edadf: number;
  conservaedocve: number;
  conservaedodesc: string;
  conservaedofact: string;
  vp: number;
  fedicrredf: string;
  fedicrnoredf: string;
  vurf: number;
  depedadf: string;
  vuccatastralf: string;
  valorunireponuevo: string;
  losaconcreto: string;

  constructor(privativacomun) {
     this.idinmconstruccion = privativacomun.idinmconstruccion;
     this.tipoconstruccion = privativacomun.tipoconstruccion;
     this.idusoconstruccion = privativacomun.idusoconstruccion;
     this.idrangoniveltgdf = privativacomun.idrangoniveltgdf;
     this.clasef = privativacomun.clasef;
     this.clasifica1f = privativacomun.clasifica1f;
     this.clasifica2f = privativacomun.clasifica2f;
     this.clasifica3f = privativacomun.clasifica3f;
     this.edadf = privativacomun.edadf;
     this.conservaedocve = privativacomun.conservaedocve;
     this.conservaedodesc = privativacomun.conservaedodesc;
     this.conservaedofact = privativacomun.conservaedofact;
     this.vp = privativacomun.vp;
     this.fedicrredf = privativacomun.fedicrredf;
     this.fedicrnoredf = privativacomun.fedicrnoredf;
     this.vurf = privativacomun.vurf;
     this.depedadf = privativacomun.depedadf;
     this.vuccatastralf = privativacomun.vuccatastralf;
     this.valorunireponuevo = privativacomun.valorunireponuevo;
     this.losaconcreto = privativacomun.losaconcreto;

  }

}

export class OtrosDatosPC{
     usoactual: string;
     numeroniveles: number;
     estadoconservacion: string;
     calidadproyecto: string;
     unidadesrentablessuscep: string;
     porcsuperfyultrespecant: number;
     avanceobra: number;
     importetotvalorcatastralf: number;

     constructor(otrosdatospc){
       this.usoactual = otrosdatospc.usoactual;
       this.numeroniveles = otrosdatospc.numeroniveles;
       this.estadoconservacion = otrosdatospc.estadoconservacion;
       this.calidadproyecto = otrosdatospc.calidadproyecto;
       this.unidadesrentablessuscep = otrosdatospc.unidadesrentablessuscep;
       this.porcsuperfyultrespecant = otrosdatospc.porcsuperfyultrespecant;
       this.avanceobra = otrosdatospc.avanceobra;
       this.importetotvalorcatastralf = otrosdatospc.importetotvalorcatastralf;

     }
}

