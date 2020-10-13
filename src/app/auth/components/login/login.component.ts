import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  hello: boolean = true;
  profileForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {}

  onLogIn() {
    this.loading = true;
    this.authService.getUsers(this.profileForm.value, 'login');
    this.authService.loading.subscribe((bool) => {
      this.loading = bool;
    });
  }
}
