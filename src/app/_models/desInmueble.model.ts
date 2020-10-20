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
  idtipoconstruccion: string;
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

  constructor(PrivativaComun) {
     this.idinmconstruccion = PrivativaComun.idinmconstruccion;
     this.tipoconstruccion = PrivativaComun.tipoconstruccion;
     this.idtipoconstruccion = PrivativaComun.idtipoconstruccion;
     this.idusoconstruccion = PrivativaComun.idusoconstruccion;
     this.idrangoniveltgdf = PrivativaComun.idrangoniveltgdf;
     this.clasef = PrivativaComun.clasef;
     this.clasifica1f = PrivativaComun.clasifica1f;
     this.clasifica2f = PrivativaComun.clasifica2f;
     this.clasifica3f = PrivativaComun.clasifica3f;
     this.edadf = PrivativaComun.edadf;
     this.conservaedocve = PrivativaComun.conservaedocve;
     this.conservaedodesc = PrivativaComun.conservaedodesc;
     this.conservaedofact = PrivativaComun.conservaedofact;
     this.vp = PrivativaComun.vp;
     this.fedicrredf = PrivativaComun.fedicrredf;
     this.fedicrnoredf = PrivativaComun.fedicrnoredf;
     this.vurf = PrivativaComun.vurf;
     this.depedadf = PrivativaComun.depedadf;
     this.vuccatastralf = PrivativaComun.vuccatastralf;
     this.valorunireponuevo = PrivativaComun.valorunireponuevo;
     this.losaconcreto = PrivativaComun.losaconcreto;

  }

}