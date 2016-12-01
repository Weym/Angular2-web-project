import { Injectable } from "@angular/core";

import { UserAuth } from "../models/userAuth.interface";
import { Router } from "@angular/router";

declare var firebase: any;

@Injectable()
export class AuthService {
  constructor(private router: Router) {}

  signupHost(user: UserAuth) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((userInfo) => {
        this.router.navigate(['/profile-host']);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  signupUser(user: UserAuth) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((userInfo) => {
        this.router.navigate(['/profile-user']);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  signinUser(user: UserAuth) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((userInfo) => {
        this.router.navigate(['/home']);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  logout() {
    firebase.auth().signOut();
    this.router.navigate(['/home']);
  }


  isAuthenticated() {
    var user = firebase.auth().currentUser;
    if (user != null) {
      return true;
    } else {
      return false;
    }
  }
}
