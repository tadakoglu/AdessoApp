import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UnitDetailComponent } from './components/unit-detail/unit-detail.component';
import { UnitComponent } from './components/unit/unit.component';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'unit', component: UnitComponent },
  { path: 'unit-detail/:UnitId', component: UnitDetailComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
