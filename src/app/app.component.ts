import { Component } from '@angular/core';
import { WebSocketAPI } from './WebSocketAPI';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PFE_BWS';

  webSocketAPI: WebSocketAPI;
  greeting: any;
  name: string;
  x:any;
  ngOnInit() {

}

}
