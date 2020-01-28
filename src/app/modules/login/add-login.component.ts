import { LoginParams } from './../../models/loginParams';
import { ApplicationLogin } from '../../models/applicationLogin';
import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Application } from 'src/app/models/application';
import { InputType } from 'src/app/models/InputType';
import { log } from 'util';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-add-login',
  templateUrl: './add-login.component.html'
})
export class AddLoginComponent {
  @Input() application: Application;
  applicationLogin: ApplicationLogin;

  constructor(
    private dataService: DataService,
    private loginService: LoginService
  ) {
    this.applicationLogin = new ApplicationLogin();
  }

  add() {
    this.application.applicationLogin.push(this.applicationLogin);
    this.dataService.updateApplication(this.application);
    this.applicationLogin = new ApplicationLogin();
  }

  remove(login: ApplicationLogin) {
    for (let i = 0; i < this.application.applicationLogin.length; i++) {
      if (this.application.applicationLogin[i].useCase === login.useCase) {
        this.application.applicationLogin.splice(i, 1);
        break;
      }
    }
  }

  setParams(login: ApplicationLogin) {
    this.applicationLogin = login;
  }

  setForm(login: ApplicationLogin) {
    this.loginService.setForm(login);
  }
}
