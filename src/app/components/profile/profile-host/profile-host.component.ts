import { Component, Input } from '@angular/core';
import { Host } from "../../../models/host.interface";
import { FirebaseService } from "../../../services/firebase.service";
import { ActivatedRoute } from "@angular/router";
import {
	FormGroup,
	FormBuilder,
  	FormControl,
  	FormArray,
	Validators
} from '@angular/forms';
import { Image } from "../../../models/image.interface";
import { Subscription } from "rxjs/Rx";
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile-host',
  templateUrl: './profile-host.component.html',
  styleUrls: ['./profile-host.component.css'],
  providers: [FirebaseService]
})
export class ProfileHostComponent {

  zoom: number = 10;
  animation: boolean = true;
  @Input() host:Host;
  newHost:Host;
  appState: string = "default";
  activeKey: string;
  private subscription: Subscription;
  user = firebase.auth().currentUser;

  constructor(private route: ActivatedRoute, private _firebaseService: FirebaseService,
  	private formBuilder: FormBuilder, private router: Router) {

      this.createHost();
      setTimeout(() => {
        this.router.navigate(['/profile']);
      }, 3000);

	console.log("This.host");
	console.log("------------------------------------------------")
	console.log(this.host);
	console.log("------------------------------------------------")
  }

	createHost() {
	    var user = firebase.auth().currentUser;

	    this.newHost = {
	      uid:user.uid,
        email:user.email,
	      title:'',
	      isActive:false,
	      featuredImage:'',
	      country:'',
	      city:'',
	      state:'',
	      images:[],
	      languages:[],
	      placeDescription:'',
	      benefits:'',
	      expectedFromVolunteers:'',
	      expectedWorkingTime:'',
	      latitude:0,
	      longitude:0,
	      accommodation:'',
	      skillsNeeded:[],
	      createdAt:new Date().toString()
	    }

	    console.log("---------------------------------------");
	    console.log("SignUpAddHost");
	    console.log(this.newHost);
	    console.log("---------------------------------------");

	    this._firebaseService.addHost(this.newHost);
	    console.log(this.newHost);
      this.host = this.newHost;
	  }

}
