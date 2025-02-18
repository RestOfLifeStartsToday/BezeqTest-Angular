import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DeviceData } from '../../model/deviceData';
import { DevicesDataService } from '../../core/devices-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-device-page',
  standalone: false,
  templateUrl: './add-device-page.component.html',
  styleUrl: './add-device-page.component.css'
})
export class AddDevicePageComponent implements OnInit {
  deviceForm: FormGroup;
  devicesData: DeviceData[] =  [];
  deviceNames: string[] = [];

  constructor(private devicesDataService: DevicesDataService,
              private router: Router,
              private fb: FormBuilder) {
    this.deviceForm = this.fb.group({
      installDate: [''],
      deviceOK: [false],
      deviceTypeHebrew: [''],
      deviceId: [''],
      deviceType: [''],
      webSiteDeviceName: [''],
      lastReportDate: [''],
      picture: ['']
    });
  }
  ngOnInit(): void {
    this.devicesDataService.getData().subscribe(data => {
      this.devicesData = data;

      this.getAllDeviceNames();
    });
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

  onSubmit(): void {
    if (this.deviceForm.valid) {
      console.log(this.deviceForm.value);
      let webSiteName=this.getField('webSiteDeviceName');
      let tmpDevice: DeviceData =
          this.devicesData.filter(
              x=>x.WebSiteDeviceName == webSiteName)[0];


      let newDevice: DeviceData=
          new DeviceData(
              this.getFormattedInstallDate(),
              this.getField('deviceOK')?'1':'0',
              tmpDevice.DeviceTypeHebrew,
              this.getField('deviceId'),
              tmpDevice.DeviceType,
              this.getField('webSiteDeviceName'),
              this.getFormattedDate((new Date()).toISOString()),
              tmpDevice.Picture
            );

      this.devicesData.push(newDevice);
      this.devicesDataService.updateData(this.devicesData);

      this.router.navigate(['/']);
    } else {
      console.error('Form is invalid');
    }

  }

  getField(fieldName: string) {
    return (this.deviceForm.get(fieldName)!).value;
  }

  getFormattedInstallDate(): string {
    const installDateControl = this.deviceForm.get('installDate');
    return this.getFormattedDate(installDateControl!.value);
  }

  getFormattedDate(dateToFormat: string) {
    const date = new Date(dateToFormat);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
}
