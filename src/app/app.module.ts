import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { NgModule }      from '@angular/core';

import { AppComponent }   from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProtectedComponent } from "./components/protected/protected.component";
import { AuthGuard } from "./services/auth.guard";
import { AuthService } from "./services/auth.service";
import { routing } from "./app.routing";
import { HostItemComponent } from './components/host/host-list/host-item.component';
import { HostEditComponent } from './components/host/host-edit/host-edit.component';
import { HostStartComponent } from './components/host/host-start.component';
import { HostListComponent } from './components/host/host-list/host-list.component';
import { HostDetailComponent } from './components/host/host-detail/host-detail.component';
import { HostComponent } from './components/host/host.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { FooterComponent } from './components/footer/footer.component';
import { Ng2PaginationModule } from 'ng2-pagination';
import { ProfileComponent } from './components/profile/profile.component';
import { CapitalizeFirstLetterPipe } from './pipes/capitalize-first-letter.pipe';
import { TextMaxLengthPipe } from './pipes/text-max-length.pipe';
import { DataFilterPipe } from './pipes/data-filter.pipe';
import { DataTableModule } from "angular2-datatable";
import { HostList2Component } from './components/host/host-list2/host-list2.component';
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
        ProtectedComponent,
        HostItemComponent,
        HostEditComponent,
        HostStartComponent,
        HostComponent,
        HostListComponent,
        HostDetailComponent,
        HomeComponent,
        NavbarComponent,
        SearchComponent,
        FooterComponent,
        ProfileComponent,
        CapitalizeFirstLetterPipe,
        TextMaxLengthPipe,
        DataFilterPipe,
        HostList2Component,
        HostItem2Component
    ],
    imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      routing,
      ReactiveFormsModule,
      AngularFireModule.initializeApp(firebaseConfig),
      Ng2PaginationModule,
      DataTableModule
    ],
    providers: [
        AuthGuard,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
