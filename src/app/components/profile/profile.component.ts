import { Component, trigger,
    state,
    style,
    animate,
    transition } from '@angular/core';
import { Host } from "../../models/host.interface";
import { User } from "../../models/user";
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
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
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
  lat = 40.7829;
  lng = -73.968285;
  zoom = 10;

  profile:any;
  animation: boolean = true;
  user:User;
  users:User[];
  host:Host;
  hosts:Host[];
  newHost:Host;
  complexForm: FormGroup;
  appState: string = "default";
  activeKey: string;
  private subscription: Subscription;
  private isNew = true;
  userAuth = firebase.auth().currentUser;
  data: any;

  constructor(private route: ActivatedRoute, private _firebaseService: FirebaseService,
    private formBuilder: FormBuilder, private router: Router) {


    this._firebaseService.getProfile("hosts").subscribe(hosts => {
      this.hosts = hosts;
      this.host = hosts[0];
      if (this.host){
        this.initForm();
      }
    });
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
      'expectedWorkingTime': [this.host.expectedWorkingTime, Validators.required],
      'latitude': [this.host.latitude],
      'longitude': [this.host.longitude],
      'expectedFromVolunteers': [this.host.expectedFromVolunteers, Validators.compose([Validators.required, Validators.minLength(150)])],
       images: imagesDisplay,
       'isActive': [this.host.isActive]

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
  }
  
  updateHost() {
  var updHost = this.complexForm.value;
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

}
