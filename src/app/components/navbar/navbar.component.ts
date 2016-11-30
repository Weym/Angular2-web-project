import { Component, OnInit } from "@angular/core";

import { AuthService } from "../../services/auth.service";
import { User } from "../../models/user.interface";
import { Host } from "../../models/host.interface";
import { AngularFire } from "angularfire2";
import { FirebaseService } from "../../services/firebase.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
    providers: [FirebaseService]
})
export class NavbarComponent implements OnInit {
  user: User;
  hosts: Host[];

  constructor(private _firebaseService: FirebaseService, private authService: AuthService, private _af: AngularFire) {
  }
  ngOnInit() {
    this._firebaseService.getHosts().subscribe(hosts => {
      this.hosts = hosts;
    });
  }

  isAuth() {
    var user = firebase.auth().currentUser;
    if (user != null) {
      return true;
    } else {
      return false;
    }

    //After fix, deal with the above code:
    //return this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
  }
}
