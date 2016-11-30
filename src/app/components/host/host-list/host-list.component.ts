import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../../services/firebase.service";
import { Host } from "../../../models/host.interface";

@Component({
  selector: 'app-host-list',
  templateUrl: './host-list.component.html',
  styleUrls: ['./host-list.component.css'],
  providers: [FirebaseService]
})
export class HostListComponent implements OnInit {
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

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

}
