import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { DataService } from '../../services/data.service';
import { LoginParams } from '../../models/loginParams';
import { InputType } from 'src/app/models/InputType';
import { ApplicationLogin } from 'src/app/models/applicationLogin';
@Component({
  selector: 'app-login-params',
  templateUrl: './add-login-params.component.html',
  styles: []
})
export class AddLoginParamsComponent implements OnChanges {
  @Input() applicationLogin: ApplicationLogin;
  @Output() applicationChanged: EventEmitter<any> = new EventEmitter();
  loginParams: LoginParams;
  keys = Object.keys;
  inputTypes = InputType;

  constructor(private dataService: DataService) {
    this.loginParams = new LoginParams();
  }

  ngOnChanges() {
    // this.loginParams = this.applicationLogin.loginParams;
  }

  addParam() {
    this.applicationLogin.loginParams.push(this.loginParams);
    this.loginParams = new LoginParams();
    this.applicationChanged.emit();
  }

  setParams(loginParams: LoginParams) {
    this.loginParams = loginParams;
  }

  removeParam(loginParams: LoginParams) {
    for (let i = 0; i < this.applicationLogin.loginParams.length; i++) {
      if (
        this.applicationLogin.loginParams[i].controllerNameOrId ===
        loginParams.controllerNameOrId
      ) {
        this.applicationLogin.loginParams.splice(i, 1);
        break;
      }
    }
    this.applicationChanged.emit();
  }
}
