import { Component, Input, trigger,
    state,
    style,
    animate,
    transition } from '@angular/core';
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

@Component({
  selector: 'app-profile-host',
  templateUrl: './profile-host.component.html',
  styleUrls: ['./profile-host.component.css'],
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
export class ProfileHostComponent {

  zoom: number = 10;
  animation: boolean = true;
  @Input() host:Host;
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
        'email' : [this.host.email, Validators.required],
	    'country': [this.host.country, Validators.required],
	    'city': [this.host.city, Validators.required],
	    'state': [this.host.state, Validators.required],
    	'featuredImage': [this.host.featuredImage, Validators.required],
    	'placeDescription': [this.host.placeDescription, Validators.compose([Validators.required, Validators.minLength(150)])], 
    	'benefits': [this.host.benefits],
    	'accommodation': [this.host.accommodation, Validators.required],
    	'languages': [this.host.languages],
    	'skillsNeeded': [this.host.skillsNeeded],
    	'latitude': [this.host.latitude],
    	'longitude': [this.host.longitude],
		'expectedFromVolunteers': [this.host.expectedFromVolunteers, Validators.compose([Validators.required, Validators.minLength(150)])],
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
	updHost.latitude = parseFloat(updHost.latitude);
	updHost.longitude = parseFloat(updHost.longitude);
    this._firebaseService.updateHost(this.host.$key, updHost);

	this.host.isActive = true;
    this.changeState('default', null);
  }

  onAddImage(title:string, url: string) {
  	if ((<FormArray>this.complexForm.controls['images']).length > 3) {
  		console.log("Images Limit");
  	} else {
    (<FormArray>this.complexForm.controls['images']).push(
      new FormGroup({
        title: new FormControl(title, Validators.required),
        url: new FormControl(url, Validators.required)
      })
    );
	}
  }

  onRemoveImage(index: number) {
    (<FormArray>this.complexForm.controls['images']).removeAt(index);
  }

	getProfile() {
		var user = firebase.auth().currentUser;
		console.log(user);
		this.host = this._firebaseService.getProfileHost(user.uid);
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
	  }

}
