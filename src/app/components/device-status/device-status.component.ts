import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { DeviceData } from '../../model/deviceData';

@Component({
  selector: 'app-device-status',
  standalone: false,
  templateUrl: './device-status.component.html',
  styleUrl: './device-status.component.css'
})
export class DeviceStatusComponent {

  dataOfDevice!: DeviceData;
  imgSrc: string='';

  constructor() { }

  @Input() set deviceData(device: DeviceData){
    this.dataOfDevice=device;
    this.imgSrc='../../../assets/images/'+this.dataOfDevice.Picture+'.png';
  }

}
