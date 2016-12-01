import { Routes } from "@angular/router";

import { HostDetailComponent } from "./host-detail/host-detail.component";
import { HostListComponent } from "./host-list/host-list.component";

export const HOST_ROUTES: Routes = [
  { path: '', component: HostListComponent },
  { path: ':id', component: HostDetailComponent }
];
