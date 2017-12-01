import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import ioClient from 'socket.io-client'

@Injectable()
export class BroadcasterService {

  private socket: ioClient;
  private connected = false;
  private plays: Number = 0;
  private latency: Number;
  private id: String;

  private clientsSubject: Subject<String[]> = new Subject();
  public clients: Observable<String[]> = this.clientsSubject.asObservable();

  private playSubject: Subject<Number> = new Subject();
  public play: Observable<Number> = this.playSubject.asObservable();

  private remoteLatencySubject: Subject<Number> = new Subject();
  private remoteLatency: Observable<Number> = this.remoteLatencySubject.asObservable();

  constructor() {
    this.socket = new ioClient('http://raldenhoven.nl:3000');

    this.socket.on('playSound', function(remoteClient) {
      this.plays = this.plays + 1;
      this.playSubject.next(this.plays);
      this.socket.emit('latency', remoteClient, this.latency);
    }.bind(this));

    this.socket.on('connect', function(){
      this.connected = true;
      this.id = this.socket.id;
    }.bind(this));

    this.socket.on('clients', function(data){
      const clients = data.filter(id => id !== this.socket.id);
      this.clientsSubject.next(clients);
    }.bind(this));

    this.socket.on('pong', function(delay){
        this.latency = delay;
    }.bind(this));

    this.socket.on('remoteDelay', function(delay){
        if (this.latency && delay) {
            console.log(this.latency + delay);
            this.remoteLatencySubject.next( this.latency + delay);
        }
    }.bind(this));
  }

  public playSound(clientId): void {
    if (this.connected) {
      this.socket.emit('play', clientId, this.id);
    }
  }
}
