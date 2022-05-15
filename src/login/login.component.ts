import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidator } from '../shared/url.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.loginForm = new FormGroup({
      'UserName': new FormControl(null, Validators.required),
      'Password': new FormControl(null, Validators.required)
    });
  }

  onSubmit(){
    let currData = this.loginForm.value;

    let data = JSON.parse(localStorage.getItem('usersData') || '[]');
    if(data) {
      var flag = 0;
      for(let i = 0; i < data.length; i++) {
        if(currData.UserName === data[i].UserName && currData.Password === data[i].Password) {
          flag = 1;
          this.router.navigate(['/dashboard']);
          break;
        }
      }
      if(flag==0) {
        alert("Create An Account!");
        this.router.navigate(['/register']);
      }
    }
  }
}
