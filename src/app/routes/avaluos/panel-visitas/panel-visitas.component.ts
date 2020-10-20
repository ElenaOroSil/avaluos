import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { Visita } from './../../../_models/visita.model';
import { VisitasService } from './../../../_services/visitas.service';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-panel-visitas',
  templateUrl: './panel-visitas.component.html',
  styleUrls: ['./panel-visitas.component.scss']
})
export class PanelVisitasComponent implements OnInit {

  visitasFormGroup: FormGroup;
  submitted = false;
  visita: Visita;
  folio = localStorage.getItem('folio');
  info: any = {} 
  date = new FormControl(new Date());
  loading = false;
  alert: boolean = false;
  classAlert: string;
  msg= '';
  isExpanded:boolean = false;

  nombreVisita;
  apVisita;
  amVisita;
  email;
  telVisita;
  extVisita;
  movilVisita;
  fechaVisita;
  time;
  observaciones;
 


  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe,
    private visitasService: VisitasService) {

    this.visitasFormGroup = this.formBuilder.group({
       'nombreVisita': new FormControl('', [Validators.required]),
       'apVisita': new FormControl('', [Validators.required]),
       'amVisita': new FormControl(''),
       'email': new FormControl('', [Validators.required, Validators.email]),
       'telVisita': new FormControl('', [Validators.required]),
       'extVisita': new FormControl(''),
       'movilVisita': new FormControl('', [Validators.required]),
       'fechaVisita': new FormControl(new Date(), [Validators.required]),
       'time': new FormControl('', [Validators.required]),
       'observaciones': new FormControl('')

    });

   }


   ngOnInit() {

    this.expand();
     
  }

  expand(){
    this.isExpanded = !this.isExpanded;
    }

   getErrorMessage(form: FormGroup) {

    return form.get('email').hasError('required')
      ? 'Campo requerido'
      : form.get('email').hasError('email')
      ? 'Correo no válido'
      : '';
  }

  // convenience getter for easy access to form fields
  get f() { return this.visitasFormGroup.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.visitasFormGroup.invalid) {
        return;
    }

    //var date = this.datePipe.transform(this.f.fechaVisita.value,"yyyy-MM-dd");
    this.visita = {nombreContacto: this.f.nombreVisita.value, paternoContacto: this.f.apVisita.value, maternoContacto: this.f.amVisita.value,
                  correoElectronico: this.f.email.value, telefonoFijo: String(this.f.telVisita.value), extTelefono: String(this.f.extVisita.value),
                  telefonoMovil: String(this.f.movilVisita.value), fechaVisita: this.f.fechaVisita.value, horaVisita: this.f.time.value, observaciones: this.f.observaciones.value}


    this.loading = true;
    this.visitasService.addVisita(this.folio, this.visita)
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

 //Llama servicio para la consulta de visitas
 searchVisitas () {

 this.closeAlert()
 this.loading = true;
 this.visitasService.searchVisitas(this.folio)
        .pipe(first())
        .subscribe( data => {                    
              this.loading = false;
              this.info = data.visita;
                       
              if(this.info != ""){  

        
                //var dateCreated = formatDate(`${this.info[0].fechavisita}`.replace('/','-'),'full','es-MX')
                let date = new FormControl(new Date(this.info[0].fechavisita));
                        //var date = this.info[0].fechavisita

              this.visitasFormGroup.setValue({
                fechaVisita: this.info[0].fechavisita,
                nombreVisita: this.info[0].nombrecontacto,
                apVisita: this.info[0].paternocontacto,
                amVisita: this.info[0].maternocontacto,
                email: this.info[0].correoelectronico,
                telVisita: this.info[0].telefonofijo,
                extVisita: this.info[0].exttelefono,
                movilVisita: this.info[0].telefonomovil,
                time: this.info[0].horavisita,
                observaciones: this.info[0].observaciones
            });              

            }            
            },
            error => {
              this.alert = true;  
              this.loading = false;
              this.msg = error;
              this.classAlert = 'alert-danger alert alert-dismissible fade show';
            });    
    }

    limpiarDatos(){

      this.nombreVisita.setValue('');
      this.apVisita.setValue('');
      this.amVisita.setValue('');
      this.email.setValue('');
      this.extVisita.setValue('');
      this.movilVisita.setValue('');
      this.fechaVisita.setValue('');
      this.time.setValue('');
      this.observaciones.setValue('');
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  closeAlert(){
    this.alert = false;
  }
}
