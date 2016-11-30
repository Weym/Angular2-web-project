import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Host } from "../../../models/host.interface";
import { FirebaseService } from "../../../services/firebase.service";
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
 
@Component({
  selector: 'app-host-edit',
  templateUrl: './host-edit.component.html',
  styleUrls: ['./host-edit.component.css'],
  providers: [FirebaseService]
})
export class HostEditComponent implements OnInit {
  hostForm: FormGroup;
  private hostIndex:string;
  private host: Host;
  private isNew = true;
  private subscription: Subscription;

  constructor(
    private _firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if(params.hasOwnProperty('id')) {
          this.isNew = false;
          this.hostIndex = params['id'];
          this.host = this._firebaseService.getHost(this.hostIndex);
        } else {
          this.isNew = true;
          this.host = null;
        }
        this.initForm();
      }
    );
  }
  onCancel() {
    this.navigateBack();
  }

  onAddImage(imageUrl: string) {
    (<FormArray>this.hostForm.controls['images']).push(
      new FormGroup({
        imagePath: new FormControl(imageUrl, Validators.required)
      })
    );
  }

  onRemoveImage(index: number) {
    (<FormArray>this.hostForm.controls['images']).removeAt(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private navigateBack() {
    this.router.navigate(['../']);
  }

  private initForm() {
    let hostTitle = '';
    let hostLanguage = '';
    let hostImageUrl = '';
    let hostImages: FormArray = new FormArray([]);

    if (!this.isNew) {
      hostTitle = this.host.title;
    }

      this.hostForm = this.formBuilder.group({
        title: [hostTitle, Validators.required],
        language: [hostLanguage, Validators.required],
        imagePath: [hostImageUrl, Validators.required],
        images: hostImages
      });

  }

}
