import { Component, OnInit } from '@angular/core';
import { Host } from "../../models/host.interface";

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {
  selectedHost: Host;

  constructor() { }

  ngOnInit() {
  }

}
