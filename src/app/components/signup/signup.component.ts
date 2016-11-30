import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;
  error = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  onSignup() {
    this.authService.signupUser(this.myForm.value);
  }

  ngOnInit(): any {
    this.myForm = this.fb.group({
      'email': ['', Validators.compose([
        Validators.required,
        this.isEmail
      ])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'confirmPassword': ['', Validators.compose([
        Validators.required,
        this.isEqualPassword.bind(this),
        Validators.minLength(6)
      ])],
    });
  }

  isEmail(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      return {noEmail: true};
    }
  }

  isEqualPassword(control: FormControl): {[s: string]: boolean} {
    if (!this.myForm) {
      return {passwordsNotMatch: true};

    }
    if (control.value !== this.myForm.controls['password'].value) {
      return {passwordsNotMatch: true};
    }
  }

}
