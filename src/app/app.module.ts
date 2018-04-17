import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
        } from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CfgCapGeneralComponent } from './cfg-cap-general/cfg-cap-general.component';
import { FrmCapGeneralComponent } from './cfg-cap-general/frm-cap-general/frm-cap-general.component';
import { CfgCapEspecificaComponent } from './cfg-cap-especifica/cfg-cap-especifica.component';
import { FrmCapEspecificaComponent } from './cfg-cap-especifica/frm-cap-especifica/frm-cap-especifica.component';
import { CfgCapPdmComponent } from './cfg-cap-pdm/cfg-cap-pdm.component';
import { FrmCapPdmComponent } from './cfg-cap-pdm/frm-cap-pdm/frm-cap-pdm.component';
import { GridComponent } from './grid/grid.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AgGridModule} from 'ag-grid-angular/main';
import { MyGridApplicationComponent } from './my-grid-application/my-grid-application.component';
import { RedComponentComponent } from './red-component/red-component.component';
import {CatPdmService} from './services/cat-pdm.service';
import {CatEstatusService} from './services/cat-estatus.service';
import {CatAreasService} from './services/cat-areas.service';
import {CatStatusService} from './services/cat-status.service';
import {CatProcesosService} from './services/cat-procesos.service';
import {CatPropsService} from './services/cat-props.service';
import { AboutComponent } from './about/about.component';
import {CatCursosGeneralService} from './services/cat-cursos-general.service';
import {CatCursosEspecificosService} from './services/cat-cursos-especificos.service';
import { CatAreasPuestosComponent } from './cat-areas-puestos/cat-areas-puestos.component';
import {CatPuestosService} from './services/cat-puestos.service';
import { AbcareasComponent } from './cat-areas-puestos/abcareas.component';
import { DialogmessageComponent } from './dialogmessage/dialogmessage.component';
import { AbcPuestosComponent } from './cat-areas-puestos/abc-puestos.component';
import { AdmPersonalComponent } from './adm-personal/adm-personal.component';
import {PersonalService} from './services/personal.service';
import { AbcPersonalComponent } from './adm-personal/abc-personal.component';
import { RelcapgenAreaspuestosComponent } from './relcapgen-areaspuestos/relcapgen-areaspuestos.component';
import { ProgramaCursosGeneralComponent } from './programa-cursos-general/programa-cursos-general.component';
import {TrainingDatesService} from './services/training-dates.service';
import { ProgramaCursosEspecificosComponent } from './programa-cursos-especificos/programa-cursos-especificos.component';
import { ProgramaPdmsComponent } from './programa-pdms/programa-pdms.component';
import { PruebasControlesComponent } from './pruebas-controles/pruebas-controles.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MasInformacionComponent } from './mas-informacion/mas-informacion.component';
import { MasInformacionProgramadosComponent } from './mas-informacion-programados/mas-informacion-programados.component';
import { MasInformacionCursadosComponent } from './mas-informacion-cursados/mas-informacion-cursados.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import {LoginService} from './services/login.service';
import {AuthGuard} from './auth/auth.guard';
import {AuthInterceptor} from './auth/auth.interceptor';
import { CapturaCalificacionesComponent } from './captura-calificaciones/captura-calificaciones.component';


const appRouter: Routes = [
  {path: '', redirectTo: '/user', pathMatch: 'full'},
  {path: 'cfg-cap-pdm', component: CfgCapPdmComponent, canActivate: [AuthGuard]},
  {path: 'cfg-cap-especifica', component: CfgCapEspecificaComponent, canActivate: [AuthGuard]},
  {path: 'cfg-cap-general', component: CfgCapGeneralComponent, canActivate: [AuthGuard]},
  {path: 'my-grid-application', component: MyGridApplicationComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent , canActivate: [AuthGuard]},
  {path: 'cat-areas-puestos', component: CatAreasPuestosComponent , canActivate: [AuthGuard]},
  {path: 'adm-personal', component: AdmPersonalComponent, canActivate: [AuthGuard]},
  {path: 'programa-cursos-general', component: ProgramaCursosGeneralComponent, canActivate: [AuthGuard]},
  {path: 'programa-cursos-especificos', component: ProgramaCursosEspecificosComponent, canActivate: [AuthGuard]},
  {path: 'programa-pdms', component: ProgramaPdmsComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'mas-informacion', component: MasInformacionComponent, canActivate: [AuthGuard]},
  {path: 'mas-informacion-programados', component: MasInformacionProgramadosComponent, canActivate: [AuthGuard]},
  {path: 'mas-informacion-cursados', component: MasInformacionCursadosComponent, canActivate: [AuthGuard]},
  {path: 'captura-calificaciones', component: CapturaCalificacionesComponent}, // canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CfgCapGeneralComponent,
    FrmCapGeneralComponent,
    CfgCapEspecificaComponent,
    FrmCapEspecificaComponent,
    CfgCapPdmComponent,
    FrmCapPdmComponent,
    GridComponent,
    MyGridApplicationComponent,
    RedComponentComponent,
    AboutComponent,
    CatAreasPuestosComponent,
    AbcareasComponent,
    DialogmessageComponent,
    AbcPuestosComponent,
    AdmPersonalComponent,
    AbcPersonalComponent,
    RelcapgenAreaspuestosComponent,
    ProgramaCursosGeneralComponent,
    ProgramaCursosEspecificosComponent,
    ProgramaPdmsComponent,
    PruebasControlesComponent,
    DashboardComponent,
    MasInformacionComponent,
    MasInformacionProgramadosComponent,
    MasInformacionCursadosComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    CapturaCalificacionesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRouter),

    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    AgGridModule.withComponents([RedComponentComponent]),
   // AgGridModule.withComponents([RedComponentComponent])
  ],
  entryComponents: [GridComponent,
    FrmCapPdmComponent,
    FrmCapGeneralComponent,
    FrmCapEspecificaComponent,
    AbcareasComponent,
    DialogmessageComponent,
    AbcPuestosComponent,
    AbcPersonalComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard, CatPdmService, CatAreasService, CatEstatusService,
    CatStatusService, CatProcesosService, CatPropsService,
    CatPropsService, CatCursosGeneralService, CatCursosEspecificosService, CatPuestosService, PersonalService,
    TrainingDatesService, LoginService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi : true
    },
  ]

})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
