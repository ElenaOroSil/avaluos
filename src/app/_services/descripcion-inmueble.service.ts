import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DescripcionInmueble, TablaEdoGralConservacion,   } from '../_models/desInmueble.model'; 
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DescripcionInmuebleService {

  constructor(private http: HttpClient) { }

  addConstruccion(folio: string, value: DescripcionInmueble){


     return this.http.post<any>(`${environment.SERVER_URL}/InmuebleConstrucciones`, { 'IdInmConstruccion': value.idinmconstruccion, 
     'Folio': folio, 'TipoConstruccion': value.tipoconstruccion, 'IdTipoConstruccion': value.idtipoconstruccion, 
     'Superficie': value.superficie, 'DescripcionModulo':value.descripcionmodulo, 'NivelTipo': value.niveltipo, 
     'IdUsoConstruccion':value.idusoconstruccion, 'IdRangoNivelTGDF': value.idrangoniveltgdf, 'Edad': value.edad, 
     'IdEstadoConservacion': value.idestadoconservacion, 'Indiviso': value.indiviso })
     .pipe(map(resp => {
           if(resp.ok){

            } 
       
         return resp;
       }));
   }


  searchConstruccion(folio: string, tpoCons: string) {

    let params = new HttpParams();
    params = params.append('Folio', folio);
    params = params.append('TipoConstruccion', tpoCons);

    return this.http.get<any>(`${environment.SERVER_URL}/consultaInmuebleConstruc`, {params: params})   
    .pipe(map(desInmConstruccion => {
    
      return desInmConstruccion;
  }));
}


addTablaConservacion(folio: string, value: TablaEdoGralConservacion){


 // console.log("SERVICIO")
 // console.log(folio)
 // console.log(value)

  return this.http.post<any>(`${environment.SERVER_URL}/tablaConservacion`, { 'Folio': folio, 
  'IdInmconstruccion': value.idinmuebleconstruccion, 'IdClaseConstruccion': value.claseconstruccion, 
  'IdPartidaPorcentaje': value.idpartidaporcentaje, 'IdPartidaConserva': value.idpartidaconserva })
  .pipe(map(resp => {
        if(resp.ok){

         } 
    
      return resp;
    }));
}


searchTablaConservacion(folio: string, idInmConstruccion: string, claseConstruccion: string) {

  let params = new HttpParams();
  params = params.append('Folio', folio);
  params = params.append('IdInmConstruccion', idInmConstruccion);
  params = params.append('Clase', claseConstruccion);

  return this.http.get<any>(`${environment.SERVER_URL}/consultaTablaConservacion`, {params: params})   
  .pipe(map(tablaConservacion => {
  
    return tablaConservacion;
}));
}


addSinMatrices(folio: string, value: TablaEdoGralConservacion){

  return this.http.post<any>(`${environment.SERVER_URL}/sinMatrices`, {  'IdInmconstruccion': value.idinmuebleconstruccion,
  'Folio': folio, 'TipoConstruccion': 0, 
  'IdPartidaPorcentaje': value.idpartidaporcentaje, 'IdPartidaConserva': value.idpartidaconserva })
  .pipe(map(resp => {
        if(resp.ok){

         } 
    
      return resp;
    }));
}


}
