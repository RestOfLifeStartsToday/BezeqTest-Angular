import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, map } from 'rxjs';
import { DeviceData } from '../model/deviceData';
import { IDeviceData } from '../model/IDeviceData';


@Injectable({
  providedIn: 'root'
})
export class DevicesDataService {

  private dataSubject: BehaviorSubject<DeviceData[]> =
                        new BehaviorSubject<DeviceData[]>([]);
  data$: Observable<DeviceData[]> = this.dataSubject.asObservable();
  private isDataLoaded = false;


  constructor() { }

  loadData(): void {
    if (!this.isDataLoaded) {
      this.getDevices().subscribe(data => {
        this.dataSubject.next(data);
        this.isDataLoaded = true;
      });
    }
  }

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

  getData(): Observable<DeviceData[]> {
    this.loadData();
    return this.data$;
  }

  updateData(updatedData: DeviceData[]): void {
    this.dataSubject.next(updatedData);
  }

}
