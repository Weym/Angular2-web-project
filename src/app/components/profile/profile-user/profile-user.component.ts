import { Component, trigger,
    state,
    style,
    animate,
    transition } from '@angular/core';
import { User } from "../../../models/user";
import { FirebaseService } from "../../../services/firebase.service";
import { ActivatedRoute } from "@angular/router";
import {
	FormGroup,
	FormBuilder,
  	FormControl,
  	FormArray,
	Validators
} from '@angular/forms';
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css'],
  providers: [FirebaseService],
    animations: [
        trigger('flyInOut', [
            state('in', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.6s ease-in')
            ]),
            transition('* => void', [
                animate('0.2s 10 ease-out', style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }))
            ])
        ])
    ]
})
export class ProfileUserComponent {
    test:any;
  animation: boolean = true;
  user:User;
  newUser:User;
  complexForm: FormGroup;
  appState: string = "default";
  activeKey: string;
  private subscription: Subscription;
  private isNew = true;
  userAuth = firebase.auth().currentUser;

  constructor(private route: ActivatedRoute, private _firebaseService: FirebaseService,
  	private formBuilder: FormBuilder) {


    this.getProfile();

    if (!this.user) {
    	this.createUser();
    	this.getProfile();
    }
    	this.initForm();

    

	console.log("This.user");
	console.log("------------------------------------------------")
	console.log(this.user);
	console.log("------------------------------------------------")

  }

  private initForm() {
  	this.complexForm = this.formBuilder.group({
  		'firstName': ['', Validators.required],
  		'lastName': ['', Validators.required],
  		'gender': ['', Validators.required],
  		'birthday': ['', Validators.required],
  		'languages': ['', Validators.required],
  		'skills': [''],
  		'about': [''],
  		'country': ['', Validators.required],
  		'city': [''],
  		'email': ['', Validators.required]
  	})
    	this.complexForm.statusChanges.subscribe(
    		(data: any) => console.log(this.complexForm.value)
    		);
  }


  changeState(state, key) {
    console.log('Changing state to ' + state);
    if (key) {
      console.log('Changing key to ' + key)
      this.activeKey = key;
    }
    this.appState = state;
  }

  showEdit(user) {
  	this.user = user;
    this.changeState('edit', user.$key);
  }

  updateUser() {
	var updUser = this.complexForm.value;
	updUser.isActive = true;
    this._firebaseService.updateUser(this.user.$key, updUser);

	this.user.isActive = true;
    this.changeState('default', null);
  }

  getProfile() {
    var userAuth = firebase.auth().currentUser;
    this.user = this._firebaseService.getProfileUser(userAuth.uid);
    console.log(this.user);
  }

createUser() {
    var userAuth = firebase.auth().currentUser;

    this.newUser = {
      uid:userAuth.uid,
      firstName:'',
      lastName:'',
      gender:'',
      birthday:'',
      languages:[],
      skills:[],
      about:'',
      country:'',
      city:'',
      email:'',
      isActive:false,
      createdAt:new Date().toString()
  }

    console.log("---------------------------------------");
    console.log("SignUpAddUser");
    console.log(this.newUser);
    console.log("---------------------------------------");

    this._firebaseService.addUser(this.newUser);
    console.log(this.newUser);
  }


}
