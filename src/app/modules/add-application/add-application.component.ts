import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.css']
})
export class AddApplicationComponent implements OnInit {
  showSuccessMessage = false;
  fullName: string;
  email: string;
  constructor() { }

  ngOnInit() {
  }

}
