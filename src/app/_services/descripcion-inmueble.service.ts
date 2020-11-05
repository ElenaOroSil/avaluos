import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DescripcionInmueble, TablaEdoGralConservacion, TablaMatrices, 
PrivativaComun, OtrosDatosPC, SinMatrices } from '../_models/desInmueble.model'; 
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DescripcionInmuebleService {

  constructor(private http: HttpClient) { }

  addConstruccion(folio: string, value: DescripcionInmueble){

     return this.http.post<any>(`${environment.SERVER_URL}/InmuebleConstrucciones`, { 'IdInmConstruccion': value.idinmconstruccion, 
     'Folio': folio, 'TipoConstruccion': value.tipoconstruccion, 'IdTipoConstruccion': Number(value.idtipoconstruccion), 
     'Superficie': Number(value.superficie), 'DescripcionModulo':value.descripcionmodulo, 'NivelTipo': Number(value.niveltipo), 
     'IdUsoConstruccion':value.idusoconstruccion, 'IdRangoNivelTGDF': value.idrangoniveltgdf, 'Edad': Number(value.edad), 
     'IdEstadoConservacion': Number(value.idestadoconservacion), 'Indiviso': Number(value.indiviso) })
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

  return this.http.post<any>(`${environment.SERVER_URL}/tablaConservacion`, { 'Folio': folio, 
  'IdInmConstruccion': value.idinmuebleconstruccion, 'IdClaseConstruccion': value.claseconstruccion, 
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


addSinMatrices(folio: string, value: SinMatrices){

  console.log("folio")
  console.log(folio)
  console.log(value)

  return this.http.post<any>(`${environment.SERVER_URL}/sinMatrices`, {  'IdInmConstruccion': value.idinmuebleconstruccion,
  'Folio': folio, 'TipoConstruccion': value.tipoconstruccion, 'ClaseSM': value.clasesm, 'PuntajeSM': value.puntajesm})
  .pipe(map(resp => {
        if(resp.ok){

         } 
    
      return resp;
    }));
}

searchCalculoMatrices(idInmConstruccion: string, idMatriz: string){

  let params = new HttpParams()
  params = params.append('IdInmConstruccion', idInmConstruccion);
  params = params.append('IdMatriz', idMatriz);

  return this.http.get<any>(`${environment.SERVER_URL}/consultaCalculoMatriz`, {params: params})   
  .pipe(map(listaMatriz => {
  
    return listaMatriz;
}));
}

addCalculoMatrices(idInmConstruccion: number, idMatriz: number, valores: string){

  console.log(idInmConstruccion)
  console.log(idMatriz)
  console.log(valores)

  return this.http.post<any>(`${environment.SERVER_URL}/CalculoMatriz`, {  'IdInmConstruccion': idInmConstruccion,
  'IdMatriz': idMatriz, 'Valores': valores })
  .pipe(map(resp => {
        if(resp.ok){

         }     
      return resp;
    }));
}

searchPrivativaComun(folio: string, tipoConstruccion: string){
 
   let params = new HttpParams()
   params = params.append('Folio', folio);
   params = params.append('TipoConstruccion', tipoConstruccion);
 
   return this.http.get<any>(`${environment.SERVER_URL}/consultaDescGeneralInmuebleComple`, {params: params})   
   .pipe(map(desGralComple => {
   
     return desGralComple;
 }));
 }

 addPrivativaComun(data: PrivativaComun){

  return this.http.post<any>(`${environment.SERVER_URL}/descGeneralInmuebleComple`, {  'IdInmConstruccion': data.idinmconstruccion,
  'ValorUniRepoNuevo': data.valorunireponuevo, 'LosaConcreto': data.losaconcreto })
  .pipe(map(resp => {
        if(resp.ok){


         } 
    
      return resp;
    }));
}

searchDesGralInmueble(folio: string){
 
  let params = new HttpParams()
  params = params.append('Folio', folio);


  return this.http.get<any>(`${environment.SERVER_URL}/consultaDescGeneralInmueble`, {params: params})   
  .pipe(map(desGralInmueble => {
  
    return desGralInmueble;
}));
}

addDesGralInmueble(folio: string, data: OtrosDatosPC){

  return this.http.post<any>(`${environment.SERVER_URL}/descGeneralInmueble`, {  'Folio': folio,
  'UsoActual': data.usoactual, 'NumeroNiveles': data.numeroniveles, 'EstadoConservacion': data.estadoconservacion,
  'CalidadProyecto':  data.calidadproyecto, 'UnidadesRentableSuscep': data.unidadesrentablessuscep,
  'PorcSuperfUltRespecAnt': data.porcsuperfyultrespecant, 'AvanceObra': data.avanceobra})
  .pipe(map(resp => {
        if(resp.ok){


         } 
    
      return resp;
    }));
}
}


