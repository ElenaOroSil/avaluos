export class Asentamiento {
    idEntidad: string;
    entidad: string;
    idMunicipio: string;
    municipio: string;
    listaAsentamientos: {idAsentamiento: string,                   
                    asentamiento: string};
   
   constructor(asentamiento) {
      this.idEntidad = asentamiento.idEntidad,
      this.entidad = asentamiento.entidad,
      this.idMunicipio = asentamiento.idMunicipio,
      this.municipio = asentamiento.municipio,
      this.listaAsentamientos[asentamiento.idAsentamiento, asentamiento.asentamiento]
   }
   }