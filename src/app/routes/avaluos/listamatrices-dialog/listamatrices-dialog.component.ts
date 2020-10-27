import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Catalogo } from './../../../_models/catalogo.model';
import { CatalogosService } from './../../../_services/catalogos.service';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TablaMatricesDialogComponent } from './../tabla-matrices-dialog/tabla-matrices-dialog.component';

@Component({
  selector: 'app-listamatrices-dialog',
  templateUrl: './listamatrices-dialog.component.html',
  styleUrls: ['./listamatrices-dialog.component.scss']
})
export class ListamatricesDialogComponent implements OnInit {
  loading = false;
  alertListaMatrices: boolean = false;
  msg= '';
  classAlert: string;
  idInmCons: number;
  idMatriz: number;

  //registro CATÁLOGOS
  listaMatrices: Catalogo[];


  constructor(private catalogoService: CatalogosService,
    public dialog: MatDialog,public dialogRef: MatDialogRef<ListamatricesDialogComponent>,
    @Optional()  @Inject(MAT_DIALOG_DATA) public data: any) {

      this.idInmCons = data.idInmCons;

     }

  ngOnInit(): void {

          //Combos de Colindancias
          this.getCatalogoListMatrices();  
        }

  //Llama servicio sección Descripción del Inmueble
  getCatalogoListMatrices () {

    this.loading = true;
    this.catalogoService.getCatalogoMatrices()
          .pipe(first())
          .subscribe( data => {   
                             
                this.loading = false;             
                  this.listaMatrices = data;                
              },
              error => {
                this.alertListaMatrices = true;  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
              });    
  }


  closeAlertLisMatrices(){
    this.alertListaMatrices = false;
  }

  consultaDetalle(e) {

     switch(e.clave)
     { 
       case 1:
       this.idMatriz = e.clave; 
       break;
       case 2:
         this.idMatriz = e.clave; 
       break;
       case 3:
         this.idMatriz = e.clave; 
       break;
       case 4:
         this.idMatriz = e.clave;  
       break;
       case 5:
        this.idMatriz = e.clave; 
      break;
       default: 
     }  

     this.openDialogTabMatrices(this.idInmCons,  this.idMatriz);
    
  }


  //Abre modal de la tabla de Matrices
  openDialogTabMatrices(idInmCons: number, idMatriz: number): void {

  const dialogRef = this.dialog.open(TablaMatricesDialogComponent, {
    disableClose: true,
    width: '1200px',
    data: { idInmCons: idInmCons, idMatriz: idMatriz}
  });

  dialogRef.afterClosed().subscribe(res => {

    this.dialogRef.close();
        
  });

}

}
