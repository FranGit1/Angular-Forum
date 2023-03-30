import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  authenticated: boolean = false;
  autoChangeSubscription: Subscription | null = null;
  user: User | null = null;
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.authenticated = this.auth.isAuthenticated();
    this.autoChangeSubscription = this.auth.authChange.subscribe(
      (authenticated) => (this.authenticated = authenticated)
    );

    this.auth.userSub.subscribe((user) => {
      this.user = user;
    });
    this.user = this.auth.getUser();
  }
  getClass(a: string) {
    return this.router.url == a ? 'active' : '';
  }

  checkRouteHome() {
    return this.router.url == '/';
  }

  checkRouteLogin() {
    return this.router.url == 'login';
  }

  logout() {
    this.auth.logout();
  }
  ngOnDestroy() {
    this.autoChangeSubscription?.unsubscribe();
  }
}
