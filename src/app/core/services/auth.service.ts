import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';


@Injectable({
  providedIn:"root"
})

export class AuthService {

  userLoggedIn = new BehaviorSubject<boolean>(false);
  usersArray: any[];
  constructor(private http: HttpClient, private router: Router) { }

  createAndStoreUser(Username: string, Email: string, Password: string) {
    const postData: User = { Username: Username, Email: Email, Password: Password }
    return this.http
      .post<{ name: string }>(
        'https://angular-users-77731.firebaseio.com/users.json', postData
      )
      .subscribe()
  }

  fetchUsers(Username: string, Password: string) {
    return this.http
      .get<{ [key: string]: User }>('https://angular-users-77731.firebaseio.com/users.json')
      .pipe(
        map(responseData => {
          const postsArray: User[] = [];
          for (let key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key })
            }
          }
          return postsArray;
        })
      ).subscribe(posts => {
        this.usersArray = posts;
        const user = this.usersArray.find(user => ((user.Username === Username || user.Email === Username)
          && user.Password === Password))

        if (user) {
          this.userLoggedIn.next(true)
          localStorage.setItem('user', JSON.stringify(user));
          alert("You are now Signed In!") 
          this.router.navigate(['car-list'])         
        } else {
          alert("Wrong Password or Login Credentials")
        }
      })
  }
}