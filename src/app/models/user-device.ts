import { Administrator } from "./administrator";
import { Device } from "./device";
import { UDKey } from "./udkey";
import { User } from "./user";

export class UserDevice {
    udk:UDKey;
    nbr:number;
    user:User;
    device:Device;
    administrator:Administrator;
    cin_admin:number;
    
}
