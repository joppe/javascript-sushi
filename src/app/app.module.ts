import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BroadcasterService } from './services/broadcaster.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ BroadcasterService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
