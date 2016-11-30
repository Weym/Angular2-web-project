import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../../services/firebase.service";
import { Host } from "../../../models/host.interface";

@Component({
  selector: 'app-host-list2',
  templateUrl: './host-list2.component.html',
  styleUrls: ['./host-list2.component.css'],
  providers: [FirebaseService]
})

export class HostList2Component implements OnInit {
  hosts: Host[];
  host: Host;
  test: Host[] = [];

    public data;
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";

  constructor(private _firebaseService: FirebaseService) { }

  ngOnInit() {
    this._firebaseService.getHosts().subscribe(hosts => {

      this.hosts = hosts;
    });
     this.filterData();
  }

  filterData() {
    for (let host of this.hosts) {
      if (host.isActive) {
        this.test.push(host);
      }
      this.data = this.test;
    }
  }

    public toInt(num: string) {
        return +num;
    }

}
