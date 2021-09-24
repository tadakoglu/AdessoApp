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
import {MatTableModule} from '@angular/material/table';
import { FooterComponent } from './components/footer/footer.component';
@NgModule({

  declarations: [
    AppComponent, HomeComponent, UnitComponent, UnitDetailComponent,
    NavbarComponent, FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatSliderModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UnitEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
