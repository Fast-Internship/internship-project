import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loading = new Subject<boolean>();
  loginedUser: any; // Type User.model
  userLoggedIn = new BehaviorSubject<boolean>(false);
  usersArray: any[];
  constructor(private http: HttpClient, private router: Router) {}

  getUsers(user, type) {
    const postData: User = user;
    return this.http
      .get<{ name: string }>(
        'https://angular-users-77731.firebaseio.com/users.json'
      )
      .subscribe((res) => {
        this.loading.next(false);
        switch (type) {
          case 'register':
            if (!this.checkUser(postData, Object.values(res), type)) {
              this.registerUser(postData);
              this.router.navigate(['login']);
            } else {
              alert('User with this email or login exists');
            }
            break;
          case 'login':
            if (this.checkUser(postData, Object.values(res), type)) {
              alert('Success');
              this.loginedUser = this.checkUser(
                postData,
                Object.values(res),
                type
              );
              this.userLoggedIn.next(true);
              localStorage.setItem('user', JSON.stringify(this.loginedUser));
              this.router.navigate(['car-list']);
            } else {
              alert('Wrong login credentials');
            }
            break;
        }
      });
  }

  checkUser(user, users, type) {
    let foundUser;
    switch (type) {
      case 'register':
        foundUser = users.find(
          (elem) => elem.login === user.login || elem.email === user.email
        );
        break;
      case 'login':
        foundUser = users.find(
          (elem) => elem.login === user.login && elem.password === user.password
        );
        break;
    }
    return foundUser;
  }

  registerUser(user) {
    return this.http
      .post('https://angular-users-77731.firebaseio.com/users.json', user)
      .subscribe();
  }
}