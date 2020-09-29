import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AsentamientoService {

  constructor(private http: HttpClient) {}

 
  getAsentamientos(value: string) {

    let params = new HttpParams();
    params = params.append('CP', value);

    return this.http.get<any>(`${environment.SERVER_URL}/consultaCP`, {params: params})   
    .pipe(map(asentamientos => {
      if(asentamientos.ok){     
               
       }  
    return asentamientos;
  }));
}

}