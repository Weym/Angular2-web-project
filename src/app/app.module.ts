import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { NgModule }      from '@angular/core';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { Ng2PaginationModule } from 'ng2-pagination';
import { DataTableModule } from "angular2-datatable";


import { AuthGuard } from "./services/auth.guard";
import { AuthService } from "./services/auth.service";
import { FirebaseService } from "./services/firebase.service";
import { routing } from "./app.routing";
import { CapitalizeFirstLetterPipe } from './pipes/capitalize-first-letter.pipe';
import { TextMaxLengthPipe } from './pipes/text-max-length.pipe';
import { DataFilterPipe } from './pipes/data-filter.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { AppComponent }   from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HostItemComponent } from './components/host/host-list/host-item.component';
import { HostListComponent } from './components/host/host-list/host-list.component';
import { HostDetailComponent } from './components/host/host-detail/host-detail.component';
import { HostComponent } from './components/host/host.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HostList2Component } from './components/host/host-list2/host-list2.component';
import { ProfileHostComponent } from './components/profile/profile-host/profile-host.component';
import { HostItem2Component } from './components/host/host-list2/host-item2.component';

//Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyDSCLQF8Zdy6FSOPioxODqt-oxoljZZhWY",
  authDomain: "webproject-54412.firebaseapp.com",
  databaseURL: "https://webproject-54412.firebaseio.com",
  storageBucket: "webproject-54412.appspot.com"
};

@NgModule({
    declarations: [
        AppComponent,
        SigninComponent,
        SignupComponent,
        HostItemComponent,
        HostComponent,
        HostListComponent,
        HostDetailComponent,
        HomeComponent,
        NavbarComponent,
        FooterComponent,
        ProfileComponent,
        CapitalizeFirstLetterPipe,
        TextMaxLengthPipe,
        DataFilterPipe,
        HostList2Component,
        HostItem2Component,
        ProfileHostComponent,
        FilterPipe
    ],
    imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      routing,
      ReactiveFormsModule,
      AngularFireModule.initializeApp(firebaseConfig),
      Ng2PaginationModule,
      DataTableModule,
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyD7yambxE9YWzjDNlPm6dmy3Z9lon33Uxc'
      })
    ],
    providers: [
        AuthGuard,
        AuthService,
        FirebaseService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
