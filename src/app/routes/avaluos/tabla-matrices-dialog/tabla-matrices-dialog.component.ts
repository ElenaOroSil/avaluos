import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { TablaMatrices } from './../../../_models/desInmueble.model';
import { DescripcionInmuebleService } from './../../../_services/descripcion-inmueble.service';
import { first } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tabla-matrices-dialog',
  templateUrl: './tabla-matrices-dialog.component.html',
  styleUrls: ['./tabla-matrices-dialog.component.scss']
})
export class TablaMatricesDialogComponent implements OnInit {
  tablaMatrices: TablaMatrices;
  submitted = false;
  loading = false;
  alertTablaMatrices: boolean = false;
  msg= '';
  classAlert: string;
  idInmCons: string;
  idMatriz: string;
  listaSecciones: any[];
  seccion1Enc: any[];
  seccion1Detalle: any[];
  seccionEstructura: any[];
  seccionEstructuraDetalle: any[];
  seccionEstructura1Detalle: any[];
  seccionEstructura2Detalle: any[];
  seccionEstructura3Detalle: any[];

  seccionAcabados: any[];
  seccionAcabadosDetalle: any[];
  seccionAcabados1Detalle: any[];
  seccionAcabados2Detalle: any[];
  seccionAcabados3Detalle: any[];
  seccionAcabados4Detalle: any[];

  seccionServicios: any[];
  seccionServiciosDetalle: any[];
  seccionServicios1Detalle: any[];
  seccionServicios2Detalle: any[];
  seccionServicios3Detalle: any[];
  seccionServicios4Detalle: any[];

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private desInmService: DescripcionInmuebleService,
    public dialogRef: MatDialogRef<TablaMatricesDialogComponent>,
    @Optional()  @Inject(MAT_DIALOG_DATA) public data: any) {

      this.idInmCons = data.idInmCons;
      this.idMatriz = data.idMatriz;
     }

  ngOnInit(): void {

    this.searchMatrices();
  }

  //Llama servicio sección Descripción del Inmueble
  searchMatrices () {

    this.loading = true;
    this.desInmService.searchCalculoMatrices(this.idInmCons, this.idMatriz)
          .pipe(first())
          .subscribe( data => {   

            console.log("this.idMatriz")
            console.log(this.idMatriz)
                             
                this.loading = false;  
                //Llena tabs           
                this.listaSecciones = data.secciones; 

                switch(Number(this.idMatriz))
                { 
                case 0:
                case 1:
                case 2:               
                //Sección 1 Encabezado     
                this.seccion1Enc = this.listaSecciones[0].idSubSeccion;  
                this.seccion1Detalle = this.seccion1Enc[0].detalle;

                //Sección Estructura      
                this.seccionEstructura = this.listaSecciones[1].idSubSeccion;  
                this.seccionEstructuraDetalle = this.seccionEstructura[0].detalle;
                this.seccionEstructura1Detalle = this.seccionEstructura[1].detalle;
                this.seccionEstructura2Detalle = this.seccionEstructura[2].detalle;
                this.seccionEstructura3Detalle = this.seccionEstructura[3].detalle;


                 //Sección Acabados     
                 this.seccionAcabados = this.listaSecciones[2].idSubSeccion;  
                 this.seccionAcabadosDetalle = this.seccionAcabados[0].detalle;
                 this.seccionAcabados1Detalle = this.seccionAcabados[1].detalle;
                 this.seccionAcabados2Detalle = this.seccionAcabados[2].detalle;
                 this.seccionAcabados3Detalle = this.seccionAcabados[3].detalle;
                 this.seccionAcabados4Detalle = this.seccionAcabados[4].detalle;

                  //Sección Servicios     
                  this.seccionServicios = this.listaSecciones[3].idSubSeccion;  
                  this.seccionServiciosDetalle = this.seccionServicios[0].detalle;
                  break;
                  case 3: 
                  case null:
                  //Sección Estructura      
                  this.seccionEstructura = this.listaSecciones[0].idSubSeccion; 
                  this.seccionEstructuraDetalle = this.seccionEstructura[0].detalle;
                  this.seccionEstructura1Detalle = this.seccionEstructura[1].detalle;
                  this.seccionEstructura2Detalle = this.seccionEstructura[2].detalle;
                  this.seccionEstructura3Detalle = this.seccionEstructura[3].detalle;
  
                   //Sección Acabados     
                   this.seccionAcabados = this.listaSecciones[1].idSubSeccion;  
                   this.seccionAcabadosDetalle = this.seccionAcabados[0].detalle;
                   this.seccionAcabados1Detalle = this.seccionAcabados[1].detalle;
                   this.seccionAcabados2Detalle = this.seccionAcabados[2].detalle;
                   this.seccionAcabados3Detalle = this.seccionAcabados[3].detalle;
  
                   //Sección Servicios     
                   this.seccionServicios = this.listaSecciones[2].idSubSeccion;  
                   this.seccionServiciosDetalle = this.seccionServicios[0].detalle;
                  break;
                  case 4:
                  case null:
                  //Sección Estructura      
                  this.seccionEstructura = this.listaSecciones[0].idSubSeccion; 
                  this.seccionEstructuraDetalle = this.seccionEstructura[0].detalle;
                  this.seccionEstructura1Detalle = this.seccionEstructura[1].detalle;
                  this.seccionEstructura2Detalle = this.seccionEstructura[2].detalle;
  
                   //Sección Acabados     
                   this.seccionAcabados = this.listaSecciones[1].idSubSeccion;  
                   this.seccionAcabadosDetalle = this.seccionAcabados[0].detalle;
                   this.seccionAcabados1Detalle = this.seccionAcabados[1].detalle;
                   this.seccionAcabados2Detalle = this.seccionAcabados[2].detalle;
                  break;
                  case 5:
                  case null:
                    //Sección Estructura      
                  this.seccionEstructura = this.listaSecciones[0].idSubSeccion; 
                  this.seccionEstructuraDetalle = this.seccionEstructura[0].detalle;

                //Sección Acabados     
                this.seccionAcabados = this.listaSecciones[1].idSubSeccion;  
                this.seccionAcabadosDetalle = this.seccionAcabados[0].detalle;
                this.seccionAcabados1Detalle = this.seccionAcabados[1].detalle;
                this.seccionAcabados2Detalle = this.seccionAcabados[2].detalle;
               break;
                  default: 
                } 
                   
              },
              error => {
                this.alertTablaMatrices = true;  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
              });    
  }

  guardarMatrices() {
    this.submitted = true;

    this.tablaMatrices = {idinmconstruccion: Number(this.idInmCons), idmatriz: Number(this.idMatriz), 
      valores: ""};  

      console.log("this.tablaMatrices")
      console.log(this.tablaMatrices)

  
    this.loading = true;
    this.desInmService.addCalculoMatrices(this.tablaMatrices)
        .pipe(first())
        .subscribe(
            data => {

            if(data.ok){
              this.alertTablaMatrices = true;        
              this.loading = false;
              this.msg = data.mensaje;
              this.classAlert = 'alert-success alert alert-dismissible fade show';        
          } else {
                  this.alertTablaMatrices = true;   
                  this.loading = false;
                  this.msg = data.mensaje;
                  this.classAlert = 'alert-danger alert alert-dismissible fade show';
          }
          },
          error => {
            this.alertTablaMatrices = true;  
            this.loading = false;
            this.msg = error;
            this.classAlert = 'alert-danger alert alert-dismissible fade show';
          });
}

  closeAlertTablaMatrices(){
    this.alertTablaMatrices = false;
  }

  tabChanged(e){
     console.log(e)
    
  }

}
