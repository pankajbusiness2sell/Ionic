import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  private afterLoginAnnounce = new Subject();
  afterLoginAnnounce$ = this.afterLoginAnnounce.asObservable();

  afterLogin(){
    this.afterLoginAnnounce.next();
  }

}