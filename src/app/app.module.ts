import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { AudioService } from './services/audio.service';
import { BroadcasterService } from './services/broadcaster.service';


@NgModule({
    declarations: [
        AppComponent,
        ButtonComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [AudioService, BroadcasterService ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
