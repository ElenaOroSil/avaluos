export class AddAvaluo {
 folio: string;
 idtipoavaluo: number;
 fechaavaluo: Date;
 idSociedad?: number;
 idPerito: number;

constructor(addavaluo) {
    this.folio =addavaluo.folio;
    this.idtipoavaluo = addavaluo.idtipoavaluo;
    this.fechaavaluo = addavaluo.fechaavaluo;
    this.idSociedad = addavaluo.idSociedad;
    this.idPerito = addavaluo.idPerito;
}

}

export class FilterAvaluo {
    folio: string;
    fechaInicial: string;
    fechaFinal: string;
    idtipoavaluo: number;
    solicitante: string;
    idestatusavaluo: number;

    constructor(filteravaluo){
        this.folio = filteravaluo.folio;
        this.fechaInicial = filteravaluo.fechaInicial;
        this.fechaFinal = filteravaluo.fechaFinal;
        this.idtipoavaluo = filteravaluo.idtipoavaluo;
        this.solicitante = filteravaluo.solicitante;
        this.idestatusavaluo = filteravaluo.idestatusavaluo;
    }
}

export class DetalleAvaluo{
    folio: string;
    idtipoavaluo: number;
    tipoAvaluo: string;
    perito: string;
    idSociedad: number;
    sociedad: string;
    responsable: string;
    solicitante: string;
    propietario: string;
    fechaavaluo: Date;
    idestatusavaluo: number;
    estatusavaluo: string;
      

    constructor(detalleAvaluo){
        this.folio = detalleAvaluo.folio;
        this.idtipoavaluo = detalleAvaluo.idtipoavaluo;
        this.tipoAvaluo = detalleAvaluo.tipoAvaluo;
        this.perito = detalleAvaluo.perito;
        this.idSociedad = detalleAvaluo.idSociedad;
        this.sociedad = detalleAvaluo.sociedad;
        this.responsable = detalleAvaluo.responsable;
        this.solicitante = detalleAvaluo.solicitante;
        this.propietario = detalleAvaluo.propietario;
        this.fechaavaluo = detalleAvaluo.fechaavaluo;   
        this.idestatusavaluo = detalleAvaluo.idtipoavaluo;
        this.estatusavaluo = detalleAvaluo.estatusavaluo;

    }

} 

export class AvanceAvaluo {
    visita: boolean;
    antecedentes: boolean;
    caracteristicasUrbanas: boolean;
    terreno: boolean;
    descripcionGralInmueble: boolean;
    elementosConstruccion: boolean;
    consideracionPreviasAvaluo: boolean;
    avaluoFisicoDirecto: boolean;
    valorCapitalizacionRentas: boolean;
    anexoFotografico: boolean;

constructor(avanceavaluo){
    this.visita = avanceavaluo.visita;
    this.antecedentes = avanceavaluo.antecedentes;
    this.caracteristicasUrbanas = avanceavaluo.caracteristicasUrbanas;
    this.terreno = avanceavaluo.terreno;
    this.descripcionGralInmueble = avanceavaluo.descripcionGralInmueble;
    this.elementosConstruccion = avanceavaluo.elementosConstruccion;
    this.consideracionPreviasAvaluo = avanceavaluo.consideracionPreviasAvaluo;
    this.avaluoFisicoDirecto = avanceavaluo.avaluoFisicoDirecto;
    this.valorCapitalizacionRentas = avanceavaluo.valorCapitalizacionRentas;
    this.anexoFotografico = avanceavaluo.anexoFotografico;
   
}
}