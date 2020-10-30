import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { TablaMatrices } from './../../../_models/desInmueble.model';
import { DescripcionInmuebleService } from './../../../_services/descripcion-inmueble.service';
import { first } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-tabla-matrices-dialog',
  templateUrl: './tabla-matrices-dialog.component.html',
  styleUrls: ['./tabla-matrices-dialog.component.scss']
})
export class TablaMatricesDialogComponent implements OnInit {
  matrizFormGroup: FormGroup;
  tablaMatrices: TablaMatrices;
  submitted = false;
  loading = false;
  alertTablaMatrices: boolean = false;
  msg= '';
  classAlert: string;
  idInmCons: string;
  idMatriz: string;
  desMatriz: string;

  idSeccion: string;
  idSeccionEst: string;
  idSeccionAca: string;
  idSeccionSer: string;

  valores = [];
  val: any[] = [];
  valParam: string;

  listaSecciones: any[];
  finalArray: any[] = [];
  finalArrayEstructura: any[] = [];

  viewTab: boolean = true;
  guardar: boolean = true;

  seccion1: any[];
  subSeccion1: any[];

  seccionEstructura: any[];
  subSeccionEstructura: any[];

  seccionAcabados: any[];
  subSeccionAcabados: any[];

  seccionServicios: any[];
  subSeccionServicios: any[];

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

     //Sección TerrenoColindancias
     this.matrizFormGroup = this.formBuilder.group({
      'opciones': new FormControl(''),   
    });
  }


  //Llama servicio sección Descripción del Inmueble
  searchMatrices () {   

    this.loading = true;
    this.desInmService.searchCalculoMatrices(this.idInmCons, this.idMatriz)
          .pipe(first())
          .subscribe( data => {   

                                   
               this.loading = false;  
                //Llena tabs           
                this.listaSecciones = data.secciones; 
                this.idMatriz = data.idMatriz;
                this.desMatriz = data.matriz;

                switch(Number(this.idMatriz))
                { 
                  case 1:
                  case 2:

                //Sección 1 Encabezado     
                this.seccion1 = this.listaSecciones[0];
                this.subSeccion1 = this.seccion1["idSubSeccion"];
                this.idSeccion = this.seccion1["idSeccion"];
       
                //Sección Estructura      
                this.seccionEstructura = this.listaSecciones[1];  
                this.subSeccionEstructura = this.seccionEstructura["idSubSeccion"];
                this.idSeccionEst = this.seccionEstructura["idSeccion"];

                //Sección Acabados     
                this.seccionAcabados = this.listaSecciones[2];  
                this.subSeccionAcabados = this.seccionAcabados["idSubSeccion"];
                this.idSeccionAca = this.seccionAcabados["idSeccion"];

                //Sección Servicios     
                this.seccionServicios = this.listaSecciones[3];  
                this.subSeccionServicios = this.seccionServicios["idSubSeccion"];
                this.idSeccionSer = this.seccionServicios["idSeccion"];
                  break;
                  case 3:
                //Sección Estructura      
                this.seccionEstructura = this.listaSecciones[0];  
                this.subSeccionEstructura = this.seccionEstructura["idSubSeccion"];
                this.idSeccionEst = this.seccionEstructura["idSeccion"];

                //Sección Acabados     
                this.seccionAcabados = this.listaSecciones[1];  
                this.subSeccionAcabados = this.seccionAcabados["idSubSeccion"];
                this.idSeccionAca = this.seccionAcabados["idSeccion"];

                //Sección Servicios     
                this.seccionServicios = this.listaSecciones[2];  
                this.subSeccionServicios = this.seccionServicios["idSubSeccion"];
                this.idSeccionSer = this.seccionServicios["idSeccion"];

                  break;
                  case 4:
                  case 5:
                    this.viewTab = false;
                    //Sección Estructura      
                    this.seccionEstructura = this.listaSecciones[0];  
                    this.subSeccionEstructura = this.seccionEstructura["idSubSeccion"];
                    this.idSeccionEst = this.seccionEstructura["idSeccion"];
    
                    //Sección Acabados     
                    this.seccionAcabados = this.listaSecciones[1];  
                    this.subSeccionAcabados = this.seccionAcabados["idSubSeccion"];
                    this.idSeccionAca = this.seccionAcabados["idSeccion"];
    
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

     // convenience getter for easy access to form fields
     get ant1() { return this.matrizFormGroup.controls; }

  guardarMatrices() {
    this.submitted = true;

      //this.finalArray.forEach(element => console.log(element.seccion + "," + 
      //element.idsubseccion + "," + element.clase + "," + element.puntos + "|")); 
 
      //  this.finalArray.forEach(element => console.log(element.seccion + "," + element.idsubseccion + "," + 
      //  element.clase + "," + element.puntos + "|")         
      //);  


      //this.finalArray.forEach((item) => {
      //  console.log("DATA")
       // this.valores = item.seccion + "," + item.idsubseccion + "," + item.clase + "," + item.puntos + "|";
      //  this.data.add(this.valores);
      //});


      this.finalArray.forEach((item) => {
        
        this.valores.push(item.seccion);
        this.valores.push(item.idsubseccion);
        this.valores.push(item.clase);
        this.valores.push(item.puntos);
        this.valores.push("|");
      
       });

       this.val.push(this.valores);  
       this.valParam = this.val.toString();



 
    this.loading = true;
    this.desInmService.addCalculoMatrices(Number(this.idInmCons), Number(this.idMatriz), 
    this.valParam)
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

  radioChange(event: MatRadioChange, data, item, seccion) {
    switch(seccion)
    { 
      case 1:
        var obj = this.subSeccion1.filter(x => x.id == data.id)[0];
        obj.seccion = seccion;
        obj.idsubseccion = data.idSubSeccion;   
        obj.clase = item.clase;
        obj.puntos = item.puntos; 
        
        console.log(this.finalArray.some(x => x.idsubseccion == data.idsubseccion))
        if (!this.finalArray.some(x => x.idsubseccion == data.idsubseccion)) {
          this.finalArray.push(obj);
        }
    break;
    case 2:
      var obj = this.subSeccionEstructura.filter(x => x.idSubSeccion == data.idSubSeccion)[0];
      obj.seccion = seccion;
      obj.idsubseccion = obj.idSubSeccion;   
      obj.clase = item.clase;
      obj.puntos = item.puntos;

      console.log(this.finalArray.some(x => x.idSubSeccion == data.idSubSeccion))
      if (!this.finalArray.some(x => x.idSubSeccion == data.idSubSeccion)) {
        this.finalArray.push(obj);
      }
    break;
    case 3:
        var obj = this.subSeccionAcabados.filter(x => x.idSubSeccion == data.idSubSeccion)[0];
        obj.seccion = seccion;
        obj.idsubseccion = obj.idSubSeccion; 
        obj.clase = item.clase;
        obj.puntos = item.puntos;   

        console.log(this.finalArray.some(x => x.idSubSeccion == data.idSubSeccion))
        if (!this.finalArray.some(x => x.idSubSeccion == data.idSubSeccion)) {
          this.finalArray.push(obj);
        }
    break;
    case 4:
        var obj = this.subSeccionServicios.filter(x => x.idSubSeccion == data.idSubSeccion)[0];
        obj.seccion = seccion;
        obj.idsubseccion = obj.idSubSeccion;   
        obj.clase = item.clase;
        obj.puntos = item.puntos;  

        console.log(this.finalArray.some(x => x.idSubSeccion == data.idSubSeccion))
        if (!this.finalArray.some(x => x.id == data.idSubSeccion)) {
          this.finalArray.push(obj);
        }
    break;
    default: 
    }   
  }

  onTabChanged($event) {
   
    switch($event.index)
    { 
      case 0:
        this.guardar = true;
      break;
      case 1:
        this.guardar = false;
      break;
      case 2:
        this.guardar = false;
      break;
      default:
    }
  }
}
