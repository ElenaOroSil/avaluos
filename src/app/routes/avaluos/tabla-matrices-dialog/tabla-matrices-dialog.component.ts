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
  loading = false;
  alertTablaMatrices: boolean = false;
  msg= '';
  classAlert: string;
  idInmCons: string;
  idMatriz: string;
  listaSecciones: any[];
  listaSubSecciones: any[];
  listaDetalle: any[];
  listaDetalle2: any[];

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
                             
                this.loading = false;             
                this.listaSecciones = data.secciones; 
                console.log("this.listaSecciones"); 
                console.log(this.listaSecciones); 
                this.listaSubSecciones = this.listaSecciones[0].idSubSeccion;
                console.log("this.listaSubSecciones"); 
                console.log(this.listaSubSecciones); 
                this.listaDetalle = this.listaSubSecciones[0].detalle;
                console.log("this.listaDetalle"); 
                console.log(this.listaDetalle);  
                this.listaDetalle2 = this.listaSecciones[2].detalle;
                console.log("this.listaDetalle"); 
                console.log(this.listaDetalle2);                        
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
