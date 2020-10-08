import { Component, OnChanges, OnInit } from '@angular/core';
import { Constants } from '../../../constants/constants';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  ERROR_MESAGES = Constants.ERROR_MESAGES;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this._createForm();
  }
  ngOnInit() {}

  private _createForm() {
    this.registerForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        noWhitespaceValidator,
      ]),
      login: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        noWhitespaceValidator,
      ]),
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null),
      city: new FormControl(null),
      country: new FormControl(null),
    });
  }

  onSubmit() {
    this.authService.getUsers(this.registerForm.value, 'register');
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  myValidator;
}

function noWhitespaceValidator(control: FormControl) {
  const isWhitespace = (control.value || '').includes(' ');
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
