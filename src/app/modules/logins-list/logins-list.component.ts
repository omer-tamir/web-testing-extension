import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { LoginService } from 'src/app/services/login.service';
import { ApplicationLogin } from 'src/app/models/applicationLogin';
import { Application } from 'src/app/models/application';

@Component({
  selector: 'app-logins-list',
  templateUrl: './logins-list.component.html'
})
export class LoginsListComponent implements OnInit {
  applications: Application[];
  applicationLogins: Array<object> = [];

  constructor(
    private dataService: DataService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    const applications = this.dataService.getAllApplications();
    applications.forEach(application => {
      application.applicationLogin.forEach(login => {
        console.log(login);
        this.applicationLogins.push(login);
      });
      // for (const login of application.applicationLogin) {
      //   console.log(login);
      // }
    });
  }

  setForm(login: ApplicationLogin) {
    this.loginService.setForm(login);
  }
}
