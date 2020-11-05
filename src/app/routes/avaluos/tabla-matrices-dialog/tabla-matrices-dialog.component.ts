import { Component, OnInit, Optional, Inject, Input } from '@angular/core';
import { TablaMatrices } from './../../../_models/desInmueble.model';
import { DescripcionInmuebleService } from './../../../_services/descripcion-inmueble.service';
import { first } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-tabla-matrices-dialog',
  templateUrl: './tabla-matrices-dialog.component.html',
  styleUrls: ['./tabla-matrices-dialog.component.scss']
})
export class TablaMatricesDialogComponent implements OnInit {
  @Input() appHideMe: string;

  ant1FormGroup: FormGroup;
  tablaMatrices: TablaMatrices;
  submitted = false;
  loading = false;
  alertTablaMatrices: boolean = false;
  msg= '';
  classAlert: string;
  idInmCons: string;
  idMatriz: string;
  desMatriz: string;
  str: string;
  visibleEnc: boolean = true;
  objMatriz: any[] = [];
  viewEstructura: boolean = false;
  viewAcabados: boolean = false;
  viewServicios: boolean = false;


  dataConsultaEnc: any[] = [];
  encabezado: any[] = [];
  objEncabezado: any = {};

  dataConsultaEst: any[] = [];
  estructura: any[] = [];
  objEstructura: any = {};

  dataConsultaEst2: any[] = [];
  estructura2: any[] = [];
  objEstructura2: any = {};

  dataConsultaEst3: any[] = [];
  estructura3: any[] = [];
  objEstructura3: any = {};

  dataConsultaEst4: any[] = [];
  estructura4: any[] = [];
  objEstructura4: any = {};

  dataConsultaAca: any[] = [];
  acabados: any[] = [];
  objAcabados: any = {};

  dataConsultaAca2: any[] = [];
  acabados2: any[] = [];
  objAcabados2: any = {};

  dataConsultaAca3: any[] = [];
  acabados3: any[] = [];
  objAcabados3: any = {};

  dataConsultaAca4: any[] = [];
  acabados4: any[] = [];
  objAcabados4: any = {};

  dataConsultaAca5: any[] = [];
  acabados5: any[] = [];
  objAcabados5: any = {};

  dataConsultaSer: any[] = [];
  servicios: any[] = [];
  objServicios: any = {};


  idSeccion: string;
  idSeccionEst: string;
  idSeccionAca: string;
  idSeccionSer: string;

  valores = [];
  val: any[] = [];
  valParam: string;

  listaSecciones: any[];
  listaTab: any[] = [];
  finalArray: any[] = [];
  finalArrayEstructura: any[] = [];

  viewTab: boolean = true;
  guardar: boolean = true;

  seccion1: any[];
  subSeccion1: any[];

  seccionEstructura: any[];
  subSeccionEstructura: any[];

  seccionAcabados: any[];
  subSeccionAcabados: any[];

  seccionServicios: any[];
  subSeccionServicios: any[];

  constructor(private formBuilder: FormBuilder, 
    public dialog: MatDialog,
    private desInmService: DescripcionInmuebleService,
    public dialogRef: MatDialogRef<TablaMatricesDialogComponent>,
    @Optional()  @Inject(MAT_DIALOG_DATA) public data: any) {

      this.idInmCons = data.idInmCons;
      this.idMatriz = data.idMatriz;
 
     }

  ngOnInit(): void {

    this.searchMatrices(); 

    this.ant1FormGroup = this.formBuilder.group({
      'tpoEncabezado': new FormControl('', [Validators.required]),
      'tpoEstructura': new FormControl('', [Validators.required]), 
      'tpoAcabados': new FormControl('', [Validators.required]), 
      'tpoServicios': new FormControl('', [Validators.required]),      
    });

  }


  //Llama servicio sección Descripción del Inmueble
  searchMatrices () {   

    this.loading = true;
    this.desInmService.searchCalculoMatrices(this.idInmCons, this.idMatriz)
          .pipe(first())
          .subscribe( data => {   
                                 
               this.loading = false;  
                //Llena tabs           
                this.listaSecciones = data.secciones; 
                this.idMatriz = data.idMatriz;
                this.desMatriz = data.matriz;
                this.objMatriz = [];

                this.listaSecciones.forEach((item) => {
                      if (item.seccion != "Espacios"){
                            this.listaTab.push(item);
                      }
                });

                switch(Number(this.idMatriz))
                { 
                  case 1:
                  case 2:

                //Sección 1 Encabezado  
                this.dataConsultaEnc = [];   
                this.seccion1 = this.listaSecciones[0];
                this.subSeccion1 = this.seccion1["idSubSeccion"];
                this.idSeccion = this.seccion1["idSeccion"];

                console.log("this.subSeccion1 DETALLE")
                console.log(this.subSeccion1)

                //this.ant1FormGroup.controls['tpoEncabezado'].setValue(this.subSeccion1); 

                this.encabezado = this.subSeccion1[0]["detalle"];             
                this.encabezado.forEach((item) => { 
                  if(item.seccionado == true){ 
                     this.dataConsultaEnc.push(item);                      
                  }      
                });

                if (this.dataConsultaEnc.length != 0){
                this.objEncabezado = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccion), 
                  idsubseccion: this.subSeccion1[0].idSubSeccion, clase: this.dataConsultaEnc[0]["clase"], puntos:this.dataConsultaEnc[0]["puntos"]};
                }

                  this.objMatriz.push(this.objEncabezado);
                               
                //Sección Estructura  
                this.dataConsultaEst = [];    
                this.seccionEstructura = this.listaSecciones[1];  
                this.subSeccionEstructura = this.seccionEstructura["idSubSeccion"];
                this.idSeccionEst = this.seccionEstructura["idSeccion"];

                //Estructura1
                this.estructura = this.subSeccionEstructura[0]["detalle"];
                this.estructura.forEach((item) => { 
                  if(item.seccionado == true){ 
                     this.dataConsultaEst.push(item);                      
                  }      
                 });

                 if (this.dataConsultaEst.length != 0){
                 this.objEstructura = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionEst),
                  idsubseccion: this.subSeccionEstructura[0].idSubSeccion, clase: this.dataConsultaEst[0]["clase"], puntos: this.dataConsultaEst[0]["puntos"]};
                 }

                  this.objMatriz.push(this.objEstructura);

                  //Estructura2
               this.estructura2 = this.subSeccionEstructura[1]["detalle"];
                this.estructura2.forEach((item) => { 
                  if(item.seccionado == true){ 
                     this.dataConsultaEst2.push(item);                      
                  }                    
               });

               if (this.dataConsultaEst2.length != 0){
                 this.objEstructura2 = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionEst),
                  idsubseccion: this.subSeccionEstructura[1].idSubSeccion, clase: this.dataConsultaEst2[0]["clase"], puntos: this.dataConsultaEst2[0]["puntos"]};
               }


                 this.objMatriz.push(this.objEstructura2);


                //Estructura3
                this.estructura3 = this.subSeccionEstructura[2]["detalle"];
                this.estructura3.forEach((item) => { 
                  if(item.seccionado == true){ 
                    this.dataConsultaEst3.push(item);                      
                  }      
                 });

                  
                 if (this.dataConsultaEst3.length != 0){
                 this.objEstructura3 = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionEst), 
                  idsubseccion: this.subSeccionEstructura[2].idSubSeccion, clase: this.dataConsultaEst3[0]["clase"], puntos: this.dataConsultaEst3[0]["puntos"]};
                }   
              
                this.objMatriz.push(this.objEstructura3);


                  //Estructura4
                  this.estructura4 = this.subSeccionEstructura[3]["detalle"];
                  this.estructura4.forEach((item) => { 
                    if(item.seccionado == true){ 
                      this.dataConsultaEst4.push(item);                      
                    }      
                   });
  
                    
                   if (this.dataConsultaEst4.length != 0){
                   this.objEstructura4 = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionEst), 
                    idsubseccion: this.subSeccionEstructura[3].idSubSeccion, clase: this.dataConsultaEst3[0]["clase"], puntos: this.dataConsultaEst4[0]["puntos"]};
                  }    
                  

                  this.objMatriz.push(this.objEstructura4);

                //Sección Acabados  
                this.dataConsultaAca = [];  
                this.seccionAcabados = this.listaSecciones[2];  
                this.subSeccionAcabados = this.seccionAcabados["idSubSeccion"];
                this.idSeccionAca = this.seccionAcabados["idSeccion"];

                //Acabados1
                this.acabados = this.subSeccionAcabados[0]["detalle"];
                this.acabados.forEach((item) => { 
                  if(item.seccionado == true){ 
                     this.dataConsultaAca.push(item);                      
                  }      
                 });

                 if (this.dataConsultaAca.length != 0){
                 this.objAcabados = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionAca), 
                  idsubseccion: this.subSeccionAcabados[0].idSubSeccion, clase: this.dataConsultaAca[0]["clase"], puntos: this.dataConsultaAca[0]["puntos"]};
                 }

                 this.objMatriz.push(this.objAcabados);


                  //Acabados2
                this.acabados2 = this.subSeccionAcabados[1]["detalle"];
                this.acabados2.forEach((item) => { 
                  if(item.seccionado == true){ 
                     this.dataConsultaAca2.push(item);                      
                  }      
                 });

                 if (this.dataConsultaAca2.length != 0){
                 this.objAcabados2 = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionAca), 
                  idsubseccion: this.subSeccionAcabados[1].idSubSeccion, clase: this.dataConsultaAca2[0]["clase"], puntos: this.dataConsultaAca2[0]["puntos"]};
                 }

                 this.objMatriz.push(this.objAcabados2);

                  //Acabados3
                this.acabados3 = this.subSeccionAcabados[2]["detalle"];
                this.acabados3.forEach((item) => { 
                  if(item.seccionado == true){ 
                     this.dataConsultaAca3.push(item);                      
                  }      
                 });

                 if (this.dataConsultaAca3.length != 0){
                 this.objAcabados3 = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionAca), 
                  idsubseccion: this.subSeccionAcabados[2].idSubSeccion, clase: this.dataConsultaAca3[0]["clase"], puntos: this.dataConsultaAca3[0]["puntos"]};
                 }


                 this.objMatriz.push(this.objAcabados3);

                   //Acabados4
                this.acabados4 = this.subSeccionAcabados[3]["detalle"];
                this.acabados4.forEach((item) => { 
                  if(item.seccionado == true){ 
                     this.dataConsultaAca4.push(item);                      
                  }      
                 });

                 if (this.dataConsultaAca4.length != 0){
                 this.objAcabados4 = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionAca), 
                  idsubseccion: this.subSeccionAcabados[3].idSubSeccion, clase: this.dataConsultaAca4[0]["clase"], puntos: this.dataConsultaAca4[0]["puntos"]};
                 }

                 this.objMatriz.push(this.objAcabados4);

                     //Acabados5
                this.acabados5 = this.subSeccionAcabados[4]["detalle"];
                this.acabados5.forEach((item) => { 
                  if(item.seccionado == true){ 
                     this.dataConsultaAca5.push(item);                      
                  }      
                 });

                 if (this.dataConsultaAca5.length != 0){
                 this.objAcabados5 = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionAca), 
                  idsubseccion: this.subSeccionAcabados[4].idSubSeccion, clase: this.dataConsultaAca5[0]["clase"], puntos: this.dataConsultaAca5[0]["puntos"]};
                 }

                 this.objMatriz.push(this.objAcabados5);


                //Sección Servicios    
                this.dataConsultaSer = [];   
                this.seccionServicios = this.listaSecciones[3];  
                this.subSeccionServicios = this.seccionServicios["idSubSeccion"];
                this.idSeccionSer = this.seccionServicios["idSeccion"];


                              //Servicios
                              this.servicios = this.subSeccionServicios[0]["detalle"];
                              this.servicios.forEach((item) => { 
                                if(item.seccionado == true){ 
                                   this.dataConsultaSer.push(item);                      
                                }      
                               });

              
                               if (this.dataConsultaSer.length != 0){
                               this.objServicios = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionAca), 
                                subseccion: this.subSeccionServicios[0].idSubSeccion, clase: this.dataConsultaSer[0]["clase"], puntos: this.dataConsultaSer[0]["puntos"]};
                               }
              

                               this.objMatriz.push(this.objServicios);


                  break;
                  case 3:
                //Sección Estructura   
                this.visibleEnc = false;   
                this.seccionEstructura = this.listaSecciones[0];  
                this.subSeccionEstructura = this.seccionEstructura["idSubSeccion"];
                this.idSeccionEst = this.seccionEstructura["idSeccion"];

                 //Estructura1
                 this.estructura = this.subSeccionEstructura[0]["detalle"];
                 this.estructura.forEach((item) => { 
                   if(item.seccionado == true){ 
                      this.dataConsultaEst.push(item);                      
                   }      
                  });
 
                  if (this.dataConsultaEst.length != 0){
                  this.objEstructura = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionEst),
                    subseccion: this.subSeccionEstructura[0].idSubSeccion, clase: this.dataConsultaEst[0]["clase"], puntos: this.dataConsultaEst[0]["puntos"]};
                  }
 
                   this.objMatriz.push(this.dataConsultaEst);
 
                   //Estructura2
                this.estructura2 = this.subSeccionEstructura[1]["detalle"];
                 this.estructura2.forEach((item) => { 
                   if(item.seccionado == true){ 
                      this.dataConsultaEst2.push(item);                      
                   }                    
                });
 
                if (this.dataConsultaEst2.length != 0){
                  this.objEstructura2 = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionEst), 
                    subseccion: this.subSeccionEstructura[1].idSubSeccion, clase: this.dataConsultaEst2[0]["clase"], puntos: this.dataConsultaEst2[0]["puntos"]};
                }
 

                  this.objMatriz.push(this.objEstructura2);
 
 
 
                 //Estructura3
                 this.estructura3 = this.subSeccionEstructura[2]["detalle"];
                 this.estructura3.forEach((item) => { 
                   if(item.seccionado == true){ 
                     this.dataConsultaEst3.push(item);                      
                   }      
                  });
 
                   
                  if (this.dataConsultaEst3.length != 0){
                  this.objEstructura3 = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionEst), 
                    subseccion: this.subSeccionEstructura[2].idSubSeccion, clase: this.dataConsultaEst3[0]["clase"], puntos: this.dataConsultaEst3[0]["puntos"]};
                 }   
                 

                 this.objMatriz.push(this.objEstructura3);
 
 
                   //Estructura4
                   this.estructura4 = this.subSeccionEstructura[3]["detalle"];
                   this.estructura4.forEach((item) => { 
                     if(item.seccionado == true){ 
                       this.dataConsultaEst4.push(item);                      
                     }      
                    });
   
                     
                    if (this.dataConsultaEst4.length != 0){
                    this.objEstructura4 = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionEst), 
                      subseccion: this.subSeccionEstructura[3].idSubSeccion, clase: this.dataConsultaEst3[0]["clase"], puntos: this.dataConsultaEst4[0]["puntos"]};
                   }    
                   
                   this.objMatriz.push(this.objEstructura4);

                //Sección Acabados     
                this.seccionAcabados = this.listaSecciones[1];  
                this.subSeccionAcabados = this.seccionAcabados["idSubSeccion"];
                this.idSeccionAca = this.seccionAcabados["idSeccion"];

                 //Acabados1
                 this.acabados = this.subSeccionAcabados[0]["detalle"];
                 this.acabados.forEach((item) => { 
                   if(item.seccionado == true){ 
                      this.dataConsultaAca.push(item);                      
                   }      
                  });
 
                  if (this.dataConsultaAca.length != 0){
                  this.objAcabados = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionAca), 
                    subseccion: this.subSeccionAcabados[0].idSubSeccion, clase: this.dataConsultaAca[0]["clase"],  puntos: this.dataConsultaAca[0]["puntos"]};
                  }
 

                  this.objMatriz.push(this.objAcabados);
 
 
                   //Acabados2
                 this.acabados2 = this.subSeccionAcabados[1]["detalle"];
                 this.acabados2.forEach((item) => { 
                   if(item.seccionado == true){ 
                      this.dataConsultaAca2.push(item);                      
                   }      
                  });
 
                  if (this.dataConsultaAca2.length != 0){
                  this.objAcabados2 = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons),  idseccion: Number(this.idSeccionAca), 
                    subseccion: this.subSeccionAcabados[1].idSubSeccion, clase: this.dataConsultaAca2[0]["clase"], puntos: this.dataConsultaAca2[0]["puntos"]};
                  }
 
                  this.objMatriz.push(this.objAcabados2);
 
                   //Acabados3
                 this.acabados3 = this.subSeccionAcabados[2]["detalle"];
                 this.acabados3.forEach((item) => { 
                   if(item.seccionado == true){ 
                      this.dataConsultaAca3.push(item);                      
                   }      
                  });
 
                  if (this.dataConsultaAca3.length != 0){
                  this.objAcabados3 = {idmatriz: Number(this.idMatriz),  idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionAca), 
                    subseccion: this.subSeccionAcabados[2].idSubSeccion, clase: this.dataConsultaAca3[0]["clase"],  puntos: this.dataConsultaAca3[0]["puntos"]};
                  }
 
                  this.objMatriz.push(this.objAcabados3);

 
                    //Acabados4
                 this.acabados4 = this.subSeccionAcabados[3]["detalle"];
                 this.acabados4.forEach((item) => { 
                   if(item.seccionado == true){ 
                      this.dataConsultaAca4.push(item);                      
                   }      
                  });
 
                  if (this.dataConsultaAca4.length != 0){
                  this.objAcabados4 = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionAca), 
                    subseccion: this.subSeccionAcabados[3].idSubSeccion, clase: this.dataConsultaAca4[0]["clase"], puntos: this.dataConsultaAca4[0]["puntos"]};
                  }

                  this.objMatriz.push(this.objAcabados4);


                //Sección Servicios     
                this.seccionServicios = this.listaSecciones[2];  
                this.subSeccionServicios = this.seccionServicios["idSubSeccion"];
                this.idSeccionSer = this.seccionServicios["idSeccion"];

                 //Servicios
                 this.servicios = this.subSeccionServicios[0]["detalle"];
                 this.servicios.forEach((item) => { 
                   if(item.seccionado == true){ 
                      this.dataConsultaSer.push(item);                      
                   }      
                  });

 
                  if (this.dataConsultaSer.length != 0){
                  this.objServicios = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionAca), 
                    subseccion: this.subSeccionServicios[0].idSubSeccion, clase: this.dataConsultaSer[0]["clase"], puntos: this.dataConsultaSer[0]["puntos"]};
                  }
 
                  this.objMatriz.push(this.objServicios);

                  break;
                  case 4:
                    this.visibleEnc = false;  
                    this.viewTab = false;
                    //Sección Estructura      
                    this.seccionEstructura = this.listaSecciones[0];  
                    this.subSeccionEstructura = this.seccionEstructura["idSubSeccion"];
                    this.idSeccionEst = this.seccionEstructura["idSeccion"];

                    //Estructura1
                this.estructura = this.subSeccionEstructura[0]["detalle"];
                this.estructura.forEach((item) => { 
                  if(item.seccionado == true){ 
                     this.dataConsultaEst.push(item);                      
                  }      
                 });

                 if (this.dataConsultaEst.length != 0){
                 this.objEstructura = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionEst),
                  subseccion: this.subSeccionEstructura[0].idSubSeccion, clase: this.dataConsultaEst[0]["clase"], puntos: this.dataConsultaEst[0]["puntos"]};
                 }


                  this.objMatriz.push(this.objEstructura);


                  //Estructura2
               this.estructura2 = this.subSeccionEstructura[1]["detalle"];
                this.estructura2.forEach((item) => { 
                  if(item.seccionado == true){ 
                     this.dataConsultaEst2.push(item);                      
                  }                    
               });

               if (this.dataConsultaEst2.length != 0){
                 this.objEstructura2 = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionEst),
                  subseccion: this.subSeccionEstructura[1].idSubSeccion, clase: this.dataConsultaEst2[0]["clase"], puntos: this.dataConsultaEst2[0]["puntos"]};
               }

                 this.objMatriz.push(this.objEstructura2);


                //Estructura3
                this.estructura3 = this.subSeccionEstructura[2]["detalle"];
                this.estructura3.forEach((item) => { 
                  if(item.seccionado == true){ 
                    this.dataConsultaEst3.push(item);                      
                  }      
                 });

                  
                 if (this.dataConsultaEst3.length != 0){
                 this.objEstructura3 = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionEst), 
                  subseccion: this.subSeccionEstructura[2].idSubSeccion, clase: this.dataConsultaEst3[0]["clase"], puntos: this.dataConsultaEst3[0]["puntos"]};
                }   
                
                this.objMatriz.push(this.objEstructura3);
    
                    //Sección Acabados     
                    this.seccionAcabados = this.listaSecciones[1];  
                    this.subSeccionAcabados = this.seccionAcabados["idSubSeccion"];
                    this.idSeccionAca = this.seccionAcabados["idSeccion"];

                     //Acabados1
                 this.acabados = this.subSeccionAcabados[0]["detalle"];
                 this.acabados.forEach((item) => { 
                   if(item.seccionado == true){ 
                      this.dataConsultaAca.push(item);                      
                   }      
                  });
 
                  if (this.dataConsultaAca.length != 0){
                  this.objAcabados = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionAca), 
                    subseccion: this.subSeccionAcabados[0].idSubSeccion, clase: this.dataConsultaAca[0]["clase"], puntos: this.dataConsultaAca[0]["puntos"]};
                  }
 
                  this.objMatriz.push(this.objAcabados);
 
 
                   //Acabados2
                 this.acabados2 = this.subSeccionAcabados[1]["detalle"];
                 this.acabados2.forEach((item) => { 
                   if(item.seccionado == true){ 
                      this.dataConsultaAca2.push(item);                      
                   }      
                  });
 
                  if (this.dataConsultaAca2.length != 0){
                  this.objAcabados2 = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons),  idseccion: Number(this.idSeccionAca), 
                    subseccion: this.subSeccionAcabados[1].idSubSeccion, clase: this.dataConsultaAca2[0]["clase"], puntos: this.dataConsultaAca2[0]["puntos"]};
                  }
 
                  this.objMatriz.push(this.objAcabados2);
 
                   //Acabados3
                 this.acabados3 = this.subSeccionAcabados[2]["detalle"];
                 this.acabados3.forEach((item) => { 
                   if(item.seccionado == true){ 
                      this.dataConsultaAca3.push(item);                      
                   }      
                  });
 
                  if (this.dataConsultaAca3.length != 0){
                  this.objAcabados3 = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionAca), 
                    subseccion: this.subSeccionAcabados[2].idSubSeccion, clase: this.dataConsultaAca3[0]["clase"], puntos: this.dataConsultaAca3[0]["puntos"]};
                  }
 

                  this.objMatriz.push(this.objAcabados3);
   
                      break;
                      case 5:
                        this.visibleEnc = false;  
                        this.viewTab = false;
                        //Sección Estructura      
                        this.seccionEstructura = this.listaSecciones[0];  
                        this.subSeccionEstructura = this.seccionEstructura["idSubSeccion"];
                        this.idSeccionEst = this.seccionEstructura["idSeccion"];
    
                        //Estructura1
                    this.estructura = this.subSeccionEstructura[0]["detalle"];
                    this.estructura.forEach((item) => { 
                      if(item.seccionado == true){ 
                         this.dataConsultaEst.push(item);                      
                      }      
                     });
    
                     if (this.dataConsultaEst.length != 0){
                     this.objEstructura = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionEst),
                      subseccion: this.subSeccionEstructura[0].idSubSeccion, clase: this.dataConsultaEst[0]["clase"], puntos: this.dataConsultaEst[0]["puntos"]};
                     }
    
                      this.objMatriz.push(this.objEstructura);

                       //Sección Acabados     
                    this.seccionAcabados = this.listaSecciones[1];  
                    this.subSeccionAcabados = this.seccionAcabados["idSubSeccion"];
                    this.idSeccionAca = this.seccionAcabados["idSeccion"];

                     //Acabados1
                 this.acabados = this.subSeccionAcabados[0]["detalle"];
                 this.acabados.forEach((item) => { 
                   if(item.seccionado == true){ 
                      this.dataConsultaAca.push(item);                      
                   }      
                  });
 
                  if (this.dataConsultaAca.length != 0){
                  this.objAcabados = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionAca), 
                    subseccion: this.subSeccionAcabados[0].idSubSeccion, clase: this.dataConsultaAca[0]["clase"], puntos: this.dataConsultaAca[0]["puntos"]};
                  }
 
                  this.objMatriz.push(this.objAcabados);
 
 
                   //Acabados2
                 this.acabados2 = this.subSeccionAcabados[1]["detalle"];
                 this.acabados2.forEach((item) => { 
                   if(item.seccionado == true){ 
                      this.dataConsultaAca2.push(item);                      
                   }      
                  });
 
                  if (this.dataConsultaAca2.length != 0){
                  this.objAcabados2 = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionAca), 
                    subseccion: this.subSeccionAcabados[1].idSubSeccion, clase: this.dataConsultaAca2[0]["clase"], puntos: this.dataConsultaAca2[0]["puntos"]};
                  }
 
                  this.objMatriz.push(this.objAcabados2);
 
                   //Acabados3
                 this.acabados3 = this.subSeccionAcabados[2]["detalle"];
                 this.acabados3.forEach((item) => { 
                   if(item.seccionado == true){ 
                      this.dataConsultaAca3.push(item);                      
                   }      
                  });
 
                  if (this.dataConsultaAca3.length != 0){
                  this.objAcabados3 = {idmatriz: Number(this.idMatriz), idinmconstruccion: Number(this.idInmCons), idseccion: Number(this.idSeccionAca), 
                    subseccion: this.subSeccionAcabados[2].idSubSeccion, clase: this.dataConsultaAca3[0]["clase"], puntos: this.dataConsultaAca3[0]["puntos"]};
                  }
 
                  this.objMatriz.push(this.objAcabados3);
            
                      break;
                  default: 
                }                 
                  
              },
              error => {
                this.alertTablaMatrices = true;  
                this.loading = false;
                this.msg = error;
                this.classAlert = 'alert-danger alert alert-dismissible fade show';
              });  
                       
  }

    // convenience getter for easy access to form fields
  get ant1() { return this.ant1FormGroup.controls; }

  guardarMatrices() {
    this.submitted = true;

   // stop here if form is invalid
    if (this.ant1FormGroup.invalid) {
      return;
  }

   
  
    this.valores = [];
    this.val = [];

    console.log("this.finalArrayAAAAA")
    console.log(this.finalArray)

    if (this.finalArray.length != 0) {

    console.log("this.objMatrizBBBBBB");
    console.log(this.objMatriz);

      



      this.finalArray.forEach((item) => {        
        this.valores.push(item.seccion);
        this.valores.push(item.idsubseccion);
        this.valores.push(item.clase);
        this.valores.push(item.puntos + "|");
        //this.valores.push("|");      
       });
      

       this.val.push(this.valores);  
       this.valParam = this.val.toString();

       var sentence= this.valParam;
       var replaceValue = this.replaceAll(sentence,"|,","|"); 
 
    this.loading = true;
    this.desInmService.addCalculoMatrices(Number(this.idInmCons), Number(this.idMatriz), 
    replaceValue)
        .pipe(first())
        .subscribe(
            data => {

            if(data.ok){
              this.searchMatrices();   
              this.alertTablaMatrices = true;        
              this.loading = false;
              this.msg = data.mensaje;
              this.classAlert = 'alert-success alert alert-dismissible fade show';      
          } else {
                  this.alertTablaMatrices = true;   
                  this.loading = false;
                  this.msg = data.mensaje;
                  this.classAlert = 'alert-danger alert alert-dismissible fade show';
          }
          },
          error => {
            this.alertTablaMatrices = true;  
            this.loading = false;
            this.msg = error;
            this.classAlert = 'alert-danger alert alert-dismissible fade show';
          });
        }
}

  closeAlertTablaMatrices(){
    this.alertTablaMatrices = false;
  }

  replaceAll(str, find, replace) {
    var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
}

  radioChange(event: MatRadioChange, data, item, seccion) {

    switch(seccion)
    { 
      case 1:
        var obj = this.subSeccion1.filter(x => x.id == data.id)[0];
        obj.seccion = seccion;
        obj.idsubseccion = data.idSubSeccion;   
        obj.clase = item.clase;
        obj.puntos = item.puntos; 
        
        console.log(this.finalArray.some(x => x.idsubseccion == data.idsubseccion))
        if (!this.finalArray.some(x => x.idsubseccion == data.idsubseccion)) {
          this.finalArray.push(obj);
        }
    break;
    case 2:
      var obj = this.subSeccionEstructura.filter(x => x.idSubSeccion == data.idSubSeccion)[0];
      obj.seccion = seccion;
      obj.idsubseccion = obj.idSubSeccion;   
      obj.clase = item.clase;
      obj.puntos = item.puntos;

      console.log(this.finalArray.some(x => x.idSubSeccion == data.idSubSeccion))
      if (!this.finalArray.some(x => x.idSubSeccion == data.idSubSeccion)) {
        this.finalArray.push(obj);
      }
    break;
    case 3:
        var obj = this.subSeccionAcabados.filter(x => x.idSubSeccion == data.idSubSeccion)[0];
        obj.seccion = seccion;
        obj.idsubseccion = obj.idSubSeccion; 
        obj.clase = item.clase;
        obj.puntos = item.puntos;   

        console.log(this.finalArray.some(x => x.idSubSeccion == data.idSubSeccion))
        if (!this.finalArray.some(x => x.idSubSeccion == data.idSubSeccion)) {
          this.finalArray.push(obj);
        }
    break;
    case 4:
        var obj = this.subSeccionServicios.filter(x => x.idSubSeccion == data.idSubSeccion)[0];
        obj.seccion = seccion;
        obj.idsubseccion = obj.idSubSeccion;   
        obj.clase = item.clase;
        obj.puntos = item.puntos;  

        console.log(this.finalArray.some(x => x.idSubSeccion == data.idSubSeccion))
        if (!this.finalArray.some(x => x.id == data.idSubSeccion)) {
          this.finalArray.push(obj);
        }
    break;
    default: 
    }   
  }

  onItemChange(value){

    console.log("VALUEEEEEEEEE");
    console.log(value);
  }

  closeAlert(){
    this.alertTablaMatrices = false;
  }

 onTabChanged($event) {

    var index = $event.index;
 
    switch(index)
    { 
      case 0:
        this.viewEstructura = true; 
        this.viewAcabados = false;   
        this.viewServicios = false;
     break;
      case 1:
        this.viewEstructura = false; 
        this.viewAcabados = true;   
        this.viewServicios = false;
     break;
     case 2:
        this.viewEstructura = false;  
        this.viewAcabados = false;  
        this.viewServicios = true;
     break;
     default:
    }

  }
 
}
