import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegistroconstruccionDialogComponent } from '../registroconstruccion-dialog/registroconstruccion-dialog.component';
import { DescripcionInmuebleService } from '../../../_services/descripcion-inmueble.service';
import { first } from 'rxjs/operators';
import { DescripcionInmueble } from './../../../_models/desInmueble.model';
import { Observable, ReplaySubject } from 'rxjs';
import { TableColumn } from './../../../../@vex/interfaces/table-column.interface';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-panel-des-inmueble',
  templateUrl: './panel-des-inmueble.component.html',
  styleUrls: ['./panel-des-inmueble.component.scss']
})


export class PanelDesInmuebleComponent implements OnInit {
  isLinear = false;
  desInmueble1FormGroup: FormGroup;
  desInmueble2FormGroup: FormGroup;
  name: string;
  color: string;
  loading = false;
  folio = localStorage.getItem('folio');
  info: any = {};
  alertDesInmueble: boolean = false;
  msg= '';
  classAlert: string;
  data: DescripcionInmueble[] = [];
  //dataSource: DescripcionInmueble;
  displayedColumns = ['id', 'folio', 'tipoConstruccion', 'idTipoConstruccion', 'superficie',
  'descripcionModulo', 'nivelTipo', 'idUsoConstruccion', 'idRangoNivelTGFD', 'claseF', 'puntajeF',
  'edad', 'idEstadoConservacion', 'indiviso', 'idClaseConstruccionF', 'estadoGralConservacionF',
  'vidaMinimaRemanenteF', 'indiceCostosRemanenteF', 'totalPuntosAjustadosF', 'claseSM', 'puntajeSM'];

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private desInmService: DescripcionInmuebleService) { }


  ngOnInit(): void {

    
    //busca construcciones
    this.searchConstruccion("P");
  }

  //Abre modal para el registro de la construcción
openDialog(): void {
  const dialogRef = this.dialog.open(RegistroconstruccionDialogComponent, {
    width: '1200px',
    data: { name: this.name, color: this.color }
  });

  dialogRef.afterClosed().subscribe(res => {
    this.color = res;   
      this.searchConstruccion(res);        
  });
}

 //Llama servicio para la consulta de terreno
 searchConstruccion (res: string) {
    
  this.loading = true;
  this.desInmService.searchConstruccion(this.folio, res)
         .pipe(first())
         .subscribe( data => {                    
               this.loading = false;
               this.data = data.inmuebleConstrucciones
               
               console.log("this.info")
               console.log(this.info)

             },
             error => {
              this.alertDesInmueble = true;  
              this.loading = false;
              this.msg = error;
              this.classAlert = 'alert-danger alert alert-dismissible fade show';
             });                           
     }

}








