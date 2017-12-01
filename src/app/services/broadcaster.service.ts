import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import ioClient from 'socket.io-client'

@Injectable()
export class BroadcasterService {

  private socket: ioClient;
  private connected = false;
  private plays: Number = 0;

  private clientsSubject: Subject<String[]> = new Subject();
  public clients: Observable<String[]> = this.clientsSubject.asObservable();

  private playSubject: Subject<Number> = new Subject();
  public play: Observable<Number> = this.playSubject.asObservable();

  constructor() {
    this.socket = new ioClient('http://raldenhoven.nl:3000');

    this.socket.on('playSound', function(value) {
      this.plays = this.plays + 1;
      this.playSubject.next(this.plays);
    }.bind(this));

    this.socket.on('connect', function(){
      this.connected = true;
      console.log('MY ID =', this.socket.id);
    }.bind(this));

    this.socket.on('clients', function(data){
      const clients = data.filter(id => id !== this.socket.id);
      this.clientsSubject.next(clients);
    }.bind(this));

  }

  public playSound(clientId): void {
    if (this.connected) {
      this.socket.emit('play', clientId);
    }
  }
}
