import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { DeviceData } from '../model/deviceData';
import { IDeviceData } from '../model/IDeviceData';


@Injectable({
  providedIn: 'root'
})
export class DevicesDataService {

  constructor() { }

  getDevices(): Observable<DeviceData[]> {
    return from(fetch('assets/data/devices.json')
    .then(response => response.json() as Promise<IDeviceData[]>))
    .pipe(
      map((data: IDeviceData[]) => data.map((item: IDeviceData) => new DeviceData(
        item.InstallDate,
        item.DeviceOK,
        item.DeviceTypeHebrew,
        item.DeviceId,
        item.DeviceType,
        item.WebSiteDeviceName,
        item.LastReportDate,
        item.Picture
      )))
    );
  }


}
