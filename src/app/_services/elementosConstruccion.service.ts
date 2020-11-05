import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ElementosConstruccion } from '../_models/elementosConstruccion.model'; 
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})

export class ElementosConstruccionService { 

    constructor(private http: HttpClient) {}

    addElementosCons(folio: string, value: ElementosConstruccion){

       return this.http.post<any>(`${environment.SERVER_URL}/elementosConstruccion`, { 'Folio': folio, 'Cimientos':value.cimientos, 
       'Estructuras': value.estructuras, 'Muros': value.muros, 'Entrepisos': value.entrepisos, 
       'Techos':value.techos, 'Azoteas': value.azoteas, 'Bardas':value.bardas, 
       'Aplanados': value.aplanados, 'Plafones': value.plafones, 'Lambrines': value.lambrines, 
       'Pisos': value.pisos, 'Zoclos': value.zoclos, 'Escaleras': value.escaleras, 
       'Pintura': value.pintura, 'RecubrimientosEspeciales': value.recubrimientosEspeciales,
       'PuertasInteriores': value.puertasInteriores, 'Guardaropas': value.guardaropas, 'MueblesEmpotradosFijos': value.mueblesEmpotradosFijos,
        'MueblesBaño': value.mueblesBanio, 'RamaleosHidraulicos': value.ramaleosHidraulicos, 'RamaleosSanitarios': value.ramaleosSanitarios,
        'InstalacionesElectricas': value.instalacionesElectricas, 'Herreria': value.herreria, 'Ventaneria': value.ventaneria,
        'Vidrieria': value.vidrieria, 'Cerrajeria': value.cerrajeria, 'Fachadas': value.fachadas})
       .pipe(map(resp => {

             if(resp.ok){

              } 
         
           return resp;
 
         }));
     }


     searchElementosConst(folio: string) {

      let params = new HttpParams();
      params = params.append('Folio', folio);
 
      return this.http.get<any>(`${environment.SERVER_URL}/consultaElementosConstruccion`, {params: params})   
      .pipe(map(elementosCons => {
      
        return elementosCons;
    }));
  } 

}