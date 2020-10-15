import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AddCarComponent } from './components/add-car/add-car.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { EditListComponent } from './components/edit-list/edit-list.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [

  { path: 'not-loaded', component: PageNotFoundComponent },
  { path: 'car-list', 
    component: CarListComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'add-car', component: AddCarComponent },
      { path: 'edit-list', component: EditListComponent },
    ]},
  { path: '**', redirectTo: 'not-loaded' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
