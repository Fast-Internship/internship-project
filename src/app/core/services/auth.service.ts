import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';


@Injectable()

export class AuthService {

  userLoggedIn = new BehaviorSubject<boolean>(false);
  usersArray: any[];
  constructor(private http: HttpClient) { }

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
        console.log(posts)
        this.usersArray = posts;
        const index = this.usersArray.findIndex(user => ((user.Username === Username || user.Email === Username)
          && user.Password === Password))

        if (index !== -1) {
          this.userLoggedIn.next(true)
          alert("You are now Signed In!")                 
        } else {
          alert("Wrong Password or Login Credentials")
        }
      })
  }
}