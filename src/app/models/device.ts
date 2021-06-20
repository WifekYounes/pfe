import { ConstraintCo2 } from "./constraint-co2";
import { RtCo2 } from "./rt-co2";
import { Space } from "./space";
import { UserDevice } from "./user-device";

export class Device {

    reference:string;
    name:string;


    list_user_devices:UserDevice[];
    space:Space;
    idSpace:number;
    constraint_co2:ConstraintCo2;
    idConstraint:number;
    list_rt_co2:RtCo2[];

}
