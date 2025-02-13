import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceDashComponent } from './components/device-dash/device-dash.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from '@angular/material/card';
import { DeviceStatusComponent } from './components/device-status/device-status.component';
import { OkIndecatorComponent } from './components/ok-indecator/ok-indecator.component';


@NgModule({
  declarations: [
    AppComponent,
    DeviceDashComponent,
    DeviceStatusComponent,
    OkIndecatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
