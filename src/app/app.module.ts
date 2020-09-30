import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { InicioComponent } from './routes/inicio/inicio.component';
import { LoginComponent } from './routes/sessions/login/login.component';
import { RecoverPasswordComponent } from './routes/sessions/recover-password';
import { AvaluosLayoutComponent } from './routes/avaluos/avaluos-layout/avaluos-layout.component'; 
import { AvaluosComponent } from './routes/avaluos/avaluos.component';
import { AltaDialogComponent } from './routes/avaluos/alta-dialog/alta-dialog.component';
import { PanelAntecedentesComponent } from './routes/avaluos/panel-antecedentes/panel-antecedentes.component';
import { PanelCaracteristicasUrbanasComponent } from './routes/avaluos/panel-caracteristicas-urbanas/panel-caracteristicas-urbanas.component';
import { PanelTerrenoComponent } from './routes/avaluos/panel-terreno/panel-terreno.component';
import { PanelDesInmuebleComponent } from './routes/avaluos/panel-des-inmueble/panel-des-inmueble.component';
import { PanelElemConstruccionComponent } from './routes/avaluos/panel-elem-construccion/panel-elem-construccion.component';
import { PanelConsPreviasComponent } from './routes/avaluos/panel-cons-previas/panel-cons-previas.component'
import { PanelAvaluoFisicoComponent } from './routes/avaluos/panel-avaluo-fisico/panel-avaluo-fisico.component';
import { PanelValorRentasComponent } from './routes/avaluos/panel-valor-rentas/panel-valor-rentas.component';
import { PanelAnexoFotograficoComponent } from './routes/avaluos/panel-anexo-fotografico/panel-anexo-fotografico.component';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ThemeModule } from './theme/theme.module';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';

import { DefaultInterceptor } from '@core';
import { StartupService } from '@core';
import { AgmCoreModule } from '@agm/core';
import { AguaMaskDirective }  from './_services/agua-mask-directive';  
import { Decimal8MaskDirective } from './_services/decimal8-mask-directive';
import { Decimal5MaskDirective } from './_services/decimal5-mask-directive';
import { Decimal6MaskDirective } from './_services/decimal6-mask-directive';
import { Decimal12MaskDirective } from './_services/decimal12-mask-directive';
import { AlertService } from './_services/alert.service' 
import {NgxMaskModule} from 'ngx-mask'

/* Angular material */
import { MaterialModule } from './material.module';

import { PanelVisitasComponent } from './routes/avaluos/panel-visitas/panel-visitas.component';
import { ColindanciasDialogComponent } from './routes/avaluos/colindancias-dialog/colindancias-dialog.component';
import { RegistroconstruccionDialogComponent } from './routes/avaluos/registroconstruccion-dialog/registroconstruccion-dialog.component';


export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

@NgModule({
  declarations: [AppComponent, InicioComponent, LoginComponent,
  RecoverPasswordComponent, AvaluosLayoutComponent,
  AvaluosComponent, AltaDialogComponent, PanelAntecedentesComponent,
  PanelCaracteristicasUrbanasComponent, PanelTerrenoComponent, PanelDesInmuebleComponent,
  PanelElemConstruccionComponent, PanelConsPreviasComponent, PanelAvaluoFisicoComponent,
  PanelValorRentasComponent, PanelAnexoFotograficoComponent, PanelVisitasComponent, 
  AguaMaskDirective, Decimal8MaskDirective, Decimal5MaskDirective, 
  Decimal6MaskDirective, Decimal12MaskDirective, ColindanciasDialogComponent,
  RegistroconstruccionDialogComponent
],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    ThemeModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBb0IjWDiABa72SO5c-QsPkz4WrXYnU-s4'
    }),
    NgxMaskModule
  ],
  providers: [ DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
    StartupService,  AlertService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true,
    },
  ],
  exports: [
    AguaMaskDirective
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
