import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarShowComponent } from './car-show/car-show.component';

const routes: Routes = [
  {path: '', component: CarShowComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
