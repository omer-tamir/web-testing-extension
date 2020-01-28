import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { AddApplicationComponent } from './modules/add-application/add-application.component';
import { AddLoginParamsComponent } from './modules/login-params/add-login-params.component';
import { ApplicationsListComponent } from './modules/applications-list/applications-list.component';
import { AddLoginComponent } from './modules/login/add-login.component';
import { LoginsListComponent } from './modules/logins-list/logins-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddApplicationComponent,
    ApplicationsListComponent,
    AddLoginParamsComponent,
    AddLoginComponent,
    LoginsListComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
