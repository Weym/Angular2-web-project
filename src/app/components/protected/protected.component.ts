import { Component } from "@angular/core";
import { UserAuth } from "../../models/userAuth.interface";
import { AuthService } from "../../services/auth.service";


declare var firebase: any;

@Component({
    template: `
        <div class="normalizenavbar"></div>
        <h1>Protected - you shouldn't be here if not signed in</h1>
        <button class="btn btn-danger" (click)="isOwner()">Click Here</button>
    `
})
export class ProtectedComponent {
  user: UserAuth;


  constructor(private authService: AuthService) {}

  isOwner() {
    var user = firebase.auth().currentUser;

    if(user.uid == "bI8zvfhsPWOhvovHq7JzmzKeZku1") {
      console.log("User can edit info");
    } else {
      console.log("User " + user.uid + " can not edit info");
    }
  }


}
