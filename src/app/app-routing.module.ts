import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceDashComponent } from './components/device-dash/device-dash.component';
import { AddDevicePageComponent } from './components/add-device-page/add-device-page.component';

const routes: Routes = [
  { path: '', component: DeviceDashComponent },
  { path: 'AddDevicePage', component: AddDevicePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
