import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Visita } from '../_models/visita.model'; 
import { environment } from '../../environments/environment';


@Injectable({providedIn: 'root'})

  export class VisitasService { 

    constructor(private http: HttpClient) {}

    addVisita(folio: string, value: Visita){

       return this.http.post<any>(`${environment.SERVER_URL}/visita`, { 'Folio': folio, 'NombreContacto':value.nombreContacto,
       'PaternoContacto':value.paternoContacto, 'MaternoContacto': value.maternoContacto, 'CorreoElectronico':value.correoElectronico, 
       'TelefonoFijo': value.telefonoFijo, 'ExtTelefono': value.extTelefono, 'TelefonoMovil': value.telefonoMovil, 'FechaVisita': value.fechaVisita,
        'HoraVisita': value.horaVisita, 'Observaciones': value.observaciones})
       .pipe(map(resp => {

             if(resp.ok){

              } 
         
           return resp;
 
         }));
     }


     searchVisitas(folio: string) {

      let params = new HttpParams();
      params = params.append('Folio', folio);
 
      return this.http.get<any>(`${environment.SERVER_URL}/consultaVisita`, {params: params})   
      .pipe(map(visita => {
      
        return visita;
    }));
  }

  
 

  }