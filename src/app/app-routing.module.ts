import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';

import { AdminLayoutComponent } from './theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './theme/auth-layout/auth-layout.component';
import { AuthGuard } from './../app/_helpers/auth.guard';
import { LoginComponent } from './routes/sessions/login';
import { RecoverPasswordComponent } from './routes/sessions/recover-password/recover-password.component';
import { InicioComponent } from './routes/inicio/inicio.component';
import { AvaluosComponent } from './routes/avaluos/avaluos.component';
import { AvaluosLayoutComponent } from './routes/avaluos/avaluos-layout/avaluos-layout.component';
import { PanelVisitasComponent } from './routes/avaluos/panel-visitas/panel-visitas.component'; 
import { PanelAntecedentesComponent } from './routes/avaluos/panel-antecedentes/panel-antecedentes.component';
import { PanelCaracteristicasUrbanasComponent } from './routes/avaluos/panel-caracteristicas-urbanas/panel-caracteristicas-urbanas.component';
import { PanelTerrenoComponent } from './routes/avaluos/panel-terreno/panel-terreno.component';
import { PanelDesInmuebleComponent } from './routes/avaluos/panel-des-inmueble/panel-des-inmueble.component';
import { PanelElemConstruccionComponent } from './routes/avaluos/panel-elem-construccion/panel-elem-construccion.component';
import { PanelConsPreviasComponent } from './routes/avaluos/panel-cons-previas/panel-cons-previas.component'
import { PanelAvaluoFisicoComponent } from './routes/avaluos/panel-avaluo-fisico/panel-avaluo-fisico.component';
import { PanelValorRentasComponent } from './routes/avaluos/panel-valor-rentas/panel-valor-rentas.component';
import { PanelAnexoFotograficoComponent } from './routes/avaluos/panel-anexo-fotografico/panel-anexo-fotografico.component';


const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Dashboard', titleI18n: 'login' },
      },
      {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        data: { title: 'Recuperar contraseña', titleI18n: 'register' },
      },
     
    ],
  },
  {
    path: 'admin-layout',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'inicio',
        component: InicioComponent,
        data: { title: 'Inicio', titleI18n: 'inicio' }, canActivate: [AuthGuard]
      },
      {
        path: 'avaluos',
        component: AvaluosComponent,
        data: { title: 'Avaluos', titleI18n: 'avaluos' }
      },
      {
        path: 'avaluos-layout',
        component: AvaluosLayoutComponent,
        children: [
          {
            path: 'panel-visitas',
            component: PanelVisitasComponent,
            data: { title: 'Visitas', titleI18n: 'panel-visitas' }, 
          },
          {
            path: 'panel-antecedentes',
            component: PanelAntecedentesComponent,
            data: { title: 'Antecedentes', titleI18n: 'panel-antecedentes' }, 
          },
          {
            path: 'panel-caracteristicas-urbanas',
            component: PanelCaracteristicasUrbanasComponent,
            data: { title: 'Características urbanas' , titleI18n: 'panel-caracteristicas-urbanas'},
          },
          {
            path: 'panel-terreno',
            component: PanelTerrenoComponent,
            data: { title: 'Características urbanas' },
          },
          {
            path: 'panel-des-inmueble',
            component: PanelDesInmuebleComponent,
            data: { title: 'Características urbanas' },
          },
          {
            path: 'panel-elem-construccion',
            component: PanelElemConstruccionComponent,
            data: { title: 'Características urbanas' },
          },
          {
            path: 'panel-cons-previas',
            component: PanelConsPreviasComponent,
            data: { title: 'Características urbanas' },
          },
          {
            path: 'panel-avaluo-fisico',
            component: PanelAvaluoFisicoComponent,
            data: { title: 'Características urbanas' },
          },
          {
            path: 'panel-valor-rentas',
            component: PanelValorRentasComponent,
            data: { title: 'Características urbanas' },
          },
          {
            path: 'panel-anexo-fotografico',
            component: PanelAnexoFotograficoComponent,
            data: { title: 'Características urbanas' },
          },
        ],
      },
    ],
  },
  { path: '**', component: LoginComponent}, 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}