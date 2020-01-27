import { ApplicationsListComponent } from './modules/applications-list/applications-list.component';
import { AddApplicationComponent } from './modules/add-application/add-application.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'add', component: AddApplicationComponent },
  { path: '', component: ApplicationsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
