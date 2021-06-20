import { Device } from "./device";
import { HistoryCo2 } from "./history-co2";

export class RtCo2 {

    date:Date;
    reference:string;
    valueCo2:number;
    list_history:HistoryCo2[];
    device:Device;

}
