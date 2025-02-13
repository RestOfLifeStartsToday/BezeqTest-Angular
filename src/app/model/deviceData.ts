import { IDeviceData } from "./IDeviceData";

export class DeviceData implements IDeviceData {
  InstallDate: string;
  DeviceOK: string;
  DeviceTypeHebrew: string;
  DeviceId: string;
  DeviceType: string;
  WebSiteDeviceName: string;
  LastReportDate: string;
  Picture: string;

  static initObject(){
    return new DeviceData('', '', '', '', '', '', '', '');
  }

  constructor(
    installDate: string,
    deviceOK: string,
    deviceTypeHebrew: string,
    deviceId: string,
    deviceType: string,
    webSiteDeviceName: string,
    lastReportDate: string,
    picture: string
  ) {
    this.InstallDate = installDate;
    this.DeviceOK = deviceOK;
    this.DeviceTypeHebrew = deviceTypeHebrew;
    this.DeviceId = deviceId;
    this.DeviceType = deviceType;
    this.WebSiteDeviceName = webSiteDeviceName;
    this.LastReportDate = lastReportDate;
    this.Picture = picture;
  }
}
