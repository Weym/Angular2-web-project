import { Component, trigger,
    state,
    style,
    animate,
    transition } from '@angular/core';
import { Host } from "../../models/host.interface";
import { FirebaseService } from "../../services/firebase.service";
import { ActivatedRoute } from "@angular/router";
import {
	FormGroup,
	FormBuilder,
  	FormControl,
  	FormArray,
	Validators
} from '@angular/forms';
import { Image } from "../../models/image.interface";
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
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
export class ProfileComponent {
  animation: boolean = true;
  host:Host;
  newHost:Host;
  complexForm: FormGroup;
  appState: string = "default";
  activeKey: string;
  activeTitle;
  activeFeaturedImage;
  activeCountry;
  activeCity;
  activeState;
  activeImages:Image[];
  private subscription: Subscription;
  private isNew = true;
  user = firebase.auth().currentUser;

  constructor(private route: ActivatedRoute, private _firebaseService: FirebaseService,
  	private formBuilder: FormBuilder) {


    this.getProfile();

    if (!this.host) {
    	this.createHost();
    	this.getProfile();
    }
    	this.initForm();

    

	console.log("This.host");
	console.log("------------------------------------------------")
	console.log(this.host);
	console.log("------------------------------------------------")

  }

  private initForm() {
    let imagesDisplay: FormArray = new FormArray([]);

      if (this.host.hasOwnProperty('images')) {
        for (let i = 0; i < this.host.images.length; i++) {
          imagesDisplay.push(
            new FormGroup({
              title: new FormControl(this.host.images[i].title, Validators.required),
              url: new FormControl(this.host.images[i].url, Validators.required)
            })
          );
        }
      }

  	this.complexForm = this.formBuilder.group({
      'title' : [this.host.title, Validators.required],
		  'country': ['', Validators.required],
		  'city': ['', Validators.required],
		  'state': ['', Validators.required],
    	'featuredImage': ['', Validators.required],
    	'placeDescription': ['', Validators.compose([Validators.required, Validators.minLength(150)])], 
    	'benefits': [''],
    	'accommodation': ['', Validators.required],
    	'languages': [''],
    	'skillsNeeded': [''],
		'expectedFromVolunteers': ['', Validators.compose([Validators.required, Validators.minLength(150)])],
        meats: this.formBuilder.group({
          meatHam: this.formBuilder.control(null),
          meatTurkey: this.formBuilder.control(null),
          meatRoastBeef: this.formBuilder.control(null)
        }),
      	images: imagesDisplay

  	})
	    console.log(this.complexForm);
	    this.complexForm.valueChanges.subscribe( (form: any) => {
	      console.log('form changed to:', form);
	    }
	    );
    	
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

  showEdit(host) {
  	this.host = host;
    this.changeState('edit', host.$key);
    this.activeTitle =   	host.title;
    this.activeFeaturedImage =	host.featuredImage;
    this.activeCountry =    	host.country;
    this.activeCity =       	host.city;
    this.activeState =      	host.state;
    this.activeImages =      	host.images;
  }

  updateHost() {
	var updHost = this.complexForm.value;
	updHost.isActive = true;
    this._firebaseService.updateHost(this.host.$key, updHost);

	this.host.isActive = true;
    this.changeState('default', null);
  }

  onAddImage(title:string, url: string) {
    (<FormArray>this.complexForm.controls['images']).push(
      new FormGroup({
        title: new FormControl(title, Validators.required),
        url: new FormControl(url, Validators.required)
      })
    );
  }

  onRemoveImage(index: number) {
    (<FormArray>this.complexForm.controls['images']).removeAt(index);
  }

  getProfile() {
    var user = firebase.auth().currentUser;
    this.host = this._firebaseService.getOwner(user.uid);
  }

createHost() {
    var user = firebase.auth().currentUser;

    this.newHost = {
      uid:user.uid,
      title:'',
      isActive:false,
      featuredImage:'',
      country:'',
      city:'',
      state:'',
      images:[],
      languages:[],
      placeDescription:'',
      email:'',
      benefits:'',
      expectedFromVolunteers:'',
      expectedWorkingTime:'',
      latitude:null,
      longitude:null,
      accomodation:'',
      skillsNeeded:[],
      createdAt:new Date().toString()
    }

    console.log("---------------------------------------");
    console.log("SignUpAddHost");
    console.log(this.newHost);
    console.log("---------------------------------------");

    this._firebaseService.addHost(this.newHost);
    console.log(this.newHost);
  }


}