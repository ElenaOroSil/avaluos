import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from './../../../_services/authentication.service';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  reactiveForm: FormGroup;
  returnUrl: string;
  submitted = false;
  loading = false;
  alert: boolean = false;
  classAlert: string;
  msg= '';

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService) { 
    
  }

  ngOnInit() {

    this.reactiveForm = this.fb.group({
      username: ['', [Validators.required]],
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
   

    this.loading = true;
    this.authenticationService.enviar(this.f.username.value)
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

closeAlert(){
  this.alert = false;
}


}
