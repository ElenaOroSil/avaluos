import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import { CatalogosService } from './../../../_services/catalogos.service';
import { first } from 'rxjs/operators';
import { Catalogo } from './../../../_models/catalogo.model';
import { DescripcionInmueble } from './../../../_models/desInmueble.model';
import { DescripcionInmuebleService } from './../../../_services/descripcion-inmueble.service';


@Component({
  selector: 'app-registroconstruccion-dialog',
  templateUrl: './registroconstruccion-dialog.component.html',
  styleUrls: ['./registroconstruccion-dialog.component.scss']
})
export class RegistroconstruccionDialogComponent implements OnInit {
  alertRegistroConstruccion: boolean = false;
  registroConstFormGroup: FormGroup;
  loading = false;
  msg= '';
  classAlert: string;
  submitted = false;
  desInmueble: DescripcionInmueble;
  folio = localStorage.getItem('folio');
  returnValue: string = "";


  //registro CATÁLOGOS
  tpoConstruccion: Catalogo[];
  usoConstruccion: Catalogo[];
  rangoNivel: Catalogo[];
  edoConservacion: Catalogo[];

  //RegistroConstrucción
  C: string;
  P: string;
  tipoConstruccion;
  tipo;
  superficie;
  descripcion;
  uso;
  rangoDeNivel;
  edad;
  edoDeConservacion;
  indiviso;

  constructor(public dialogRef: MatDialogRef<RegistroconstruccionDialogComponent>,
    private formBuilder: FormBuilder,
    private catalogoService: CatalogosService,
    private desInmService: DescripcionInmuebleService) { }

  ngOnInit(): void {

    //Combos de Colindancias
    this.getCatalogoTpoConstruccion("TIPOCONSTRUCCION", "P");
    this.getCatalogosDesInmueble("USOCONSTRUCCION");
    this.getCatalogosDesInmueble("RANGONIVEL");
    this.getCatalogosDesInmueble("ESTADOCONSERVACION");

     //Sección TerrenoColindancias
     this.registroConstFormGroup = this.formBuilder.group({

      'tipoConstruccion': new FormControl(''),
      'tipo': new FormControl(''),
      'superficie': new FormControl(''),
      'descripcion': new FormControl(''),
      'nivelTipo': new FormControl(''),
      'uso': new FormControl(''),
      'rangoDeNivel': new FormControl(''),
      'edad': new FormControl(''),
      'edoDeConservacion': new FormControl(''),
      'indiviso': new FormControl(''),
     
    });
  }


  //Llama servicio sección Descripción del Inmueble
  getCatalogosDesInmueble (tipo: string) {
    this.loading = true;
    this.catalogoService.getCatalogosDesInmueble(tipo)
          .pipe(first())
          .subscribe( data => {                    
                this.loading = false;

                switch(tipo)
                { 
                  case "TIPOCONSTRUCCION":
                  this.tpoConstruccion = data; 
                  break;
                  case "USOCONSTRUCCION":
                    this.usoConstruccion = data; 
                  break;
                  case "RANGONIVEL":
                    this.rangoNivel = data; 
                  break;
                  case "ESTADOCONSERVACION":
                    this.edoConservacion = data; 
                  break;
                  default: 
                }          
              },
              error => {
                this.alertRegistroConstruccion = true;  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
              });    
  }

   //Llama servicio sección Descripción del Inmueble
   getCatalogoTpoConstruccion (catalogo: string, tipo: string) {

    this.loading = true;
    this.catalogoService.getCatalogoTpoConstruccion(catalogo, tipo)
          .pipe(first())
          .subscribe( data => {                    
                this.loading = false;             
                  this.tpoConstruccion = data;                
              },
              error => {
                this.alertRegistroConstruccion = true;  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
              });    
  }

  closeAlertRegistroConstruccion(){
    this.alertRegistroConstruccion = false;
  }

  onNoClick(): void {
    this.dialogRef.close(this.returnValue);
  }

      // convenience getter for easy access to form fields
      get ant1() { return this.registroConstFormGroup.controls; }

   //Llama servicio para alta de terreno
  guardarRegConstruccion() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.registroConstFormGroup.invalid) {
     return;
  }

  this.desInmueble = { idinmconstruccion: 0, 
  tipoconstruccion: this.ant1.tipoConstruccion.value, idtipoconstruccion: this.ant1.tipo.value, 
  superficie: this.ant1.superficie.value, descripcionmodulo: this.ant1.descripcion.value, 
  niveltipo: this.ant1.nivelTipo.value,  idusoconstruccion: this.ant1.uso.value,
  idrangoniveltgdf: this.ant1.rangoDeNivel.value, clasef: null, puntajef: null, edad: this.ant1.edad.value,  
  idestadoconservacion: this.ant1.edoDeConservacion.value, indiviso: this.ant1.indiviso.value, 
  idclaseconstruccionf: null, estadogralconservacionf: null, vidaminimaremanentef: null,
  indicecostosremanentef: null, totalpuntosajustadosf: null, clasesm: null, puntajesm: null }

  
  this.loading = true;
  this.desInmService.addConstruccion(this.folio, this.desInmueble)
      .pipe(first())
      .subscribe(
          data => {

          if(data.ok){
            this.returnValue = this.desInmueble.tipoconstruccion;
            this.alertRegistroConstruccion = true;        
            this.loading = false;
            this.msg = data.mensaje;
            this.classAlert = 'alert-success alert alert-dismissible fade show';   
        } else {
          this.alertRegistroConstruccion = true;   
          this.loading = false;
          this.msg = data.mensaje;
          this.classAlert = 'alert-danger alert alert-dismissible fade show';
        }
        },
        error => {
          this.alertRegistroConstruccion = true;  
          this.loading = false;
          this.msg = error;
          this.classAlert = 'alert-danger alert alert-dismissible fade show';
        });

  }

  consultaTipo(tipo: string){

    this.getCatalogoTpoConstruccion("TIPOCONSTRUCCION", tipo);

  }

}
