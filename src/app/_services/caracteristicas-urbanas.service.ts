import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CaractUrbanas, EquipamientoUrbano } from '../_models/caractUrbanas.model'; 
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})

export class CaracteristicasUrbanasService { 

    constructor(private http: HttpClient) {}

    addCaractUrbanas(folio: string, value: CaractUrbanas){

       return this.http.post<any>(`${environment.SERVER_URL}/caractUrbanas`, { 'Folio': folio, 'IdClasificacionZona':value.idclasifzona, 
       'IdEstatusClasificacionZona': value.idestatusclasifzona, 'TipoConstruccion': value.tipoconstruccion, 'IdIndiceSaturacionZona': value.idindicesaturacionzona, 
       'IndiceSaturacionZonaValor':value.indicesaturacionzonavalor, 'IdNivelSocioEconomico': value.idnivelsocioeconomico, 'IdDensidadPoblacion':value.iddensidadpoblacion, 
       'ContaminacionAmbientalZona': value.contambientalzona, 'IdUsoSuelo': value.idusosuelo, 'NumeroMaximoNivelesConstruir': value.nummaxnivelesconst, 
       'PorcentajeAreaLibre': value.porcentajearealibre, 'IdDensidadVivienda': value.iddensidadvivienda, 'SuperficieLoteMinimo': value.superficielotemin, 
       'SuperficieLoteTipo': value.superficielotetipo, 'ViasAccesoEImportancia': value.viasaccesoeimportancia})
       .pipe(map(resp => {

             if(resp.ok){

              } 
         
           return resp;
 
         }));
     }


     searchCaractUrbanas(folio: string) {

      let params = new HttpParams();
      params = params.append('Folio', folio);
 
      return this.http.get<any>(`${environment.SERVER_URL}/consultaCaractUrbanas`, {params: params})   
      .pipe(map(caractUrbanas => {
      
        return caractUrbanas;
    }));
  }


  addEquipamientoUrbano(folio: string, value: EquipamientoUrbano){

    console.log("value")
    console.log(value)

     return this.http.post<any>(`${environment.SERVER_URL}/equipaUrbano`, { 'Folio': folio, 'IdSuministroTelefonico':value.idsuministrotelefonico, 
     'IdAcometidaInmueble': value.idacometidainmueble, 'IdSenalizacionVias': value.idsenalizacionvias, 'IdNomenclaturaCalle': value.idnomenclaturacalle, 
     'DistanciaTransporteUrbano':value.distanciatransporteurbano, 'FrecuenciaTransporteUrbano': value.frecuenciatransporteurbano, 'DistanciaTransporteSuburbano':value.distanciatransportesuburbano, 
     'FrecuenciaTransporteSuburbano': value.frecuenciatransportesuburbano, 'IdRecoleccionBasura': value.idrecoleccionbasura, 'Templo': value.templos, 
     'Mercados': value.mercados, 'PlazasPublicas': value.plazaspublicas, 'ParquesJardines': value.parquesjardines, 
     'Escuelas': value.escuelas, 'Hospitales': value.hospitales, 'Bancos': value.bancos, 'EstacionTransporte': value.estaciontransporte})
     .pipe(map(resp => {

           if(resp.ok){

            } 
       
         return resp;

       }));
   }


   searchEquipamientoUrbano(folio: string) {

    let params = new HttpParams();
    params = params.append('Folio', folio);

    return this.http.get<any>(`${environment.SERVER_URL}/consultaEquipamientoUrbano`, {params: params})   
    .pipe(map(equipamientoUrbano => {
    
      return equipamientoUrbano;
  }));
}



}