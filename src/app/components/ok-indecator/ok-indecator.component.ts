import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeviceData } from '../../model/deviceData';

@Component({
  selector: 'app-ok-indecator',
  standalone: false,
  templateUrl: './ok-indecator.component.html',
  styleUrl: './ok-indecator.component.css'
})
export class OkIndecatorComponent {
  @Input() deviceData!: DeviceData;
  @Output() statusChanged=new EventEmitter();

  statusChangedClicked(){
    this.deviceData.DeviceOK=this.deviceData.DeviceOK=='1'?'0':'1';
    this.statusChanged.emit({ Device: this.deviceData });
  }


}
