import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private http: HttpClient) {}

  //Llena catálogos para Alta de Avalúo
  getCatalogoAvaluo(tipo: string) {

    let params = new HttpParams();
    params = params.append('Catalogo', tipo);


    return this.http.get<any>(`${environment.SERVER_URL}/listaFiltroAvaluos`, {params: params})   
    .pipe(map(catalogo => {
      if(catalogo.ok){  
 
       }  
    return catalogo.lista;
  }));
}

//Llena catálogos para Características Urbanas
getCatalogoCaractUrb(tipo: string) {

  let params = new HttpParams();
  params = params.append('Catalogo', tipo);

  return this.http.get<any>(`${environment.SERVER_URL}/listaCaracUrbanas`, {params: params})   
  .pipe(map(catalogo => {
    if(catalogo.ok){   
        
     }  
  return catalogo.lista;
}));
}

//Llena catálogos para Equipamiento Urbano
getCatalogoEquipaUrbano(tipo: string) {

  let params = new HttpParams();
  params = params.append('Catalogo', tipo);

  return this.http.get<any>(`${environment.SERVER_URL}/listaEquipamientoUrbano`, {params: params})   
  .pipe(map(catalogo => {
    if(catalogo.ok){   
        
     }  
  return catalogo.lista;
}));
}


//Llena catálogos para Terreno
getCatalogoTerreno(tipo: string) {

  let params = new HttpParams();
  params = params.append('Catalogo', tipo);

  return this.http.get<any>(`${environment.SERVER_URL}/listaTerreno`, {params: params})   
  .pipe(map(catalogo => {
    if(catalogo.ok){   
        
     }  
  return catalogo.lista;
}));
}


//Llena catálogos para Terreno
getCatalogoListaInmueble(tipo: string) {

  let params = new HttpParams();
  params = params.append('Catalogo', tipo);

  return this.http.get<any>(`${environment.SERVER_URL}/listaInmueble`, {params: params})   
  .pipe(map(catalogo => {
    if(catalogo.ok){   
        
     }  
  return catalogo.lista;
}));
}

//Llena catálogo Descripción del Inmueble
getCatalogosDesInmueble(tipo: string) {

  let params = new HttpParams();
  params = params.append('Catalogo', tipo);

  return this.http.get<any>(`${environment.SERVER_URL}/listaDesGralInmueble`, {params: params})   
  .pipe(map(catalogo => {
    if(catalogo.ok){   
        
     }  
  return catalogo.lista;
}));
}

//Llena catálogo Tipo construcción
getCatalogoTpoConstruccion(catalogo: string, tipo: string) {

  let params = new HttpParams();
  params = params.append('Catalogo', catalogo);
  params = params.append('TipoConstruccion', tipo);

  return this.http.get<any>(`${environment.SERVER_URL}/listaDesGralInmueble`, {params: params})   
  .pipe(map(catalogo => {
    if(catalogo.ok){   
             
     }  
  return catalogo.lista;
}));
}

}
