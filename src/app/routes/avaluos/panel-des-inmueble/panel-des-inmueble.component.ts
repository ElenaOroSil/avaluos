import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegistroconstruccionDialogComponent } from '../registroconstruccion-dialog/registroconstruccion-dialog.component';
import { DescripcionInmuebleService } from '../../../_services/descripcion-inmueble.service';
import { first } from 'rxjs/operators';
import { DescripcionInmueble } from './../../../_models/desInmueble.model';
import { Observable, ReplaySubject } from 'rxjs';

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
  subject$: ReplaySubject<DescripcionInmueble[]> = new ReplaySubject<DescripcionInmueble[]>(1);
  alertDesInmueble: boolean = false;
  msg= '';
  classAlert: string;

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private desInmService: DescripcionInmuebleService) { }

  ngOnInit(): void {

    this.desInmueble1FormGroup = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      claveUso: ['', [Validators.required]],
      numNivelesTipo: ['', [Validators.required]],
      claveRangoNiveles: ['', [Validators.required]],
      puntajeClasif: ['', [Validators.required]],
      claveClase: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      vidaUtilTipo: ['', [Validators.required]],
      vidaUtilRemanente: ['', [Validators.required]],
      claveConservacion: ['', [Validators.required]],
      superficie: ['', [Validators.required]],
      valorUnitarioRepNvo: ['', [Validators.required]],
      factorEdad: ['', [Validators.required]],
      factorResultante: ['', [Validators.required]],
      valorFraccionN: ['', [Validators.required]],
      valorUniCatastral: ['', [Validators.required]],
      depreciacionEdad: ['', [Validators.required]],
      supTotalPrivativas: ['', [Validators.required]],
      valorTotalPrivativas: ['', [Validators.required]],
      valorTotalPrivativasIndiviso: ['', [Validators.required]],
    });  
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
      //this.searchComunes();   
  });
}

 //Llama servicio para la consulta de terreno
 searchConstruccion (res: string) {
    
  this.loading = true;
  this.desInmService.searchConstruccion(this.folio, res)
         .pipe(first())
         .subscribe( data => {                    
               this.loading = false;
               this.info = data.colindancias;
               this.subject$.next(this.info);

             },
             error => {
              this.alertDesInmueble = true;  
              this.loading = false;
              this.msg = error;
              this.classAlert = 'alert-danger alert alert-dismissible fade show';
             });                           
     }

}
