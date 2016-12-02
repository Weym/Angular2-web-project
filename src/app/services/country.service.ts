import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class CountryService {
    
    constructor(private http: Http) {}

    getCountries() {
        return this.http.get('../resources/data/countries.json')

                    .toPromise()
                    .then(res => <any[]> res.json().data)
                    .then(data => { 
                    	console.log(data);
                    	return data; 
                    });
    }
}