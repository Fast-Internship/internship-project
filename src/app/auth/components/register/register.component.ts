import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('signValidation') signValidation: ElementRef;
  // userData: object[] = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
  profileForm = this.fb.group({
    Username: ['', [Validators.minLength(4), Validators.required]],
    Email: ['', [Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), Validators.required]],
    Password: ['', [Validators.minLength(6), Validators.required]],
  })

  constructor(private fb: FormBuilder, private router: Router, private AuthService: AuthService) { }

  ngOnInit(): void {

  }

  onRegister() {
    if (this.profileForm.valid) {      
      this.AuthService.createAndStoreUser(
        this.profileForm.value.Username,
        this.profileForm.value.Email,
        this.profileForm.value.Password
      )
      alert("New Account Created!")
      this.router.navigate(['login'])
    }
  }
}
