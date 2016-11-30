import { Component, OnInit } from '@angular/core';
import { Host } from "../../../models/host.interface";
import { FirebaseService } from "../../../services/firebase.service";
import { ActivatedRoute} from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-host-detail',
  templateUrl: './host-detail.component.html',
  styleUrls: ['./host-detail.component.css'],
  providers: [FirebaseService]
})
export class HostDetailComponent implements OnInit {
  selectedHost: Host;
  private hostIndex: string;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private _firebaseService: FirebaseService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.hostIndex = params['id'];
        this.selectedHost = this._firebaseService.getHost(this.hostIndex);
      }
    );
  }
}
