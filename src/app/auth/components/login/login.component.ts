import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // userData: any[] = JSON.parse(localStorage.getItem("users"));
  usersArray: any[];

  profileForm = this.fb.group({
    Username: ['', Validators.required],
    Password: ['', Validators.required]
  })
  constructor(private fb: FormBuilder,
    private AuthService: AuthService) { }

  ngOnInit(): void {
  }
  onLogIn() {
    this.AuthService.fetchUsers(
      this.profileForm.value.Username, 
      this.profileForm.value.Password
    )
  }
}
