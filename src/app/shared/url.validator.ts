import { FormControl} from '@angular/forms';

export class CustomValidator {
    nameValidator(control: FormControl): { [key: string]: boolean } {
        const nameRegex: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if(control.value && nameRegex.test(control.value)) {
            return  { invalidName: true };
        }
        return { validName: true};
    }

    numberValidator(control: FormControl): { [key: string]: boolean } {
        const numberRegex:  RegExp = /^[0-9]+$/;
        if(control.value && numberRegex.test(control.value)) {
            return { invalidNumber: true };
        }
        return { validNumber: true };
    }
}