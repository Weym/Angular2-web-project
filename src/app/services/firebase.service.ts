import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import { Host } from "../models/host.interface";

@Injectable()
export class FirebaseService {
  hosts: FirebaseListObservable<Host[]>;
  host: Host;
  profile:any;
  uid;

  constructor(private _af: AngularFire) {}

    getHosts() {
      this.hosts = this._af.database.list('/hosts') as FirebaseListObservable<Host[]>
      console.log("gethosts");
      return this.hosts;
    }

    getActiveHosts(){
            this.hosts = this._af.database.list('/hosts', {
                query: {
                    orderByChild: 'isActive',
                    equalTo: true
                }
            }) as 
            FirebaseListObservable<Host[]>
        console.log(this.hosts);
        return this.hosts;
    }

    getUid() {
      var uid;
      var auth = this._af.auth.subscribe( (user) => {
      uid = user.uid;
      this.uid = user.uid;
      });

    }

    getProfile(value:any) {
      this.getUid();
      this.profile = this._af.database.list('/'+value, {
          query: {
              orderByChild: 'uid',
              equalTo: this.uid
          }
      }) as 
        FirebaseListObservable<Host[]>
    console.log(this.profile);
    return this.profile;

    }



  getProfileHost(uid:string) {
    this.getHosts().subscribe(hosts =>{
      for (let host  of hosts) {
        if (uid == host .uid) {
          this.host = host;
        }
      }
    });
    return this.host;
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

  addHost(newHost) {
    console.log("--------------------------------");  
    console.log(newHost);
    console.log(newHost);
    this.getHosts();
    return this.hosts.push(newHost);
  }

  updateHost(key, updHost) {
    console.log("--------------------------------");
    console.log(key);
    console.log(updHost);
    console.log(this.hosts);
    return this.hosts.update(key, updHost);
  }

  updateUser(key, updUser) {
    return this.hosts.update(key, updUser);
  }
}
