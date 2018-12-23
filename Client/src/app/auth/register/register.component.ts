import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private alertify: AlertifyService,
  ) {}
  registerForm: FormGroup;
  user: User;

  static passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        address: ['', Validators.required],
        city: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(16),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: RegisterComponent.passwordMatchValidator },
    );
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.auth.register(this.user).subscribe(
        res => {
          this.alertify.success('Registration successful');
        },
        err => {
          this.alertify.error(err);
        },
        () => {
          const user = {
            username: this.registerForm.get('username').value,
            password: this.registerForm.get('password').value,
          };
          this.auth.login(user).subscribe(() => {
            this.router.navigate(['/booklatest']);
          });
        },
      );
    }
  }
}
