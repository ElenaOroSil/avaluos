import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-panel-cons-previas',
  templateUrl: './panel-cons-previas.component.html',
  styleUrls: ['./panel-cons-previas.component.scss']
})
export class PanelConsPreviasComponent implements OnInit {
  isLinear = false;
  consPrevias1FormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.consPrevias1FormGroup = this.formBuilder.group({
      consPrevias: ['', [Validators.required]],
    });
  }

}
