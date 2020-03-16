import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  validateField(min, max) {
    return (new FormControl('', [
      Validators.required,
      Validators.minLength(min),
      Validators.maxLength(max),
      Validators.pattern("[a-zA-Z ]*")
    ]));
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirm_password');
    return password === confirmPassword ? false : { passwordNotMatch: true };
  }
  createUserForm: FormGroup;

  signInForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl("",
      [
        Validators.required
      ]),
  });

  signup: boolean = false;


  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder) {
    this.createUserForm = this.formBuilder.group({
      name: this.validateField(3, 15),
      email: new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl("",
        [
          Validators.required,
          Validators.pattern(new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"))
        ]),
      confirm_password: new FormControl("", [
        Validators.required
      ]),
      role: new FormControl("", [
        Validators.required
      ])
    }, {
      validators: this.password.bind(this)
    });
  }

  ngOnInit(): void { }

  createuser() {
    this.authService.signUp(this.createUserForm);
  }

  signInUser() {
    try {
      this.authService.signInUser(this.signInForm);
    } catch (err) {
      console.log("User Not Found!")

    }
  }

  haveAccount() {
    this.signup = !this.signup
  }
}
