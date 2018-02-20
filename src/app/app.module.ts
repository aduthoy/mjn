import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
import { HttpClientModule} from '@angular/common/http';
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


const appRouter: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'cfg-cap-pdm', component: CfgCapPdmComponent},
  {path: 'cfg-cap-especifica', component: CfgCapEspecificaComponent},
  {path: 'cfg-cap-general', component: CfgCapGeneralComponent},
  {path: 'my-grid-application', component: MyGridApplicationComponent},
  {path: 'about', component: AboutComponent}
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
    AboutComponent
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
  FrmCapPdmComponent, FrmCapGeneralComponent],
  bootstrap: [AppComponent],
  providers: [
    CatPdmService, CatAreasService, CatEstatusService,
    CatStatusService, CatProcesosService, CatPropsService,
    CatPropsService, CatCursosGeneralService
  ]

})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
