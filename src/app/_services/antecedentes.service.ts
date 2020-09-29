import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Solicitante, Propietario, Inmueble  } from '../_models/antecedentes.model'; 
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})

export class AntecedentesService { 

    constructor(private http: HttpClient) {}

    //SOLICITANTE
    addSolicitante(folio: string, value: Solicitante){

       return this.http.post<any>(`${environment.SERVER_URL}/solicitante`, { 'Folio': folio, 'Nombre':value.nombre, 
       'Paterno': value.paterno, 'Materno': value.materno, 'TipoPersona': value.tipoPersona, 'RFC':value.rfc, 'CURP': value.curp, 
       'TelefonoFijo':value.telefonoFijo, 'ExtTelefono': value.extTelefono, 'TelefonoMovil': value.telefonoMovil, 'CP': value.cp, 
       'IdEntidad': value.idEntidad, 'IdMunicipio': value.idMunicipio, 'IdAsentamiento': value.idAsentamiento, 'Calle': value.calle, 
       'Exterior': value.exterior, 'Interior': value.interior, 'Manzana': value.manzana, 'Lote': value.lote, 'Edificio': value.edificio})
       .pipe(map(resp => {

             if(resp.ok){

              } 
         
           return resp;
 
         }));
     }


     searchSolicitantes(folio: string) {

      let params = new HttpParams();
      params = params.append('Folio', folio);
 
      return this.http.get<any>(`${environment.SERVER_URL}/consultaSolicitante`, {params: params})   
      .pipe(map(solicitante => {
      
        return solicitante;
    }));
  }

  //PROPIETARIO
  addPropietario(folio: string, value: Propietario){

     return this.http.post<any>(`${environment.SERVER_URL}/propietario`, { 'Folio': folio, 'Nombre':value.nombre, 
     'Paterno': value.paterno, 'Materno': value.materno, 'TipoPersona': value.tipoPersona, 'RFC':value.rfc, 'CURP': value.curp, 
     'TelefonoFijo':value.telefonoFijo, 'ExtTelefono': value.extTelefono, 'TelefonoMovil': value.telefonoMovil, 'CP': value.cp, 
     'IdEntidad': value.idEntidad, 'IdMunicipio': value.idMunicipio, 'IdAsentamiento': value.idAsentamiento, 'Calle': value.calle, 
     'Exterior': value.exterior, 'Interior': value.interior, 'Manzana': value.manzana, 'Lote': value.lote, 'Edificio': value.edificio})
     .pipe(map(resp => {

           if(resp.ok){

            } 
       
         return resp;

       }));
   }


   searchPropietario(folio: string) {

    let params = new HttpParams();
    params = params.append('Folio', folio);

    return this.http.get<any>(`${environment.SERVER_URL}/consultaPropietario`, {params: params})   
    .pipe(map(propietario => {
    
      return propietario;
  }));
}

//INMUBLE
addInmueble(folio: string, value: Inmueble){

  return this.http.post<any>(`${environment.SERVER_URL}/inmueble`, { 'Folio': folio, 'Calle':value.calle, 
  'Exterior': value.exterior, 'Interior': value.interior, 'Manzana': value.manzana, 'Lote':value.lote, 'Edificio': value.edificio, 
  'CP':value.cp, 'IdEntidad': value.idEntidad, 'IdMunicipio': value.idMunicipio, 'IdAsentamiento': value.idAsentamiento, 
  'RegionPredial': value.regionPredial, 'ManzanaPredial': value.manzanaPredial, 'LotePredial': value.lotePredial, 'LocalidadPredial': value.localidadPredial, 
  'DigitoVerificador': value.digitoVerificador, 'CuentaAgua': value.cuentaAgua, 'DescInmuebleEvaluar': value.descInmuebleEvaluar, 'IdUsoConstruccion': value.idUsoConstruccion, 
  'IdClaseConstruccion': value.idClaseConstruccion, 'IdRegimenPropiedad': value.idRegimenPropiedad, 'PorcentajeIndiviso': value.porcentajeIndiviso, 
  'IdObjetoAvaluo': value.idObjetoAvaluo, 'IdPropositoAvaluo': value.idPropositoAvaluo, 'AreaCatastral': value.areaCatastral, 'ValorCatastral': value.valorCatastral,
  'CorredorEnclave': value.corredorEnclave, 'ValorCorredorEnclave': value.valorCorredorEnclave, 'CorredorOEnclave': value.corredorOEnclave,
  'ValorCorredorOEnclave': value.valorCorredorOEnclave, 'Latitud': value.latitud, 'Longitud': value.longitud, 'Altitud': value.altitud})
  .pipe(map(resp => {

        if(resp.ok){

         } 
    
      return resp;

    }));
}


searchInmuebles(folio: string) {

  let params = new HttpParams();
  params = params.append('Folio', folio);

  return this.http.get<any>(`${environment.SERVER_URL}/consultaInmueble`, {params: params})   
  .pipe(map(inmueble => {
  
    return inmueble;
}));
}

}