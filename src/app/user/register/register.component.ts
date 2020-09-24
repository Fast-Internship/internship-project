import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../user.model';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('signValidation') signValidation: ElementRef;
  userData: object[] = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
  profileForm = this.fb.group({
    Username: ['', [Validators.minLength(4),Validators.required]],
    Email: ['', [Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),Validators.required]],
    Password: ['', [Validators.minLength(6),Validators.required]],
  })
  user: User;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

  }

  formValidate() {
    if(this.profileForm.valid){
      this.user = new User();
      this.user.Username = this.profileForm.value.Username
      this.user.Email = this.profileForm.value.Email
      this.user.Password = this.profileForm.value.Password
      this.userData = [...this.userData, this.user]
      localStorage.setItem("users", JSON.stringify(this.userData));
      alert("New Account Created!")
      this.router.navigate(['login'])
    }
  }
}