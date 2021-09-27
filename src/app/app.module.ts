import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app-state';
import { EffectsModule } from '@ngrx/effects';
import { UnitEffects } from 'src/app-state/effects/unit.effects';
import { HomeComponent } from './components/home/home.component';
import { UnitComponent } from './components/unit/unit.component';
import { UnitDetailComponent } from './components/unit-detail/unit-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { FooterComponent } from './components/footer/footer.component';
import { UnitDetailEffects } from 'src/app-state/effects/unitDetail.effects';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UnitWithReactiveFormsComponent } from './components/unitWithReactiveForms/unitWithReactiveForms.component';
import {MatButtonModule} from '@angular/material/button';
@NgModule({

  declarations: [
    AppComponent, HomeComponent, UnitComponent, UnitDetailComponent,
    NavbarComponent, FooterComponent, UnitWithReactiveFormsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatSliderModule,
    MatTooltipModule,
    MatTableModule,
    MatButtonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UnitEffects, UnitDetailEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
