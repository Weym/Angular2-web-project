import { Component, OnInit, ElementRef } from '@angular/core';
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

    public query = '';
    public filteredList = [];
    public elementRef;
    public data;
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";

  constructor(private _firebaseService: FirebaseService, myElement: ElementRef) {
        this.elementRef = myElement;
      }

  ngOnInit() {
    this._firebaseService.getActiveHosts().subscribe(hosts => {
      this.data = hosts;
    });

    console.log(this.data);
  }

  filter() {
      if (this.query !== ""){
          this.filteredList = this.countries.filter(function(el){
      if(this.filteredList.length > 7) {
        console.log(this.filteredList);
        this.filteredList = this.filteredList.slice(0, 7);
      }
              return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          }.bind(this));
      }else{
          this.filteredList = [];
      }
      console.log(this.filteredList);
  }
   
  select(item){
      this.query = item;
      this.filteredList = [];
  }


  handleClick(event){
     var clickedComponent = event.target;
     var inside = false;
     do {
         if (clickedComponent === this.elementRef.nativeElement) {
             inside = true;
         }
        clickedComponent = clickedComponent.parentNode;
     } while (clickedComponent);
      if(!inside){
          this.filteredList = [];
      }
  }


  public countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola",
"Anguilla","Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria",
"Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
"Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil",
"British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia",
"Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China",
"Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo",
"Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)",
"Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor",
"Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia",
"Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan",
"French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia",
"Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala",
"Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)",
"Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq",
"Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
"Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan",
"Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya",
"Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of",
"Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique",
"Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of",
"Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
"Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria",
"Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama",
"Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico",
"Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
"Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
"Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia",
"Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands",
"Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname",
"Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic",
"Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand",
"Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
"Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
"United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu",
"Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands",
"Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"];
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
