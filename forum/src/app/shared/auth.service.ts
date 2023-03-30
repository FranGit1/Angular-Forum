import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { UserService } from '../auth/user.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;
  authChange: Subject<boolean> = new Subject<boolean>();
  userSub: Subject<User> = new Subject<User>();
  errorEmitter: Subject<string> = new Subject<string>();
  users: User[] = [];
  userSubject: BehaviorSubject<User[]> | null = null;
  subscription: Subscription | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    this.userSubject = this.userService.getUsers();
    this.subscription = this.userSubject.subscribe((res) => {
      this.users = res;
    });
  }

  login(credentials: User) {
    let users = this.users;

    new Observable((observer) => {
      setTimeout(() => {
        let u = users.find(
          (u) =>
            u.username == credentials.username &&
            u.password == credentials.password
        );
        observer.next(u);
      }, 1000);
    }).subscribe((user: any) => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.authChange.next(true);
        this.userSub.next(user);
        this.router.navigate(['/']);
      } else {
        this.errorEmitter.next('Wrong credentials');
      }
    });
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    let u = localStorage.getItem('user');

    if (this.user != null || u != null) {
      return true;
    } else {
      return false;
    }

    // return this.user != null;
  }

  getUser() {
    let u = localStorage.getItem('user');
    if (this.user != null) return { ...this.user };

    if (!this.user && u) this.user = JSON.parse(u);
    return { ...this.user } as User;
  }
}
