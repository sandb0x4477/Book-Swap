import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: ['user1', Validators.required],
      password: ['password', Validators.required],
    });
  }

  login() {
    console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe(
      res => {
        this.alertify.success('Login Sucessful');
      },
      err => {
        this.alertify.error(err);
      }, () => {
        this.router.navigate(['/booklist']);
      });
  }
}
