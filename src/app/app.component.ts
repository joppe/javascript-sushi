import { Component, OnInit } from '@angular/core';
import { BroadcasterService } from './services/broadcaster.service';
import { AudioService } from './services/audio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  private beep : HTMLAudioElement;

  public clients: String[] = [];

  constructor(
    private broadcaster: BroadcasterService,
    private audioService: AudioService
  ) {}

  ngOnInit() {
      this.audioService.load('/assets/audio/beep-09.mp3').subscribe(beep => this.beep = beep);

      this.broadcaster.clients.subscribe(clients => this.clients = clients);
      this.broadcaster.play.subscribe(play => {
          if (this.beep) {
              this.beep.play();
          }
      });
  }

  private playSound(clientId: string) {
      this.broadcaster.playSound(clientId);
  }
}
