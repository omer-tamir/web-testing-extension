import { ApplicationLogin } from './../models/applicationLogin';
import { Injectable } from '@angular/core';
import { Application } from '../models/application';
import { LoggerService } from './logger.service';
import { LoginParams } from '../models/loginParams';
import { InputType } from '../models/InputType';
import { DefaultApp } from '../models/defaultApp';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private loggerService: LoggerService) {}

  async fetchData(): Promise<Application[]> {
    const url = chrome.runtime.getURL('assets/data.json');
    const response = await fetch(url);
    const applications = response.json();
    return applications;
  }

  async getAllApplications(): Promise<Application[]> {
    let applications = (await this.fetchData()) || [];
    if (applications.length === 0) {
      applications = this.SeedSampleApplication();
    }
    return applications;
  }

  async getApplicationsLogiginsForDefaultApp(): Promise<
    Array<ApplicationLogin>
  > {
    const applications = await this.getAllApplications();
    const defaultAppId = this.getDefaultUrl().id;
    const applicationLogins: Array<ApplicationLogin> = [];
    applications.forEach((application) => {
      application.applicationLogin.forEach((login) => {
        if (defaultAppId === application.id) {
          applicationLogins.push(login);
        }
      });
    });
    return applicationLogins;
  }

  async deleteApplication(id: number) {
    const applications = await this.getAllApplications();
    for (let i = 0; i < applications.length; i++) {
      if (applications[i].id === id) {
        applications.splice(i, 1);
        break;
      }
    }
    this.saveApplications(applications);
  }

  async updateApplication(application: Application) {
    const applications = await this.getAllApplications();
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

  setDefaultApp(defaultApp: DefaultApp) {
    localStorage.setItem('defaultApp', JSON.stringify(defaultApp));
  }

  getDefaultUrl(): DefaultApp {
    return JSON.parse(localStorage.getItem('defaultApp')) || [];
  }

  SeedSampleApplication(): Application[] {
    const applications = [];

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
    this.setDefaultApp({ id: 0, defaultUrl: 'https://github.com/' });
    return applications;
  }
}
