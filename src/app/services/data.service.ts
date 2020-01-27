import { ApplicationLogin } from './../models/applicationLogin';
import { Injectable } from '@angular/core';
import { Application } from '../models/application';
import { LoggerService } from './logger.service';
import { LoginParams } from '../models/loginParams';
import { InputType } from '../models/InputType';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private loggerService: LoggerService) { }

  getAllApplications(): Application[] {
    let applications = JSON.parse(localStorage.getItem('applications')) || [];
    this.loggerService.log(applications.length);
    if (applications.length === 0) {
      applications = this.SeedSampleApplication();
    }
    this.loggerService.log(applications);

    return applications;
  }
  SeedSampleApplication(): Application[] {
    const applications = []

    const application = new Application();
    application.id = 0;
    application.name = 'web app';
    application.testUrl = 'https://github.com/';
    application.devUrl = 'https://github.com/';
    application.prodUrl = 'https://github.com/';

    const login = new ApplicationLogin();
    login.useCase = 'generic login';

    const urlParameter = new LoginParams();
    urlParameter.controllerNameOrId = 'login';
    urlParameter.controllerValue = 'login';
    urlParameter.inputType = InputType.UrlFregment;

    const loginParamUser = new LoginParams();
    loginParamUser.controllerNameOrId = 'login';
    loginParamUser.controllerValue = 'MyUsername';
    loginParamUser.inputType = InputType.Name;

    const loginParamPassword = new LoginParams();
    loginParamPassword.controllerNameOrId = 'password';
    loginParamPassword.controllerValue = 'password';
    loginParamPassword.inputType = InputType.Name;


    login.loginParams.push(loginParamUser, loginParamPassword, urlParameter);
    application.applicationLogin.push(login);
    applications.push(application);

    this.saveApplications(applications);
    this.setDefaultUrl('https://github.com/');
    return applications;

  }

  deleteApplication(id: number) {
    const applications = this.getAllApplications();
    for (let i = 0; i < applications.length; i++) {
      if (applications[i].id === id) {
        applications.splice(i, 1);
        break;
      }
    }
    this.saveApplications(applications);
  }

  updateApplication(application: Application) {
    const applications = this.getAllApplications();
    for (let i = 0; i < applications.length; i++) {
      if (applications[i].id === application.id) {
        applications[i] = application;
        break;
      }
    }
    this.saveApplications(applications);
  }

  saveApplications(applications: Application[]) {
    localStorage.setItem('applications', JSON.stringify(applications));
  }

  setDefaultUrl(url: string) {
    localStorage.setItem('defaultUrl', url);
  }

  getDefaultUrl(): string {
    return localStorage.getItem('defaultUrl');
  }
}
