import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Terreno, TerrenoFuenteLegal, TerrenoComplemento, TerrenoColindancias  } from '../_models/terreno.model'; 
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})

export class TerrenoService { 

    constructor(private http: HttpClient) {}

    addTerreno(folio: string, value: Terreno){

      console.log(value)


       return this.http.post<any>(`${environment.SERVER_URL}/terreno`, { 'Folio': folio, 'CalleFrentePuntoCard': value.callefrentepuntocard, 
       'EntreCalle': value.entrecalle, 'EntreCallePuntoCard': value.entrecallepuntocard, 'CalleY': value.calley, 
       'CalleYPuntoCard':value.calleypuntocard, 'CalleManzana': value.callemanzana, 'CalleManzanaPuntoCard':value.callemanzanapuntocard, 
       'SuperficieTotalTerreno': value.superficietotalterreno, 'DescripcionSuperficie': value.descripcionsuperficie, 'IdTipoFuenteInformacion': value.idtipofuenteinformacion, 
       'Orientacion1': value.orientacion1, 'Medida1': value.medida1, 'DetalleColindante1': value.detallecolindante1, 
       'Orientacion2': value.orientacion2, 'Medida2': value.medida2, 'DetalleColindante2': value.detallecolindante2,
       'Orientacion3': value.orientacion3, 'Medida3': value.medida3, 'DetalleColindante3': value.detallecolindante3,
       'Orientacion4': value.orientacion4, 'Medida4': value.medida4, 'DetalleColindante4': value.detallecolindante4,
    })
       .pipe(map(resp => {
             if(resp.ok){

              } 
         
           return resp;
         }));
     }


     searchTerreno(folio: string) {

      let params = new HttpParams();
      params = params.append('Folio', folio);
 
      return this.http.get<any>(`${environment.SERVER_URL}/consultaTerreno`, {params: params})   
      .pipe(map(terreno => {
      
        return terreno;
    }));
  }

  addTerrenoFuenteLegal(folio: string, value: TerrenoFuenteLegal){

    return this.http.post<any>(`${environment.SERVER_URL}/terrenoFuenteLegal`, { 'Folio': folio, 'Escritura': value.escritura, 
    'VolumenEscritura': value.volumenescritura, 'FechaEscritura': value.fechaescritura, 'NumeroNotariaEscritura': value.numeronotariaescritura, 
    'NombreNotarioEscritura':value.nombrenotarioescritura, 'IdDistritoJudicialNotario': value.iddistritojudicialnotario, 'JuzgadoSentencia':value.juzgadosentencia, 
    'FechaSentencia': value.fechasentencia, 'ExpedienteSentencia': value.expedientesentencia, 'FechaAlineaNumOficial': value.fechaalineanumoficial, 
    'FolioAlineaNumOficial': value.folioalineanumoficial, 'FechaContratoPrivado': value.fechacontratoprivado, 'NombreAdquirente': value.nombreadquirente, 
    'PaternoAdquirente': value.paternoadquirente, 'MaternoAdquirente': value.maternoadquirente, 'NombreEnajenante': value.nombreenajenante,
    'PaternoEnajenante': value.paternoenajenante, 'MaternoEnajenante': value.maternoenajenante})
    .pipe(map(resp => {
          if(resp.ok){
           }      
        return resp;
      }));
  }

  searchTerrenoFuenteLegal(folio: string) {

   let params = new HttpParams();
   params = params.append('Folio', folio);

   return this.http.get<any>(`${environment.SERVER_URL}/consultaTerrenoFuenteLegal`, {params: params})   
   .pipe(map(terreno => {

     return terreno;
 }));
}

addTerrenoComplemento(folio: string, value: TerrenoComplemento){

  return this.http.post<any>(`${environment.SERVER_URL}/terrenoComplemento`, { 'Folio': folio, 'IdTopografia': value.idtopografia, 
  'IdFormaTerreno': value.idformaterreno, 'IdDensidadHabitacional': value.iddensidadhabitacional, 'ServidumbresORestricciones': value.servidumbresorestricciones})
  .pipe(map(resp => {
        if(resp.ok){
         }      
      return resp;
    }));
}

searchTerrenoComplemento(folio: string) {

 let params = new HttpParams();
 params = params.append('Folio', folio);

 return this.http.get<any>(`${environment.SERVER_URL}/consultaTerrenoComplemento`, {params: params})   
 .pipe(map(terreno => {

   return terreno;
}));
}

addTerrenoColindancias(folio: string, value: TerrenoColindancias){

  console.log(folio)
  console.log(value)

  return this.http.post<any>(`${environment.SERVER_URL}/terrenoColindancias`, { 'Folio': folio, 'IdTerrenoColindancia': value.idterrenocolindancia, 
  'DescripcionColindancia': value.descripcioncolindancia, 'Orientacion1': value.orientacion1a, 'Medida1': value.medida1a,
  'DetalleColindante1': value.detallecolindante1a, 'Orientacion2': value.orientacion2a, 'Medida2': value.medida2a,
  'DetalleColindante2': value.detallecolindante2a, 'Orientacion3': value.orientacion3a, 'Medida3': value.medida3a,
  'DetalleColindante3': value.detallecolindante3a, 'Orientacion4': value.orientacion4a, 'Medida4': value.medida4a,
  'DetalleColindante4': value.detallecolindante4a,})
  .pipe(map(resp => {
        if(resp.ok){
         }      
      return resp;
    }));
}

searchTerrenoColindancias(folio: string) {
 let params = new HttpParams();
 params = params.append('Folio', folio);

 return this.http.get<any>(`${environment.SERVER_URL}/consultaTerrenoColindancias`, {params: params})   
 .pipe(map(terreno => {
 
  console.log(terreno)

   return terreno;
}));
}


}