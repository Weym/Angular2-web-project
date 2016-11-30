import { RouterModule, Routes } from "@angular/router";

import { SignupComponent } from "./components/signup/signup.component";
import { SigninComponent } from "./components/signin/signin.component";
import { ProtectedComponent } from "./components/protected/protected.component";
import { AuthGuard } from "./services/auth.guard";
import { HOST_ROUTES } from "./components/host/host.routing";
import { HostComponent } from "./components/host/host.component";
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HostList2Component } from './components/host//host-list2/host-list2.component';
 
const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'host', component: HostList2Component },
    {path: 'hosts', component: HostComponent, children: HOST_ROUTES },
    {path: 'signup', component: SignupComponent, canActivate: [!AuthGuard] },
    {path: 'signin', component: SigninComponent, canActivate: [!AuthGuard] },
    {path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
