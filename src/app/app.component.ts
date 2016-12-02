import { Component } from "@angular/core";
import { FirebaseService } from "./services/firebase.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
	constructor(private _firebaseService: FirebaseService){
		this._firebaseService.getHosts();
	}
}
