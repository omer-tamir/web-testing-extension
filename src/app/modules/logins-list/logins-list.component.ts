import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { LoginService } from 'src/app/services/login.service';
import { ApplicationLogin } from 'src/app/models/applicationLogin';
import { Application } from 'src/app/models/application';
import { LoginParams } from './../../models/loginParams';

@Component({
  selector: 'app-logins-list',
  templateUrl: './logins-list.component.html'
})
export class LoginsListComponent implements OnInit {
  applications: Application[];
  applicationLogins: Array<ApplicationLogin> = [];

  constructor(
    private dataService: DataService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.applicationLogins = this.dataService.getApplicationsLogiginsForDefaultApp();
  }

  setForm(login: ApplicationLogin) {
    this.loginService.setForm(login);
  }
}
