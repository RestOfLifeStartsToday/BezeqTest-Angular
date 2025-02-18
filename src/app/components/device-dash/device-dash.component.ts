import { Component, OnInit } from '@angular/core';
import { DevicesDataService } from '../../core/devices-data.service';
import { DeviceData } from '../../model/deviceData';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-device-dash',
  standalone: false,
  templateUrl: './device-dash.component.html',
  styleUrl: './device-dash.component.css'
})
export class DeviceDashComponent implements OnInit {

  devicesData: DeviceData[] =  [];
  filteredDevicesData: DeviceData[] =  [];
  deviceNames: string[] = [];
  filterByDevice: string='';
  fromDate!: Date;
  toDate!: Date;


  titleNumTotal: string='סך כל ההתקנים';
  titleNumGood: string='תקינים';
  titleNumBad: string='לא תקינים';

  numTotal: number = 0;
  numGood: number = 0;
  numBad: number = 0;

  constructor(private devicesDataService: DevicesDataService,
              private router: Router,
              private fb: FormBuilder) {

  }

  ngOnInit(): void {

    this.devicesDataService.getData().subscribe(data => {
      this.devicesData = data;

      this.displayDevicesSummary();
      this.getAllDeviceNames();
      this.clearDeviceFilter();
    });
  }

  clearDeviceFilter() {
   this.filteredDevicesData=this.devicesData;
  }

  getAllDeviceNames() {
    this.devicesData.sort((a, b) =>
      a.WebSiteDeviceName.localeCompare(b.WebSiteDeviceName)
    );

    let tmpName: string='';
    this.devicesData.forEach(x=>{
      if(tmpName!=x.WebSiteDeviceName){
        tmpName=x.WebSiteDeviceName;
        this.deviceNames.push(tmpName);
      }
    });
  }

  displayDevicesSummary(){
    this.numGood=this.numBad=this.numTotal=0;

    this.devicesData.forEach(x=>{
      if(x.DeviceOK=='1'){
        this.numGood++;
      }
      else{
        this.numBad++;
      }
      this.numTotal++;
    });
  }

  deviceStatusChangedHandler(e: any){
    let changedDevice: DeviceData=e.Device as DeviceData;
    let deviceToUpdate: DeviceData =
        this.devicesData.filter(
                x => x.DeviceId == changedDevice.DeviceId)[0];
    deviceToUpdate.DeviceOK=changedDevice.DeviceOK;
    deviceToUpdate.LastReportDate=this.getCurrentDateTime();

    this.displayDevicesSummary();
  }

  addDevice(){
    this.router.navigate(['/AddDevicePage']);
  }

  selectionHandler(selectedDevice: any) {

    this.filterByDevice=selectedDevice.value;
    this.filterDevicesByDeviceName();
  }

  filterDevicesByDeviceName() {
    if(this.filterByDevice===undefined ||
            this.filterByDevice==''){
      this.filteredDevicesData=this.devicesData;
    }
    else {
      this.filteredDevicesData=
          this.devicesData.filter(
              x=>x.WebSiteDeviceName == this.filterByDevice);
    }
  }

  onDateFromChange(dateEvent: MatDatepickerInputEvent<Date>) {
    const newDate = dateEvent.value;
    if(newDate!=undefined){
      this.fromDate=new Date(newDate.toString());
    }
    this.filterDevicesByDates();
  }

  onDateToChange(dateEvent: MatDatepickerInputEvent<Date>) {
    const newDate = dateEvent.value;
    if(newDate!=undefined){
      this.toDate=new Date(newDate.toString());
    }
    this.filterDevicesByDates();
  }

  filterDevicesByDates() {
    this.clearDeviceFilter();
    this.filterDevicesByDeviceName();

    this.filteredDevicesData =
      this.filteredDevicesData.filter(x => {
        const deviceDate=new Date(x.LastReportDate);
        debugger
        let isOk: boolean=true;
        if(this.fromDate != null){
          isOk=this.fromDate<deviceDate;
        }
        if(this.toDate != null){
          isOk=this.toDate>deviceDate;
        }
        return isOk;
      });
  }

  getCurrentDateTime(): string {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
