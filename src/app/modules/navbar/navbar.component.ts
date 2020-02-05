import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor() {}
  isExpended = true;

  expand() {
    this.isExpended = true;
    console.log(this.isExpended);
  }

  collapse() {
    this.isExpended = false;
    console.log(this.isExpended);
  }
}
