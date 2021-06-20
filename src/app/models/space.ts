import { Area } from "./area";
import { Device } from "./device";
import { SubUserSpace } from "./sub-user-space";

export class Space {
    idSpace:number;
    longitude:number;
    latitude:number;
    name:String;
    list_devices_space:Device[];
    area:Area;
    idArea:number;
    list_sub_space:SubUserSpace[];
}

