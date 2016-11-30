import { Component, OnInit, Input } from '@angular/core';
import { Host } from "../../../models/host.interface";

@Component({
  selector: 'app-host-item',
  templateUrl: './host-item.component.html',
  styleUrls: ['./host-item.component.css']
})
export class HostItemComponent{
  @Input() host: Host;
  @Input() hostId: string;

}