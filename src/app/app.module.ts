import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ButtonComponent} from './button/button.component';
import { PlayerComponent } from './player/player.component';
import { AudioService } from './audio.service';
import { BroadcasterService } from './services/broadcaster.service';


@NgModule({
    declarations: [
        AppComponent,
        ButtonComponent,
        PlayerComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [AudioService, BroadcasterService ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
