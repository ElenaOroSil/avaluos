import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-panel-anexo-fotografico',
  templateUrl: './panel-anexo-fotografico.component.html',
  styleUrls: ['./panel-anexo-fotografico.component.scss']
})
export class PanelAnexoFotograficoComponent implements OnInit {
  isLinear = false;
  anexoFoto1FormGroup: FormGroup;
  anexoFoto2FormGroup: FormGroup;
  anexoFoto3FormGroup: FormGroup;
  anexoFoto4FormGroup: FormGroup;
  anexoFoto5FormGroup: FormGroup;
  anexoFoto6FormGroup: FormGroup;


  constructor(private formBuilder: FormBuilder) { }


  ngOnInit(): void {

    this.anexoFoto1FormGroup = this.formBuilder.group({
      region: ['', [Validators.required]],
      manzana: ['', [Validators.required]],
      lote: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
    });

    this.anexoFoto2FormGroup = this.formBuilder.group({
      fotos: ['', [Validators.required]],
      intExterior: ['', [Validators.required]],

    });

    this.anexoFoto3FormGroup = this.formBuilder.group({
      region: ['', [Validators.required]],
      manzana: ['', [Validators.required]],
      lote: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
    });

    this.anexoFoto4FormGroup = this.formBuilder.group({
      fotos: ['', [Validators.required]],
      intExterior: ['', [Validators.required]],

    });


    this.anexoFoto5FormGroup = this.formBuilder.group({
      region: ['', [Validators.required]],
      manzana: ['', [Validators.required]],
      lote: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
    });

    this.anexoFoto6FormGroup = this.formBuilder.group({
      fotos: ['', [Validators.required]],
      intExterior: ['', [Validators.required]],
    });
  }

}
