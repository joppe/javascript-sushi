import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import ioClient from 'socket.io-client'

@Injectable()
export class BroadcasterService {

  private socket: ioClient;
  private id: String;
  private room: String;

  private connectedSubject: Subject<boolean> = new Subject();
  private connected: Observable<boolean> = this.connectedSubject.asObservable();

  constructor() {
    this.socket = new ioClient('http://raldenhoven.nl:3000');

    this.socket.on('play sound at', function(value) {
      console.log("playing sound....", value);
    });

    this.socket.on('connect', function(){
      this.id = this.socket.id;
      this.connectedSubject.next(true);
      this.playSound(this.id);
    }.bind(this));

    this.socket.on('clients', function(data){
      console.log(data);
    });

  }

  public playSound(clientId): void {
    this.socket.emit('play sound at', clientId);
  }
}
