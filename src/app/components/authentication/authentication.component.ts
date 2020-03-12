import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { finalize, map } from "rxjs/operators";
import {
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";


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
  //this.validateField(5, 10),
  createUserForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    confirm_password: new FormControl(""),
  });



  signup: boolean = true;


  constructor(private aFAtuh: AngularFireAuth, private db: AngularFirestore) { }

  async ngOnInit() {

    //await this.aFAtuh.auth.signOut();
    await this.aFAtuh.auth.signInWithEmailAndPassword('mehrab@gmail.com', '123456')
    // this.aFAtuh.authState.subscribe(state => {
    //   console.log(state ? state.email : "Not signed in");
    // })
  }


  createuser() {
    // console.log(this.createUserForm.value)
    this.aFAtuh
      .auth
      .createUserWithEmailAndPassword(this.createUserForm.value.email, this.createUserForm.value.password)
      .then(() => {
        this.db.collection('users').doc(this.createUserForm.value.email).set({
          username: this.createUserForm.value.name
        }, { merge: true })
      })
  }
}
