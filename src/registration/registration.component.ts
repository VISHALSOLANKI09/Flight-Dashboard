import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidator } from '../shared/url.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  submitted = false;
  userNameAlreadyTaken = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private customValidator: CustomValidator
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registrationForm = this.fb.group({
      'FullName': ['', [Validators.required]],
      'UserName': ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
      'Email': ['', [Validators.required, Validators.email]],
      'Number': ['', [Validators.required]],
      'Password': ['', Validators.compose([Validators.required, this.customValidator.passwordValidator()])],
      'ConfirmPassword': ['', [Validators.required]]
    }, {
      validator: this.customValidator.misMatchPassword('Password', 'ConfirmPassword')
    });
  }

  get registrationFormControl() {
    console.log(this.registrationForm.controls);
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if(this.registrationForm.valid) {
      console.log("Registered");

      var currData = this.registrationForm.value; // value is an object

      if(currData.Password !== currData.ConfirmPassword) {
        alert("Please Enter Same Passwords.");
      }

      var flag = 0;

      let data = JSON.parse(localStorage.getItem('usersData') || '[]');
      //console.log(data); // value is an array
      
      for(var i = 0; i < data.length; i++) {
        if(currData.UserName === data[i].UserName) {
          flag = 1;
          this.userNameAlreadyTaken = true;
          break;
        }
      }

      if(flag === 0) {
        data = [...data, this.registrationForm.value];
        localStorage.setItem('usersData', JSON.stringify(data));
        this.router.navigate(['/login']);
        alert('Log in with your credentials to go to dashboard.');
      }
    }
    // console.log(this.registrationForm.controls['FullName']?.touched);
    // console.log(this.registrationForm.controls['Password'].errors);
  }
}
