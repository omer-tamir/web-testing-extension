import { Component, OnChanges, Input } from '@angular/core';
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
    console.log(this.applicationLogin);
    this.applicationLogin.loginParams.push(this.loginParams);
    this.loginParams = new LoginParams();
    // this.dataService.updateApplication(this.application);
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
  }
}

// $('button[name="fillForm"]').click(function() {
//         var id = this.getAttribute("lineId");
//         var hash = $('#hash' + id).val();
//         var hasFullBirthDate = $('#birthDate' + id).val() != null;

//         chrome.tabs.query({
//                 active: true,
//                 lastFocusedWindow: true
//             },
//             function(tabs) {

//                 var tab = tabs[0];
//                 var isUrlSet = tab.url.includes(hash);
//                 if (!isUrlSet) {
//                     chrome.tabs.update(tab.id, { url: tab.url + hash }, function(tab1) {

//                         // add listener so callback executes only if page loaded. otherwise calls instantly
//                         var listener = function(tabId, changeInfo, tab) {

//                             if (tabId == tab1.id && changeInfo.status === 'complete') {
//                                 // remove listener, so only run once
//                                 chrome.tabs.onUpdated.removeListener(listener);
//                                 // do stuff
//                                 if (hasFullBirthDate) { setBdayFormValues(id) } else { setFormValues(id); }
//                             }
//                         }
//                         chrome.tabs.onUpdated.addListener(listener);
//                     })
//                 } else {
//                     if (hasFullBirthDate) { setBdayFormValues(id) } else { setFormValues(id); }
//                 };
//             });
//     });

//     function setFormValues(id) {
//         var surname = localStorage.getItem('surname' + id);
//         var day = localStorage.getItem('day' + id);
//         var month = localStorage.getItem('month' + id);
//         var year = localStorage.getItem('year' + id);

//         var executeOnCaller = 'document.getElementById("Surname").value = "' + surname + '";';
//         var executing = chrome.tabs.executeScript({ code: executeOnCaller });

//         executeOnCaller = 'document.getElementById("Day").value = "' + day + '";';
//         chrome.tabs.executeScript({ code: executeOnCaller });

//         executeOnCaller = 'document.getElementById("Month").value = "' + month + '";';
//         chrome.tabs.executeScript({ code: executeOnCaller });

//         executeOnCaller = 'document.getElementById("Year").value = "' + year + '";';
//         chrome.tabs.executeScript({ code: executeOnCaller });

//         executeOnCaller = 'document.getElementsByTagName("form")[0].submit();';
//         chrome.tabs.executeScript({ code: executeOnCaller });
//     };

//     function setBdayFormValues(id) {

//         var login = JSON.parse(localStorage.getItem("login" + id));

//         var executeOnCaller = 'document.getElementById("surname").value = "' + login.surname + '";';
//         chrome.tabs.executeScript({ code: executeOnCaller });

//         executeOnCaller = 'document.getElementById("date-picker").value = "' + login.birthDate + '";';
//         chrome.tabs.executeScript({ code: executeOnCaller });

//         executeOnCaller = 'document.getElementsByTagName("form")[0].submit();';
//         chrome.tabs.executeScript({ code: executeOnCaller });
//     };

// }
