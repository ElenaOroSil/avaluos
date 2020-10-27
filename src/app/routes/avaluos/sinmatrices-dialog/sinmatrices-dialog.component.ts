import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DescripcionInmuebleService } from './../../../_services/descripcion-inmueble.service';
import { SinMatrices } from 'app/_models';

@Component({
  selector: 'app-sinmatrices-dialog',
  templateUrl: './sinmatrices-dialog.component.html',
  styleUrls: ['./sinmatrices-dialog.component.scss']
})
export class SinmatricesDialogComponent implements OnInit {
  sinMatricesFormGroup: FormGroup;
  alertSinMatrices: boolean = false;
  submitted = false;
  sinMatriz: SinMatrices;
  idusuario: string;
  loading = false;
  classAlert: string;
  msg= '';
  folio = localStorage.getItem('folio');
  idInmCons: string;
  tipoCons: string;

  constructor(private fb: FormBuilder, 
    private desInmService: DescripcionInmuebleService,
    public dialogRef: MatDialogRef<SinmatricesDialogComponent>,
    @Optional()  @Inject(MAT_DIALOG_DATA) public data: any) {

      this.idInmCons = data.idInmCons;
      this.tipoCons = data.tipoCons;

     }

  ngOnInit(): void {

    this.sinMatricesFormGroup = this.fb.group({
      clase: ['', [Validators.required]],
      puntaje: ['',[Validators.required]],
    })

  }

      // convenience getter for easy access to form fields
      get f() { return this.sinMatricesFormGroup.controls; }


    guardarRegConstruccion() {
        this.submitted = true;
    
        // stop here if form is invalid
        if (this.sinMatricesFormGroup.invalid) {
            return;
        }
  
    
        this.sinMatriz = {idinmuebleconstruccion: Number(this.idInmCons), tipoconstruccion: this.tipoCons, 
          clasesm: this.f.clase.value , puntajesm: this.f.puntaje.value};   
          
    
        this.loading = true;
        this.desInmService.addSinMatrices(this.folio, this.sinMatriz)
            .pipe(first())
            .subscribe(
                data => {
    
                if(data.ok){
                  this.alertSinMatrices = true;        
                  this.loading = false;
                  this.msg = data.mensaje;
                  this.classAlert = 'alert-success alert alert-dismissible fade show';        
              } else {
                      this.alertSinMatrices = true;   
                      this.loading = false;
                      this.msg = data.mensaje;
                      this.classAlert = 'alert-danger alert alert-dismissible fade show';
              }
              },
              error => {
                this.alertSinMatrices = true;  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
              });
    }


    closeAlertSinMatrices(){
      this.alertSinMatrices = false;
    }

}
