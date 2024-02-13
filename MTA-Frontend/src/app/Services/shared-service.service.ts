import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class SharedService {
  private userSource = new BehaviorSubject(null);
  currentUser = this.userSource.asObservable();

  constructor() { }

  changeUser(user: any,text:string) {
    this.userSource.next(user);
    localStorage.setItem('userProfile', JSON.stringify(user));
    localStorage.setItem('action',text);
  }
}
