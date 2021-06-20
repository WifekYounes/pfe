import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { RealtimeComponent } from './admindashboard/realtime/realtime.component';

export class WebSocketAPI {
webSocketEndPoint: string = 'http://localhost:9191/ws';
    //WS:Register a STOMP over WebSocket endpoint at the given mapping path.
    i:Number;
    r:String;
    topic: string = "/topic/greetings";  //Lien destinataire
    stompClient: any;
    rtComponent: RealtimeComponent;
    constructor(){

    }
    _connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                _this.onMessageReceived();
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };
    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }
    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }
    _send() {
        console.log("calling logout api via web socket");
        this.stompClient.send("/topic/hello/"+`${this.i}`+"/"+`${this.r}`, {});
    }
    onMessageReceived() {
        console.log("Message Recieved from Server :: " );

    }
}
