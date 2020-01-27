import { Application } from './../../models/application';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginParams } from '../../models/loginParams';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.css']
})
export class AddApplicationComponent implements OnInit {
  application: Application;

  constructor(private router: Router) {
    this.application = new Application();
  }

  ngOnInit() {}

  add(): void {
    let applications: Application[];

    applications = JSON.parse(localStorage.getItem('applications')) || [];
    const lastApplicationId = applications.length;

    if (this.application.id === 0) {
      this.application.id = lastApplicationId + 1;
    }

    applications.push(this.application);

    localStorage.setItem('applications', JSON.stringify(applications));
    this.router.navigate(['']);
  }
}
