import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { AvaluosService } from './../../../_services/avaluos.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-avaluos-layout',
  templateUrl: './avaluos-layout.component.html',
  styleUrls: ['./avaluos-layout.component.scss']
})
export class AvaluosLayoutComponent implements OnInit {
  isViewInitialized = false;

  navLinks: any[];
  activeLinkIndex = -1;
  loading = false;

  public folio: string;
  public perito: string;
  public fechaavaluo: string;
  public sociedad: string;
  public estatusavaluo: string;
  

  constructor(private route: ActivatedRoute,  private router: Router,
    private avaluosService: AvaluosService,) {
    this.route.queryParams.subscribe(params => {
      this.folio = params["folio"];
      this.perito = params["perito"];
      this.fechaavaluo = params["fechaAvaluo"];
      this.sociedad = params["sociedad"];
      this.estatusavaluo = params["estatusavaluo"];      
  });

   if (this.folio != ""){
    localStorage.setItem('folio', this.folio);
    localStorage.setItem('perito', this.perito);
    localStorage.setItem('fechaAvaluo', this.fechaavaluo);
    localStorage.setItem('sociedad', this.sociedad);
    localStorage.setItem('estatusavaluo', this.estatusavaluo);
   }

   this.navLinks = [
    { link: '/admin-layout/avaluos-layout/panel-visitas',
      label: 'VISITAS',      
      imgAtv: 'assets/images/pending.png',
      index: 0
    },
    {  link: '/admin-layout/avaluos-layout/panel-antecedentes', 
       label: 'ANTECEDENTES',
       imgAtv: 'assets/images/pending.png',
       index: 1
    }, 
    {  link: '/admin-layout/avaluos-layout/panel-caracteristicas-urbanas',
       label: 'CARACTERÍSTICAS URBANAS',
       imgAtv: 'assets/images/pending.png',
       index: 2
    }, 
    {  link: '/admin-layout/avaluos-layout/panel-terreno',
      label: 'TERRENO',   
      imgAtv: 'assets/images/pending.png',
      index: 3
    }, 
    { link: '/admin-layout/avaluos-layout/panel-des-inmueble',
      label: 'DESCRIPCIÓN DEL INMUEBLE',
      imgAtv: 'assets/images/pending.png',
      index: 4
  }, 
  { link: '/admin-layout/avaluos-layout/panel-elem-construccion',
    label: 'ELEMENTOS DE LA CONSTRUCCIÓN',
    imgAtv: 'assets/images/pending.png',
    index: 5
  }, 
  { link: '/admin-layout/avaluos-layout/panel-cons-previas',
    label: 'CONSIDERACIONES PREVIAS',    
    imgAtv: 'assets/images/pending.png',
    index: 6
  },
   { link: '/admin-layout/avaluos-layout/panel-avaluo-fisico',
    label: 'AVALÚO FÍSICO O DIRECTO',
    imgAtv: 'assets/images/pending.png',
    index: 7
  }, 
  {  link: '/admin-layout/avaluos-layout/panel-valor-rentas',
    label: 'VALOR POR CAPITALIZACIÓN DE RENTAS',  
    imgAtv: 'assets/images/pending.png',
    index: 8
  }, 
   { link: '/admin-layout/avaluos-layout/panel-anexo-fotografico',
    label: 'ANEXO FOTOGRÁFICO',   
    imgAtv: 'assets/images/pending.png',
    index: 9
}, 

]; 

}

ngOnInit() { 

  this.router.events.subscribe((res) => {
    this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
});

    this.consultaAvancesAvaluo(this.folio); 
 
     
  }

 ngAfterContentChecked(): void {
   //Called after every check of the component's or directive's content.
   //Add 'implements AfterContentChecked' to the class.
   this.folio = localStorage.getItem('folio');
   this.perito = localStorage.getItem('perito');
   this.fechaavaluo = localStorage.getItem('fechaAvaluo');
   this.sociedad = localStorage.getItem('sociedad');
   this.estatusavaluo = localStorage.getItem('estatusavaluo');
 }


consultaAvancesAvaluo (folio: string) {
 
this.loading = true;
 this.avaluosService.avanceAvaluo(folio)
        .pipe(first())
        .subscribe( data => {                    
              this.loading = false;

                if(data["visita"]){
                  this.navLinks[0].imgAtv = 'assets/images/complete.png'

                } else {
                  this.navLinks[0].imgAtv = 'assets/images/pending.png'
                }

                if(data["antecedentes"]){
                  this.navLinks[1].imgAtv = 'assets/images/complete.png'

                } else {
                  this.navLinks[1].imgAtv = 'assets/images/pending.png'
                }

                if(data["caracteristicasUrbanas"]){
                  this.navLinks[2].imgAtv = 'assets/images/complete.png'

                } else {
                  this.navLinks[2].imgAtv = 'assets/images/pending.png'
                }

                if(data["terreno"]){
                  this.navLinks[3].imgAtv = 'assets/images/complete.png'

                } else {
                  this.navLinks[3].imgAtv = 'assets/images/pending.png'
                }

                if(data["descripcionGralInmueble"]){
                  this.navLinks[4].imgAtv = 'assets/images/complete.png'

                } else {
                  this.navLinks[4].imgAtv = 'assets/images/pending.png'
                }

                if(data["elementosConstruccion"]){
                  this.navLinks[5].imgAtv = 'assets/images/complete.png'

                } else {
                  this.navLinks[5].imgAtv = 'assets/images/pending.png'
                }

                if(data["consideracionPreviasAvaluo"]){
                  this.navLinks[6].imgAtv = 'assets/images/complete.png'

                } else {
                  this.navLinks[6].imgAtv = 'assets/images/pending.png'
                }

                if(data["avaluoFisicoDirecto"]){
                  this.navLinks[7].imgAtv = 'assets/images/complete.png'

                } else {
                  this.navLinks[7].imgAtv = 'assets/images/pending.png'
                }

                if(data["valorCapitalizacionRentas"]){
                  this.navLinks[8].imgAtv = 'assets/images/complete.png'

                } else {
                  this.navLinks[8].imgAtv = 'assets/images/pending.png'
                }

                if(data["anexoFotografico"]){
                  this.navLinks[9].imgAtv = 'assets/images/complete.png'

                } else {
                  this.navLinks[9].imgAtv = 'assets/images/pending.png'
                }


                
       
               
               
            },
            error => {
              //this.error = error;
     
                this.loading = false;
            });    
}
 

}
