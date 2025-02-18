import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { DeviceData } from '../../model/deviceData';

@Component({
  selector: 'app-device-status',
  standalone: false,
  templateUrl: './device-status.component.html',
  styleUrl: './device-status.component.css'
})
export class DeviceStatusComponent {

  @Output() deviceStatusChanged = new EventEmitter();
  @Input() set deviceData(device: DeviceData){
    this.dataOfDevice=device;
    this.imgSrc='../../../assets/images/'+this.dataOfDevice.Picture+'.png';
  }

  dataOfDevice!: DeviceData;
  imgSrc: string='';


  constructor() { }


  statusChangedHandler(e: any){
    this.dataOfDevice = (e.Device as DeviceData);
    this.deviceStatusChanged.emit({ Device: this.dataOfDevice });
  }

}
