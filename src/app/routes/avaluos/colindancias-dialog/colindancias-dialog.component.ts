import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import { first } from 'rxjs/operators';
import { TerrenoColindancias  } from './../../../_models/terreno.model';
import { TerrenoService } from './../../../_services/terreno.service';
import { CatalogosService } from './../../../_services/catalogos.service';
import { Catalogo } from './../../../_models/catalogo.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-colindancias-dialog',
  templateUrl: './colindancias-dialog.component.html',
  styleUrls: ['./colindancias-dialog.component.scss']
})
export class ColindanciasDialogComponent implements OnInit {
  terreno4FormGroup: FormGroup;
  terrenoColindancias: TerrenoColindancias;
  folio = localStorage.getItem('folio');
  info: any = {};
  loading = false;
  alertTerrenoColindancias: boolean = false;
  classAlert: string;
  msg= '';
  submitted = false;

  //Terreno CATÁLOGOS
  puntosCardinales: Catalogo[];

  //TerrenoColindancias
  idterrenocolindancia;
  descripcioncolindancia;
  orientacion1a;
  medida1a;
  detalleColindante1a;
  orientacion2a;
  medida2a;
  detalleColindante2a;
  orientacion3a;
  medida3a;
  detalleColindante3a;
  orientacion4a;
  medida4a;
  detalleColindante4a;

  constructor(private formBuilder: FormBuilder,
    private terrenoService: TerrenoService,
    private catalogoService: CatalogosService,
    public dialogRef: MatDialogRef<ColindanciasDialogComponent>,) { }

  ngOnInit(): void {

    //Combos de Colindancias
    this.getCatTerreno("PUNTOSCARDINALES");

     //Sección TerrenoColindancias
     this.terreno4FormGroup = this.formBuilder.group({
      'idTerrenoColindancia': new FormControl(''),
      'descripcionColindancia': new FormControl(''),
      'orientacion1a': new FormControl(''),
      'medida1a': new FormControl(''),
      'detalleColindante1a': new FormControl(''),
      'orientacion2a': new FormControl(''),
      'medida2a': new FormControl(''),
      'detalleColindante2a': new FormControl(''),
      'orientacion3a': new FormControl(''),
      'medida3a': new FormControl(''),
      'detalleColindante3a': new FormControl(''),
      'orientacion4a': new FormControl(''),
      'medida4a': new FormControl(''),
      'detalleColindante4a': new FormControl(''),
    });
  }

        // convenience getter for easy access to form fields
        get ant4() { return this.terreno4FormGroup.controls; }

  //Llama servicio sección Terrenos CATÁLOGOS
  getCatTerreno (tipo: string) {

    this.loading = true;
    this.catalogoService.getCatalogoTerreno(tipo)
          .pipe(first())
          .subscribe( data => {                    
                this.loading = false;

                switch(tipo)
                { 
                  case "PUNTOSCARDINALES":
                  this.puntosCardinales = data; 
                  break;
                  default: 
                }          
              },
              error => {
                this.alertTerrenoColindancias = true;  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
              });    
  }

      //Llama servicio para alta de terreno
      guardarColindancia() {
        this.submitted = true;
    
      // stop here if form is invalid
      if (this.terreno4FormGroup.invalid) {
         return;
      }
    
      this.terrenoColindancias = {idterrenocolindancia: 0, descripcioncolindancia: this.ant4.descripcionColindancia.value, 
      orientacion1a: this.ant4.orientacion1a.value, medida1a: this.ant4.medida1a.value, detallecolindante1a: this.ant4.detalleColindante1a.value, 
      orientacion2a: this.ant4.orientacion2a.value,medida2a: this.ant4.medida2a.value,  detallecolindante2a: this.ant4.detalleColindante2a.value,
      orientacion3a: this.ant4.orientacion3a.value,medida3a: this.ant4.medida3a.value,  detallecolindante3a: this.ant4.detalleColindante3a.value,
      orientacion4a: this.ant4.orientacion4a.value,medida4a: this.ant4.medida4a.value,  detallecolindante4a: this.ant4.detalleColindante4a.value}
      
      this.loading = true;
      this.terrenoService.addTerrenoColindancias(this.folio, this.terrenoColindancias)
          .pipe(first())
          .subscribe(
              data => {
    
              if(data.ok){
                this.alertTerrenoColindancias = true;        
                this.loading = false;
                this.msg = data.mensaje;
                this.classAlert = 'alert-success alert alert-dismissible fade show';   
            } else {
              this.alertTerrenoColindancias = true;   
              this.loading = false;
              this.msg = data.mensaje;
              this.classAlert = 'alert-danger alert alert-dismissible fade show';
            }
            },
            error => {
              this.alertTerrenoColindancias = true;  
              this.loading = false;
              this.msg = error;
              this.classAlert = 'alert-danger alert alert-dismissible fade show';
            });
    
      }
    
    
         closeAlertTerrenoColindancias(){
          this.alertTerrenoColindancias = false;
        }
    
        onNoClick(): void {
          this.dialogRef.close();
        }
}
