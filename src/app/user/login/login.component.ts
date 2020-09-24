import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData: any[] = JSON.parse(localStorage.getItem("users"));

  profileForm = this.fb.group({
    Username: ['', Validators.required],
    Password: ['', Validators.required]
  })
  constructor(private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

  }
  onSignIn() {
    const index = this.userData.findIndex(x => ((x.Username === this.profileForm.value.Username || x.Email === this.profileForm.value.Username)
        && x.Password === this.profileForm.value.Password));
    if (index !== -1) {
        alert("You are now Signed In!")
    }
    else {
        alert("Wrong Password or Login credentials!")
    }    
  }
}
