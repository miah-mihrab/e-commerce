import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private aFAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) { }


  isUser() {
    return this.aFAuth.authState;
  }

  getUserRef(userId) {
    return this.db.collection("users").doc(userId);
  }

  signUp(createUserForm) {
    this.aFAuth
      .auth
      .createUserWithEmailAndPassword(createUserForm.value.email, createUserForm.value.password)
      .then(() => {
        this.db.collection('users').doc(createUserForm.value.email).set({
          username: createUserForm.value.name,
          role: createUserForm.value.role
        }, { merge: true }).then(() => {
          this.router.navigate(['/'])
        })
      }).catch(err => {
        if (err.code === "auth/email-already-in-use") {
          alert(err.message)
        }
      })
  }

  signInUser(signInForm) {

    this.aFAuth.auth
      .signInWithEmailAndPassword(signInForm.value.email, signInForm.value.password)
      .then(() => {
        this.router.navigate(['/'])
      })
      .catch(err => {
        if (err['code'] === 'auth/user-not-found') {
          alert('User Not Found');
        }
        if (err['code'] === 'auth/wrong-password') {
          alert('Wrong credentials. Please enter valid email and password');
        }
      });

  }

  logOutUser() {
    this.aFAuth.auth.signOut()
  }
}
