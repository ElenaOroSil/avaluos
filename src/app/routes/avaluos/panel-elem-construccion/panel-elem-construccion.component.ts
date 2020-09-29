import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-panel-elem-construccion',
  templateUrl: './panel-elem-construccion.component.html',
  styleUrls: ['./panel-elem-construccion.component.scss']
})
export class PanelElemConstruccionComponent implements OnInit {
  isLinear = false;
  eleConst1FormGroup: FormGroup;
  eleConst2FormGroup: FormGroup;
  eleConst3FormGroup: FormGroup;
  eleConst4FormGroup: FormGroup;
  eleConst5FormGroup: FormGroup;
  eleConst6FormGroup: FormGroup;
  eleConst7FormGroup: FormGroup;
  eleConst8FormGroup: FormGroup;
  eleConst9FormGroup: FormGroup;
  eleConst10FormGroup: FormGroup;
  eleConst11FormGroup: FormGroup;
  eleConst12FormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.eleConst1FormGroup = this.formBuilder.group({
      cimentacion: ['', [Validators.required]],
      estructura: ['', [Validators.required]],
      muros: ['', [Validators.required]],
      entrepisos: ['', [Validators.required]],
      techos: ['', [Validators.required]],
      azoteas: ['', [Validators.required]],
      bardas: ['', [Validators.required]],
    });

    this.eleConst2FormGroup = this.formBuilder.group({
      aplanados: ['', [Validators.required]],
      plafones: ['', [Validators.required]],
      lambrines: ['', [Validators.required]],
      pisos: ['', [Validators.required]],
      zoclos: ['', [Validators.required]],
      escaleras: ['', [Validators.required]],
      pintura: ['', [Validators.required]],
      recubEspeciales: ['', [Validators.required]],
    });


    this.eleConst3FormGroup = this.formBuilder.group({
      puertasInt: ['', [Validators.required]],
      guardaropas: ['', [Validators.required]],
      mueblesEmp: ['', [Validators.required]],
    });


    this.eleConst4FormGroup = this.formBuilder.group({
      mueblesBano: ['', [Validators.required]],
      ramaleosHid: ['', [Validators.required]],
      ramaleosSanit: ['', [Validators.required]],
    });


    this.eleConst5FormGroup = this.formBuilder.group({
      herreria: ['', [Validators.required]],
      ventaneria: ['', [Validators.required]],
      vidrieria: ['', [Validators.required]],
      cerrajeria: ['', [Validators.required]],
      fachadas: ['', [Validators.required]],
    });

    this.eleConst6FormGroup = this.formBuilder.group({
      cveIntEspecial: ['', [Validators.required]],
      desInstEspecial: ['', [Validators.required]],
      uniInstEspecial: ['', [Validators.required]],
      cantInstEspecial: ['', [Validators.required]],
      edadInstEspecial: ['', [Validators.required]],
      vidaUtilInstEspecial: ['', [Validators.required]],
      valorUnitInstEspecial: ['', [Validators.required]],
      factorEdadInstEspecial: ['', [Validators.required]],
      importeInstEspecial: ['', [Validators.required]],
      importeTotalInstEspecial: ['', [Validators.required]],
    });

    this.eleConst7FormGroup = this.formBuilder.group({
      cveIntEspecial: ['', [Validators.required]],
      desInstEspecial: ['', [Validators.required]],
      uniInstEspecial: ['', [Validators.required]],
      cantInstEspecial: ['', [Validators.required]],
      edadInstEspecial: ['', [Validators.required]],
      vidaUtilInstEspecial: ['', [Validators.required]],
      valorUnitInstEspecial: ['', [Validators.required]],
      factorEdadInstEspecial: ['', [Validators.required]],
      importeInstEspecial: ['', [Validators.required]],
      importeTotalInstEspecial: ['', [Validators.required]],
    });

    this.eleConst8FormGroup = this.formBuilder.group({
      cveEleAccesorio: ['', [Validators.required]],
      desEleAccesorio: ['', [Validators.required]],
      uniElemAccesorio: ['', [Validators.required]],
      cantElemAccesorio: ['', [Validators.required]],
      edadElemAccesorio: ['', [Validators.required]],
      vidaUtilElemAccesorio: ['', [Validators.required]],
      valorUnitElemAccesorio: ['', [Validators.required]],
      factorEdadElemAccesorio: ['', [Validators.required]],
      importeElemAccesorio: ['', [Validators.required]],
      importeTotElemAccesorio: ['', [Validators.required]],
    });

    this.eleConst9FormGroup = this.formBuilder.group({
      cveEleAccesorio: ['', [Validators.required]],
      desEleAccesorio: ['', [Validators.required]],
      uniElemAccesorio: ['', [Validators.required]],
      cantElemAccesorio: ['', [Validators.required]],
      edadElemAccesorio: ['', [Validators.required]],
      vidaUtilElemAccesorio: ['', [Validators.required]],
      valorUnitElemAccesorio: ['', [Validators.required]],
      factorEdadElemAccesorio: ['', [Validators.required]],
      importeElemAccesorio: ['', [Validators.required]],
      importeTotElemAccesorio: ['', [Validators.required]],
    });

    this.eleConst10FormGroup = this.formBuilder.group({
      cveObraComplementaria: ['', [Validators.required]],
      desObraComplementaria: ['', [Validators.required]],
      uniObraComplementaria: ['', [Validators.required]],
      cantObraComplementaria: ['', [Validators.required]],
      edadObraComplementaria: ['', [Validators.required]],
      vidaUtilTotalObraComple: ['', [Validators.required]],
      valorUnitObraComple: ['', [Validators.required]],
      factorEdadObraComple: ['', [Validators.required]],
      importeObraComplementaria: ['', [Validators.required]],
      importeTotObraComple: ['', [Validators.required]],
    });

    this.eleConst11FormGroup = this.formBuilder.group({
      cveObraComplementaria: ['', [Validators.required]],
      desObraComplementaria: ['', [Validators.required]],
      uniObraComplementaria: ['', [Validators.required]],
      cantObraComplementaria: ['', [Validators.required]],
      edadObraComplementaria: ['', [Validators.required]],
      vidaUtilTotalObraComple: ['', [Validators.required]],
      valorUnitObraComple: ['', [Validators.required]],
      factorEdadObraComple: ['', [Validators.required]],
      importeObraComplementaria: ['', [Validators.required]],
      importeTotObraComple: ['', [Validators.required]],
    });

    this.eleConst12FormGroup = this.formBuilder.group({
      impTotalInstEspPriv: ['', [Validators.required]],
      impTotalInstEspCom: ['', [Validators.required]],
      impIndivisoInstEspPriva: ['', [Validators.required]],
      impIndivisoInstEspCom: ['', [Validators.required]],
    });




  }

}
