import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from './shared/user.model';

@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  authUrl = 'http://localhost:8081/api/users';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(this.authUrl).pipe(
      map((res: any) => {
        console.log(res);
        return res.users;
      })
    );
  }

  addUser(user: User) {
    return this.http.post(this.authUrl, user);
  }
}
