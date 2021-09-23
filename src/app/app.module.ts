import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent, HomeComponent, UnitComponent, UnitDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UnitEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
