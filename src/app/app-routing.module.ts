import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCarComponent } from './components/add-car/add-car.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { EditListComponent } from './components/edit-list/edit-list.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'add-car', component: AddCarComponent },
  { path: 'edit-list', component: EditListComponent },
  { path: 'not-loaded', component: PageNotFoundComponent },
  { path: 'car-list', component: CarListComponent },
  { path: '**', redirectTo: 'not-loaded' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
