import { Injectable } from '@angular/core';
import {Http,Response,HttpModule, RequestOptions, Headers,} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http'; 

@Injectable()
export class SearchWheaterService {
  key = "976136126d553c05d8890ac35365a99f";
  beginUrl ="api.openweathermap.org/data/2.5/weather?q="
  url:string;
  constructor(private http: Http) { 
  }


   getTheWheater(place)
  {
    this.url= this.beginUrl + place +"&APPID="+this.key;
    console.log(this.url);
    this.http.get(this.url)
      .subscribe(data => {
        console.log(data);
      });
   /*  this.http.get(this.url).toPromise().then(response => 
    {console.log(response)
    });*/
  }


}