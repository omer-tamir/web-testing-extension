import { ApplicationLogin } from '../../models/applicationLogin';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Application } from 'src/app/models/application';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-add-login',
  templateUrl: './add-login.component.html'
})
export class AddLoginComponent {
  @Input() application: Application;
  @Output() applicationChanged: EventEmitter<any> = new EventEmitter();
  applicationLogin: ApplicationLogin;

  constructor(
    private dataService: DataService,
    private loginService: LoginService
  ) {
    this.applicationLogin = new ApplicationLogin();
  }

  onApplicationChanged($event): void {
    this.applicationChanged.emit();
  }

  add() {
    this.application.applicationLogin.push(this.applicationLogin);
    this.dataService.updateApplication(this.application);
    this.applicationChanged.emit();
    this.applicationLogin = new ApplicationLogin();
  }

  copyLogin(login: ApplicationLogin) {
    this.applicationLogin = {
      useCase: `copy of ${login.useCase}`,
      loginParams: login.loginParams
    };
  }

  remove(login: ApplicationLogin) {
    for (let i = 0; i < this.application.applicationLogin.length; i++) {
      if (this.application.applicationLogin[i].useCase === login.useCase) {
        this.application.applicationLogin.splice(i, 1);
        break;
      }
    }
    this.applicationChanged.emit();
  }

  setParams(login: ApplicationLogin) {
    this.applicationLogin = login;
  }

  setForm(login: ApplicationLogin) {
    this.loginService.setForm(login);
  }
}
