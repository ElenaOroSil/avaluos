import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DescripcionInmueble  } from '../_models/desInmueble.model'; 
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DescripcionInmuebleService {

  constructor(private http: HttpClient) { }

  addConstruccion(folio: string, value: DescripcionInmueble){

    console.log("paso1")

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

}
