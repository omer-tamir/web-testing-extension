import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { DataService } from './data.service';
import { ApplicationLogin } from '../models/applicationLogin';
import { InputType } from '../models/InputType';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private loggerService: LoggerService,
    private dataService: DataService
  ) {}

  setForm(login: ApplicationLogin) {
    this.setUrlSegments(login);
    // this.setFormValues(login);
    // chrome.tabs.executeScript({ code: 'document.getElementsByTagName("form")[0].submit();' });
  }

  setUrlSegments(login: ApplicationLogin) {
    const urlFrement = login.loginParams.find(
      x => x.inputType === InputType.UrlFregment
    );
    if (urlFrement == null) {
      return;
    }

    const defaultUrl = this.dataService.getDefaultUrl();
    const url = defaultUrl + urlFrement.controllerValue;

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const activeTab = tabs[0];
      const isUrlSet = activeTab.url.includes(urlFrement.controllerValue);
      if (!isUrlSet) {
        chrome.tabs.update(tabs[0].id, { url }, activeTab => {
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
