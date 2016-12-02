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

    public data;
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";

  constructor(private _firebaseService: FirebaseService) { }


  ngOnInit() {
    this._firebaseService.getActiveHosts().subscribe(hosts => {
      this.data = hosts;
    });

    console.log(this.data);
  }

    public toInt(num: string) {
        return +num;
    }

}
