import { Administrator } from "./administrator";
import { ClientArea } from "./client-area";
import { SubUser } from "./sub-user";
import { UserDevice } from "./user-device";

export class User {
    cinu:number;
    subuser:SubUser;
    list_userdevices:UserDevice[];
    administrator:Administrator;
    cin_admin:number;
    list_client_areas:ClientArea[];
    list_sub_users:SubUser[];

}
