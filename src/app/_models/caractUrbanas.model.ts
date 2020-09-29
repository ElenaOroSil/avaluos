export class CaractUrbanas {
  idclasifzona: number;
  idestatusclasifzona: number;
  tipoconstruccion: string;
  idindicesaturacionzona: number;
  indicesaturacionzonavalor: number;
  idnivelsocioeconomico: number;
  iddensidadpoblacion: number;
  contambientalzona: string;
  idusosuelo: string;
  nummaxnivelesconst: number;
  porcentajearealibre: number;
  iddensidadvivienda: string;
  superficielotemin: number;
  superficielotetipo: number;
  viasaccesoeimportancia: string;
  claveUsoSueloF: string;
  descripUsoSueloF: string;
  coeficienteDeUsoDelSueloF: string;


   constructor(caractUrbanas){
    this.idclasifzona = caractUrbanas.idclasifzona;
    this.idestatusclasifzona = caractUrbanas.idestatusclasifzona;
    this.tipoconstruccion = caractUrbanas.tipoconstruccion;
    this.idindicesaturacionzona = caractUrbanas.idindicesatzonavalor;
    this.indicesaturacionzonavalor = caractUrbanas.indicesaturacionzonavalor;
    this.idnivelsocioeconomico = caractUrbanas.idnivelsocioeconomico;
    this.iddensidadpoblacion = caractUrbanas.iddensidadpoblacion;
    this.contambientalzona = caractUrbanas.contambientalzona;
    this.idusosuelo = caractUrbanas.idusosuelo;
    this.nummaxnivelesconst = caractUrbanas.nummaxnivelesconst;
    this.porcentajearealibre = caractUrbanas.porcentajearealibre;
    this.iddensidadvivienda = caractUrbanas.iddensidadvivienda;
    this.superficielotemin = caractUrbanas.superficielotemin;
    this.superficielotetipo = caractUrbanas.superficielotetipo;
    this.viasaccesoeimportancia = caractUrbanas.viasaccesoeimportancia;
    this.claveUsoSueloF = caractUrbanas.claveUsoSueloF;
    this.descripUsoSueloF = caractUrbanas.descripUsoSueloF;
    this.coeficienteDeUsoDelSueloF = caractUrbanas.coeficienteDeUsoDelSueloF;
   }
}

export class EquipamientoUrbano {

idsuministrotelefonico: number;
idacometidainmueble: number;
idsenalizacionvias: number;
idnomenclaturacalle: number;
distanciatransporteurbano: number;
frecuenciatransporteurbano: number;
distanciatransportesuburbano: number;
frecuenciatransportesuburbano: number;
idrecoleccionbasura: number;
templos: boolean;
mercados: boolean;
plazaspublicas: boolean;
parquesjardines: boolean;
escuelas: boolean;
hospitales: boolean;
bancos: boolean;
estaciontransporte: boolean;
nivelEquipamientoF: string;

constructor(equipamientoUrbano){

  this.idsuministrotelefonico = equipamientoUrbano.idsuministrotelefonico;
  this.idacometidainmueble = equipamientoUrbano.idacometidainmueble;
  this.idsenalizacionvias = equipamientoUrbano.idsenalizacionvias;
  this.idnomenclaturacalle = equipamientoUrbano.idnomenclaturacalle;
  this.distanciatransporteurbano = equipamientoUrbano.distanciatransporteurbano;
  this.frecuenciatransporteurbano = equipamientoUrbano.frecuenciatransporteurbano;
  this.distanciatransportesuburbano = equipamientoUrbano.distanciatransportesuburbano;
  this.frecuenciatransportesuburbano = equipamientoUrbano.frecuenciatransportesuburbano;
  this.idrecoleccionbasura = equipamientoUrbano.idrecoleccionbasura;
  this.templos = equipamientoUrbano.templos;
  this.mercados = equipamientoUrbano.mercados;
  this.plazaspublicas = equipamientoUrbano.plazaspublicas;
  this.parquesjardines = equipamientoUrbano.parquesjardines;
  this.escuelas = equipamientoUrbano.escuelas;
  this.hospitales = equipamientoUrbano.hospitales;
  this.bancos = equipamientoUrbano.bancos;
  this.estaciontransporte = equipamientoUrbano.estaciontransporte;
  this.nivelEquipamientoF = equipamientoUrbano.nivelEquipamientoF;

}

}