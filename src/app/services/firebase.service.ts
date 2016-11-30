import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import { Host } from "../models/host.interface";

@Injectable()
export class FirebaseService {
  hosts: FirebaseListObservable<Host[]>;
  host: Host;

  constructor(private _af: AngularFire) {}

  getHosts() {
    this.hosts = this._af.database.list('/hosts') as FirebaseListObservable<Host[]>
    return this.hosts;
  }

  getHost(key:string) {
    this.getHosts().subscribe(hosts=>{
        hosts.forEach(host => {
          if (key == host.$key){
          this.host = host;
          }
        });
    })
    return this.host;
  }

  getOwner(uid:string) {
    this.getHosts().subscribe(hosts =>{
      for (let host of hosts) {
        if (uid == host.uid) {
          this.host = host;
        }
      }
    });
    return this.host;

  }

  addHost(newHost) {
    return this.hosts.push(newHost);
  }

  updateHost(key, updHost) {
    return this.hosts.update(key, updHost);
  }
}
