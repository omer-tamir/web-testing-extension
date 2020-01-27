import { LoginParams } from './../../models/loginParams';
import { ApplicationLogin } from '../../models/applicationLogin';
import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Application } from 'src/app/models/application';
import { InputType } from 'src/app/models/InputType';
import { log } from 'util';

@Component({
  selector: 'app-add-login',
  templateUrl: './add-login.component.html'
})
export class AddLoginComponent {
  @Input() application: Application;
  applicationLogin: ApplicationLogin;

  constructor(private dataService: DataService) {
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
    this.setUrlSegments(login);
    // this.setFormValues(login);
    // chrome.tabs.executeScript({ code: 'document.getElementsByTagName("form")[0].submit();' });
  }
  setUrlSegments(login: ApplicationLogin) {
    const urlFrement = login.loginParams.find(
      x => x.inputType === InputType.UrlFregment
    );
    if (urlFrement == null) { return; }

    const defaultUrl = this.dataService.getDefaultUrl();
    console.log('defaultUrl :' + defaultUrl);
    const url = defaultUrl + urlFrement.controllerValue;
    console.log('urlFrement :' + url);

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const activeTab = tabs[0];
      const isUrlSet = activeTab.url.includes(urlFrement.controllerValue);
      if (!isUrlSet) {
        chrome.tabs.update(tabs[0].id, { url }, (activeTab) => {

          const listener = (tabId, changeInfo) => {
            if (tabId === activeTab.id && changeInfo.status === 'complete') {

              chrome.tabs.onUpdated.removeListener(listener);

              login.loginParams.forEach(p => {
                let executeOnCaller: string;
                switch (p.inputType) {
                  case InputType.Id:
                    executeOnCaller = `document.getElementById('${p.controllerNameOrId}').value='${p.controllerValue}';`;
                    break;
                  case InputType.Name:
                    executeOnCaller = `document.getElementsByName('${p.controllerNameOrId}').forEach(e=>{e.value='${p.controllerValue}'});`;
                    break;
                  case InputType.Class:
                    executeOnCaller = `document.getElementByClass('${p.controllerNameOrId}').value='${p.controllerValue}';`;
                    break;
                  default:
                    break;
                }

                chrome.tabs.executeScript({ code: executeOnCaller });
              });
            }
          };
          chrome.tabs.onUpdated.addListener(listener);
        });
      } else {
        this.setFormValues(login);
      }
    });
  }

  setFormValues(login: ApplicationLogin) {
    login.loginParams.forEach(p => {
      let executeOnCaller: string;
      switch (p.inputType) {
        case InputType.Id:
          executeOnCaller = `document.getElementById('${p.controllerNameOrId}').value='${p.controllerValue}';`;
          break;
        case InputType.Name:
          executeOnCaller = `document.getElementsByName('${p.controllerNameOrId}').forEach(e=>{e.value='${p.controllerValue}'});`;
          break;
        case InputType.Class:
          executeOnCaller = `document.getElementByClass('${p.controllerNameOrId}').value='${p.controllerValue}';`;
          break;
        default:
          break;
      }
      chrome.tabs.executeScript({ code: executeOnCaller });
    });
  }


}
