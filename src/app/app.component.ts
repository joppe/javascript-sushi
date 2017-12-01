import { Component } from '@angular/core';
import { BroadcasterService } from './services/broadcaster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private broadcaster: BroadcasterService
  ) {

  }
}
