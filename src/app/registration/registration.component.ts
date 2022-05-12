import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidator } from '../shared/url.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  constructor(
    private router: Router,
    @Inject(CustomValidator) private customValidator: any
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registrationForm = new FormGroup({
      'FullName': new FormControl(null, [Validators.required]),
      'UserName': new FormControl(null, [Validators.required]),
      'Email': new FormControl(null, [Validators.required, Validators.email]),
      'Number': new FormControl(null, [Validators.required]),
      'Password': new FormControl(null, [Validators.required]),
      'ConfirmPassword': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
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
          alert("This UserName is Already Taken.");
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
    console.log(this.registrationForm);
  }

}
