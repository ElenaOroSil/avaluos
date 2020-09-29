import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AddAvaluo, FilterAvaluo } from '../_models/avaluo.model'; 
import { environment } from '../../environments/environment';



@Injectable({providedIn: 'root'})

  export class AvaluosService {

  folio: string;
  solicitante: string;
  fechaInicial: string;
  fechaFinal: string;
  idtipoavaluo: string;
  idestatusavaluo: string;

    constructor(private http: HttpClient) {}

    addAvaluo(value: AddAvaluo, user: string){

       return this.http.post<any>(`${environment.SERVER_URL}/registroAvaluo`, { 'Folio': value.folio, 'Tipo':value.idtipoavaluo,
       'Fecha':value.fechaavaluo, 'Sociedad':"null", 'Perito':value.idPerito, 'Operador': user})
       .pipe(map(resp => {
             if(resp.ok){
                  console.log(resp)
              } 
         
           return resp;
 
         }));
     }


     searchAvaluos(user: string) {

      let params = new HttpParams();
      params = params.append('Usuario', user);
  
      return this.http.get<any>(`${environment.SERVER_URL}/ConsultaAvaluos`, {params: params})   
      .pipe(map(avaluos => {
        if(avaluos.ok){  
       
         }  
      return avaluos.lista;
    }));
  }

  filterAvaluos(filter: FilterAvaluo[]) {

    this.folio = filter[0].folio;
    this.solicitante = filter[0].solicitante;
    this.fechaInicial = filter[0].fechaInicial;
    this.fechaFinal = filter[0].fechaFinal;
    this.idtipoavaluo= String(filter[0].idtipoavaluo);
    this.idestatusavaluo = String(filter[0].idestatusavaluo);


    let params = new HttpParams();
    params = params.append('Folio', this.folio);
    params = params.append('FechaIni', this.fechaInicial);
    params = params.append('FechaFin', this.fechaFinal);
    params = params.append('TipoAvaluo', this.idtipoavaluo);
    params = params.append('Solicitante', this.solicitante);
    params = params.append('Estatus', this.idestatusavaluo);


    return this.http.get<any>(`${environment.SERVER_URL}/filtroAvaluos`, {params: params})   
    .pipe(map(avaluos => {
      if(avaluos.ok){ 

           //console.log(catalogo.lista)         
       }  
    return avaluos.avaluos;
  }));
}


avanceAvaluo(folio: string) {

  let params = new HttpParams();
  params = params.append('Folio', folio);

  return this.http.get<any>(`${environment.SERVER_URL}/consultaAvanceAvaluo`, {params: params})   
  .pipe(map(avaluos => {
    if(avaluos.ok){ 

      
       
     }  
  return avaluos.lista;
}));
} 

  }


