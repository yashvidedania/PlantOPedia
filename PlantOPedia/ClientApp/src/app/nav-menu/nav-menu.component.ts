import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  loggedIn : any;

  constructor (private loginService : LoginService){}

  ngOnInit(): void {
    this.loggedIn = this.loginService.isUserLoggedIn();
  }


  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  removeLoggedInUserDetails(): void {
    localStorage.clear();
  }

}
