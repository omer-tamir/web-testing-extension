import { Injectable } from '@angular/core';
import { Application } from '../models/application';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private loggerService: LoggerService) {}

  getAllApplications(): Application[] {
    const applications = JSON.parse(localStorage.getItem('applications')) || [];

    this.loggerService.log(applications);
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
