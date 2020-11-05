import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

  export class ComunicadosService {
  
    constructor(private http: HttpClient) {}
  
   
    getComunicados() {
 
      return this.http.get<any>(`${environment.SERVER_URL}/consultaComunicadosInicio`)   
      .pipe(map(comunicados => {
        if(comunicados.ok){     
                 
         }  
      return comunicados;
    }));
  }
  
  }