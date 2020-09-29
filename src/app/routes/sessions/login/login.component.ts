import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from './../../../_services';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  alert: boolean = false;
  classAlert: string;
  
  reactiveForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error= '';
  status: boolean;


  constructor(private fb: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService) {

      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
    }
   
  }

  ngOnInit() {

    this.reactiveForm = this.fb.group({
      password: ['', [Validators.required]],
      username: ['', [Validators.required]],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin-layout/inicio';

    
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
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {

            if(data.ok){
                  this.router.navigate([this.returnUrl]);
            } else {
                  this.alert = true;   
                  this.loading = false;
                  this.error = data.mensaje;
                  this.classAlert = 'alert-danger alert alert-dismissible fade show';
                  
            }
            },
            error => {
              this.alert = true;  
              this.loading = false;
              this.error = error;
              this.classAlert = 'alert-danger alert alert-dismissible fade show';
              
            });
}

closeAlert(){
  this.alert = false;
}


}
