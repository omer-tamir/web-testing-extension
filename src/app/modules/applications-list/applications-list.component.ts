import { Application } from './../../models/application';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html'
})
export class ApplicationsListComponent implements OnInit {
  applicationList: Application[];
  rightPanelApplication: Application;

  onApplicationChanged($event): void {
    this.dataService.updateApplication(this.rightPanelApplication);
    console.log('changes save', $event);
  }
  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.rightPanelApplication = new Application();
    this.getApplicationsList();
  }

  getApplicationsList() {
    this.applicationList = this.dataService.getAllApplications();

    if (this.applicationList[0] != null) {
      this.rightPanelApplication = this.applicationList[0];
    }
  }

  setRighPanel(app: Application) {
    this.rightPanelApplication = app;
  }

  deleteApplication() {
    this.dataService.deleteApplication(this.rightPanelApplication.id);
    this.getApplicationsList();
  }

  updateApplication() {
    this.dataService.updateApplication(this.rightPanelApplication);
  }

  goToUrl(goTourl: string) {
    this.dataService.setDefaultApp({
      id: this.rightPanelApplication.id,
      defaultUrl: goTourl
    });
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.update(tabs[0].id, { url: goTourl });
    });
  }
}
