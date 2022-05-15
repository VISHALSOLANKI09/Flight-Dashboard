import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  subject = new BehaviorSubject<any>({});
  setDataObject(obj: any){
    this.subject.next(obj);
  } 
  getDataObject() {
    return this.subject.asObservable();
  }
}
