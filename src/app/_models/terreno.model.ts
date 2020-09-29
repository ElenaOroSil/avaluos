export class Terreno {
 callefrentef: string;
 callefrentepuntocard: number;
 entrecalle: string;
 entrecallepuntocard: number;
 calley: string;
 calleypuntocard: number;
 callemanzana: string;
 callemanzanapuntocard: number;
 superficietotalterreno: number;
 descripcionsuperficie: string;
 idtipofuenteinformacion: number;
 orientacion1: number;
 medida1: number;
 detallecolindante1: string;
 orientacion2: number;
 medida2: number;
 detallecolindante2: string;
 orientacion3: number;
 medida3: number;
 detallecolindante3: string;
 orientacion4: number;
 medida4: number;
 detallecolindante4: string;

 constructor(terreno){
    this.callefrentef = terreno.callefrentef;
    this.callefrentepuntocard = terreno.callefrentepuntocard;
    this.entrecalle = terreno.entrecalle;
    this.entrecallepuntocard= terreno.callefrentepuntocard;
    this.calley = terreno.calley;
    this.calleypuntocard = terreno.calleypuntocard;
    this.callemanzana = terreno.callemanzana;
    this.callemanzanapuntocard= terreno.callemanzanapuntocard;
    this.superficietotalterreno= terreno.superficietotalterreno;
    this.descripcionsuperficie = terreno.descripcionsuperficie;
    this.idtipofuenteinformacion = terreno.idtipofuenteinformacion;
    this.orientacion1 = terreno.orientacion1;
    this.medida1 = terreno.medida1;
    this.detallecolindante1 = terreno.detallecolindante1;
    this.orientacion2 = terreno.orientacion2;
    this.medida2 = terreno.medida2;
    this.detallecolindante2 = terreno.detallecolindante2;
    this.orientacion3 = terreno.orientacion3;
    this.medida3 = terreno.medida3;
    this.detallecolindante3 = terreno.detallecolindante3;
    this.orientacion4 = terreno.orientacion4;
    this.medida4= terreno.medida4;
    this.detallecolindante4 = terreno.detallecolindante4;

 }
}

export class TerrenoFuenteLegal {
   escritura: number;
   volumenescritura: string;
   fechaescritura: Date;
   numeronotariaescritura: number;
   nombrenotarioescritura: string;
   iddistritojudicialnotario: string;
   juzgadosentencia: string;
   fechasentencia: Date;
   expedientesentencia: string;
   fechaalineanumoficial: Date;
   folioalineanumoficial: string;
   fechacontratoprivado: Date;
   nombreadquirente: string;
   paternoadquirente: string;
   maternoadquirente: string;
   nombreenajenante: string;
   paternoenajenante: string;
   maternoenajenante: string;
  
  
   constructor(terrenofuentelegal){
      this.escritura = terrenofuentelegal.escritura;
      this.volumenescritura = terrenofuentelegal.volumenescritura;
      this.fechaescritura = terrenofuentelegal.fechaescritura;
      this.numeronotariaescritura= terrenofuentelegal.numeronotariaescritura;
      this.nombrenotarioescritura = terrenofuentelegal.nombrenotarioescritura;
      this.iddistritojudicialnotario = terrenofuentelegal.iddistritojudicialnotario;
      this.juzgadosentencia = terrenofuentelegal.juzgadosentencia;
      this.fechasentencia= terrenofuentelegal.fechasentencia;
      this.expedientesentencia= terrenofuentelegal.expedientesentencia;
      this.fechaalineanumoficial = terrenofuentelegal.fechaalineanumoficial;
      this.folioalineanumoficial = terrenofuentelegal.folioalineanumoficial;
      this.fechacontratoprivado = terrenofuentelegal.fechacontratoprivado;
      this.nombreadquirente = terrenofuentelegal.nombreadquirente;
      this.paternoadquirente = terrenofuentelegal.paternoadquirente;
      this.maternoadquirente = terrenofuentelegal.maternoadquirente;
      this.nombreenajenante = terrenofuentelegal.nombreenajenante;
      this.paternoenajenante = terrenofuentelegal.paternoenajenante;
      this.maternoenajenante = terrenofuentelegal.maternoenajenante;
  
   }
  }

  export class TerrenoComplemento {
      idtopografia: string;
      idformaterreno: number;
      iddensidadhabitacional: number;
      servidumbresorestricciones: string;
      caracteristicaspanoramicasf: string;
      intencidadconstruccionf: number;
      descintencidadconstruccionf: string;

      constructor(terrenocomplemento){
         this.idtopografia = terrenocomplemento.idtopografia;
         this.idformaterreno = terrenocomplemento.idformaterreno;
         this.iddensidadhabitacional = terrenocomplemento.iddensidadhabitacional;
         this.servidumbresorestricciones = terrenocomplemento.servidumbresorestricciones;
         this.caracteristicaspanoramicasf = terrenocomplemento.caracteristicaspanoramicasf;
         this.intencidadconstruccionf = terrenocomplemento.intencidadconstruccionf;
         this.descintencidadconstruccionf = terrenocomplemento.descintencidadconstruccionf;
      }

  }

export class TerrenoColindancias {
    idterrenocolindancia: number;
    descripcioncolindancia: string;
    orientacion1a: number;
    medida1a: number;
    detallecolindante1a: string;
    orientacion2a: number;
    medida2a: number;
    detallecolindante2a: string;
    orientacion3a: number;
    medida3a: number;
    detallecolindante3a: string;
    orientacion4a: number;
    medida4a: number;
    detallecolindante4a: string;

    constructor(terrenocolindancias){
    this.idterrenocolindancia = terrenocolindancias.idterrenocolindancia;
    this.descripcioncolindancia = terrenocolindancias.descripcioncolindancia
    this.orientacion1a = terrenocolindancias.orientacion1a
    this.medida1a = terrenocolindancias.medida1a
    this.detallecolindante1a = terrenocolindancias.detallecolindante1a
    this.orientacion2a = terrenocolindancias.orientacion2a
    this.medida2a = terrenocolindancias.medida2a
    this.detallecolindante2a = terrenocolindancias.detallecolindante2a
    this.orientacion3a = terrenocolindancias.orientacion3a
    this.medida3a = terrenocolindancias.medida3a
    this.detallecolindante3a = terrenocolindancias.detallecolindante3a
    this.orientacion4a = terrenocolindancias.orientacion4a
    this.medida4a = terrenocolindancias.medida4a
    this.detallecolindante4a = terrenocolindancias.detallecolindante4a


     }

}