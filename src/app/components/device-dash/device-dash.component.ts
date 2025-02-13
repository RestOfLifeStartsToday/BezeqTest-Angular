import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { DevicesDataService } from '../../core/devices-data.service';
import { DeviceData } from '../../model/deviceData';


@Component({
  selector: 'app-device-dash',
  standalone: false,
  templateUrl: './device-dash.component.html',
  styleUrl: './device-dash.component.css'
})
export class DeviceDashComponent implements OnInit {

  devicesData: DeviceData[] =  [];

  titleNumTotal: string='מספר מכשירים';
  titleNumGood: string='מספר תקינים';
  titleNumBad: string='מספר לא תקינים';

  numTotal: number = 0;
  numGood: number = 0;
  numBad: number = 0;

  constructor(private devicesDataService: DevicesDataService) { }

  ngOnInit(): void {



    this.devicesDataService.getDevices().subscribe(data => {
      this.devicesData = data;

      this.devicesData.forEach(x=>{
        if(x.DeviceOK=='1'){
          this.numGood++;
        }
        else{
          this.numBad++;
        }
        this.numTotal++;
      });
    });

  }

}
