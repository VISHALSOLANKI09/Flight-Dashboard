import { Injectable } from '@angular/core';
import { Form, FormControl, ValidatorFn, AbstractControl, FormGroup} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class CustomValidator {
    passwordValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any} => {
            if(!control.value) {
                return {};
            }
            const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
            const valid = regex.test(control.value);
            return valid ? {} : { invalidPassword: true };
        };
    }

    misMatchPassword(password: string, confirmPassword: string) {
        return (formGroup: FormGroup) => {
            const passwordControl = formGroup.controls[password];
            const confirmPasswordControl = formGroup.controls[confirmPassword];

            if(!passwordControl || !confirmPasswordControl) return null;
            if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
                return null;
            }

            if(passwordControl.value !== confirmPasswordControl.value) {
                confirmPasswordControl.setErrors({ passwordMisMatch: true });
            } else {
                confirmPasswordControl.setErrors(null);
            }
            return null;
        }
    }

    userNameValidator(userControl: AbstractControl) {
        return new Promise(resolve => {
            setTimeout(() => {
                if(this.validateUserName(userControl.value)) {
                    resolve({ userNameNotAvail: true });
                } else {
                    resolve(null);
                }
            }, 1000);
        });
    }

    validateUserName(userName: string) {
        const usersData = JSON.parse(localStorage.getItem('usersData') || '[]');
        let flag = 0;
        for(let i = 0; i < usersData; i++) {
            if(usersData.userName === userName) {
                flag = 1;
            }
        }
        return flag!=0
    }
}