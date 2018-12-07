import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {
    console.log(this.registerForm.value);

    // if (this.registerForm.valid) {
    //   this.user = Object.assign({}, this.registerForm.value);
    //   this.auth.register(this.user).subscribe(res => {
    //     this.alertify.success('Registration successful');
    //   }, err => {
    //     this.alertify.error(err);
    //   }, () => {
    //     const user = {
    //       username: this.registerForm.get('username').value,
    //       password: this.registerForm.get('password').value
    //     };
    //     this.auth.login(user).subscribe(() => {
    //       this.router.navigate(['/members']);
    //     });
    //   });
    // }
  }

}
