import { Component } from "@angular/core";

import { AuthService } from "../../services/auth.service";
import { UserAuth } from "../../models/userAuth.interface";
import { FirebaseService } from "../../services/firebase.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
    providers: [FirebaseService]
})
export class NavbarComponent {
  user: UserAuth;

  constructor(private _firebaseService: FirebaseService, private authService: AuthService) {
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
  }
}
