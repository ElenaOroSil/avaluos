import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalAvaluo } from '../../../models/model_avaluo';
import { Catalogo } from './../../../_models/catalogo.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CatalogosService } from './../../../_services/catalogos.service';
import { PeritosService } from './../../../_services/peritos.service';
import { Perito } from './../../../_models/perito.model'; 
import { first } from 'rxjs/operators';
import { AvaluosService } from './../../../_services/avaluos.service';
import { AddAvaluo } from './../../../_models/avaluo.model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-alta-dialog',
  templateUrl: './alta-dialog.component.html',
  styleUrls: ['./alta-dialog.component.scss']
})
export class AltaDialogComponent implements OnInit {
  reactiveForm: FormGroup;
  estatusAvaluo: Catalogo[];
  tpoAvaluo: Catalogo[];
  peritos: Perito[];
  submitted = false;
  avaluo: AddAvaluo;
  idusuario: string;
  loading = false;
  alert: boolean = false;
  classAlert: string;
  msg= '';


  constructor(private fb: FormBuilder, private datePipe: DatePipe,
    private catalogoService: CatalogosService,
    private peritoService: PeritosService,
    private avaluosService: AvaluosService,
    public dialogRef: MatDialogRef<AltaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalAvaluo) {

      this.reactiveForm = this.fb.group({
        folio: ['', [Validators.required]],
        tpoAvaluo: ['',[Validators.required]],
        perito: ['', [Validators.required]],
        sociedad: [ {value : '', disabled: true }, Validators.required],
        fechaAvaluo: ['', [Validators.required]],
      })

     }

  ngOnInit(): void {

    this.getTpoAvaluo("TIPOAVALUO");
    this.getPeritos("");
     

  }

  getTpoAvaluo (tipo: string) {

    this.loading = true;
   this.catalogoService.getCatalogoAvaluo(tipo)
          .pipe(first())
          .subscribe( data => {                    
                this.loading = false;
                this.tpoAvaluo = data;
         
              },
              error => {
                //this.error = error;
        
                  this.loading = false;
              });    
  }

  getPeritos (tipo: string) {

    this.loading = true;
   this.peritoService.getPeritos(tipo)
          .pipe(first())
          .subscribe( data => {                    
                this.loading = false;
                this.peritos = data;
                      
              },
              error => {
                //this.error = error;
       
                  this.loading = false;
              });    
  }

    // convenience getter for easy access to form fields
    get f() { return this.reactiveForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.reactiveForm.invalid) {
        return;
    }

    var date = this.datePipe.transform(this.f.fechaAvaluo.value,"yyyy-MM-dd");
    let dateavaluo = new Date(date);

    let data = JSON.parse(localStorage.getItem('currentUser'));
    let usuario = data["usuario"]
    let iduser = Object.values(usuario)
    this.idusuario = String(iduser[0]);

    this.avaluo = {folio: this.f.folio.value, idtipoavaluo: this.f.tpoAvaluo.value, fechaavaluo: dateavaluo,
                  idPerito: this.f.perito.value , idSociedad: this.f.sociedad.value};


    this.loading = true;
    this.avaluosService.addAvaluo(this.avaluo, this.idusuario)
        .pipe(first())
        .subscribe(
            data => {

            if(data.ok){
              this.alert = true;        
              this.loading = false;
              this.msg = data.mensaje;
              this.classAlert = 'alert-success alert alert-dismissible fade show';        
          } else {
                  this.alert = true;   
                  this.loading = false;
                  this.msg = data.mensaje;
                  this.classAlert = 'alert-danger alert alert-dismissible fade show';
          }
          },
          error => {
            this.alert = true;  
            this.loading = false;
            this.msg = error;
            this.classAlert = 'alert-danger alert alert-dismissible fade show';
          });
}


  onNoClick(): void {
    this.dialogRef.close();
  }

  closeAlert(){
    this.alert = false;
  }

}
