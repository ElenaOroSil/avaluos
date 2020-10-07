export class Solicitante {
    nombre: string;
    paterno: string;
    materno: string;
    tipoPersona: string;
    rfc: string;
    curp: string;
    telefonoFijo: string;
    extTelefono: string;
    telefonoMovil: string;
    cp: string;
    idEntidad: string;
    idMunicipio: string;
    idAsentamiento: string;
    calle: string;
    exterior: string;
    interior: string;
    manzana: string;
    lote: string;
    edificio: string;
   
   constructor(solicitante) {
       this.nombre = solicitante.nombre;
       this.paterno = solicitante.paterno;
       this.materno = solicitante.materno;
       this.tipoPersona = solicitante.tipoPersona; 
       this.rfc = solicitante.rfc;
       this.curp = solicitante.curp;
       this.telefonoFijo = solicitante.telefonoFijo;
       this.extTelefono = solicitante.extTelefono;
       this.telefonoMovil = solicitante.telefonoMovil;
       this.cp = solicitante.cp;
       this.idEntidad = solicitante.idEntidad;
       this.idMunicipio = solicitante.idMunicipio;
       this.idAsentamiento = solicitante.idAsentamiento;
       this.calle = solicitante.calle;
       this.exterior = solicitante.exterior;
       this.interior = solicitante.interior;
       this.manzana = solicitante.manzana;
       this.lote = solicitante.lote;
       this.edificio = solicitante.edificio;
   }
}

export class Propietario {
    nombre: string;
    paterno: string;
    materno: string;
    tipoPersona: string;
    rfc: string;
    curp: string;
    telefonoFijo: string;
    extTelefono: string;
    telefonoMovil: string;
    cp: string;
    idEntidad: string;
    idMunicipio: string;
    idAsentamiento: string;
    calle: string;
    exterior: string;
    interior: string;
    manzana: string;
    lote: string;
    edificio: string;
   
   constructor(propietario) {
       this.nombre = propietario.nombre;
       this.paterno = propietario.paterno;
       this.materno = propietario.materno;
       this.tipoPersona = propietario.tipoPersona;
       this.rfc = propietario.rfc;
       this.curp = propietario.curp;
       this.telefonoFijo = propietario.telefonoFijo;
       this.extTelefono = propietario.extTelefono;
       this.telefonoMovil = propietario.telefonoMovil;
       this.cp = propietario.cp;
       this.idEntidad = propietario.idEntidad;
       this.idMunicipio = propietario.idMunicipio;
       this.idAsentamiento = propietario.idAsentamiento;
       this.calle = propietario.calle;
       this.exterior = propietario.exterior;
       this.interior = propietario.interior;
       this.manzana = propietario.manzana;
       this.lote = propietario.lote;
       this.edificio = propietario.edificio;
   }
}

export class Inmueble {
    calle: string;
    exterior: string;
    interior: string;
    manzana: string;
    lote: string;
    edificio: string;
    idAsentamiento: string;
    cp: string;
    idEntidad: string;
    idMunicipio: string;
    regionPredial: string;
    manzanaPredial: string;
    lotePredial: string;
    localidadPredial: string;
    digitoVerificador: string;
    cuentaAgua: string;
    descInmuebleEvaluar: string;
    idUsoConstruccion: string;
    idClaseConstruccion: string;
    idRegimenPropiedad: number;
    porcentajeIndiviso: number;
    idObjetoAvaluo: number;
    idPropositoAvaluo: number;
    areaCatastral: string;
    valorCatastral: number;
    corredorEnclave: string;
    valorCorredorEnclave: number;
    corredorOEnclave: string;
    valorCorredorOEnclave: number;
    anioEjercicioFiscalf: number;
    aniosDiferenciaF: number;
    areaValorf: string;
    corredorEnclavef: string;
    areaValorAniof: string;
    valorCorredorEnclaveAniof: string;
    latitud: string;
    longitud: string;
    altitud: string;

constructor(inmueble){

    this.calle = inmueble.calle;
    this.exterior= inmueble.exterior;
    this.interior= inmueble.interior;
    this.manzana= inmueble.manzana;
    this.lote= inmueble.lote;
    this.edificio= inmueble.edificio;
    this.cp= inmueble.cp;
    this.idEntidad= inmueble.idEntidad;
    this.idMunicipio= inmueble.idMunicipio;
    this.idAsentamiento= inmueble.idAsentamiento;
    this.regionPredial= inmueble.regionPredial;
    this.manzanaPredial= inmueble.manzanaPredial;
    this.lotePredial= inmueble.lotePredial;
    this.localidadPredial= inmueble.localidadPredial;
    this.digitoVerificador= inmueble.digitoVerificador;
    this.cuentaAgua= inmueble.cuentaAgua;
    this.descInmuebleEvaluar= inmueble.descInmuebleEvaluar;
    this.idUsoConstruccion= inmueble.idUsoConstruccion;
    this.idClaseConstruccion= inmueble.idClaseConstruccion;
    this.idRegimenPropiedad= inmueble.idRegimenPropiedad;
    this.porcentajeIndiviso= inmueble.porcentajeIndiviso;
    this.idObjetoAvaluo= inmueble.idObjetoAvaluo;
    this.idPropositoAvaluo= inmueble.idPropositoAvaluo;
    this.areaCatastral= inmueble.areaCatastral;
    this.valorCatastral= inmueble.valorCatastral;
    this.corredorEnclave= inmueble.corredorEnclave;
    this.valorCorredorEnclave= inmueble.valorCorredorEnclave;
    this.corredorOEnclave= inmueble.corredorOEnclave;
    this.valorCorredorOEnclave= inmueble.valorCorredorOEnclave;
    this.anioEjercicioFiscalf= inmueble.anioEjercicioFiscalf;
    this.aniosDiferenciaF= inmueble.aniosDiferenciaF;
    this.areaValorf= inmueble.areaValorf;
    this.corredorEnclavef= inmueble.corredorEnclavef;
    this.areaValorAniof= inmueble.areaValorAniof;
    this.valorCorredorEnclaveAniof= inmueble.valorCorredorEnclaveAniof;
    this.latitud= inmueble.latitud;
    this.longitud= inmueble.longitud;
    this.altitud= inmueble.altitud;
}
}