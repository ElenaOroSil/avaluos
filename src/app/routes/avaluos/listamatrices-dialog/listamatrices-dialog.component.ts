import { Component, OnInit, Input } from '@angular/core';
import { Catalogo } from './../../../_models/catalogo.model';
import { CatalogosService } from './../../../_services/catalogos.service';
import { first } from 'rxjs/operators';

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

  //registro CATÁLOGOS
  listaMatrices: Catalogo[];


  constructor(private catalogoService: CatalogosService) { }

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

}
