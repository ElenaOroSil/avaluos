import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PeritosService {

  constructor(private http: HttpClient) {}

 
  getPeritos(value: string) {

    let params = new HttpParams();
    params = params.append('idSociedad', value);

    return this.http.get<any>(`${environment.SERVER_URL}/listaPeritosSociedad`, {params: params})   
    .pipe(map(perito => {
      if(perito.ok){          
           //console.log(catalogo.lista)         
       }  
    return perito.peritos;
  }));
}

}
