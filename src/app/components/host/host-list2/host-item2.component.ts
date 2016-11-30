import {Component, OnInit, Input} from '@angular/core';
import { Host } from "../../../models/host.interface";

@Component({
  selector: 'app-host-item2',
  templateUrl: './host-item2.component.html',
  styleUrls: ['./host-item2.component.css']
})
export class HostItem2Component{
  @Input() host: Host;
  @Input() hostId: string;

}
