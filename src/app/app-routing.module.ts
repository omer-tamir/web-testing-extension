import { ApplicationsListComponent } from './modules/applications-list/applications-list.component';
import { AddApplicationComponent } from './modules/add-application/add-application.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginsListComponent } from './modules/logins-list/logins-list.component';

const routes: Routes = [
  { path: 'add', component: AddApplicationComponent },
  { path: 'manage', component: ApplicationsListComponent },
  { path: '', component: LoginsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
