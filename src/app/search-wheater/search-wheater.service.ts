import { Injectable } from '@angular/core';
import {Http,Response,HttpModule, RequestOptions, Headers,} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http'; 

@Injectable()
export class SearchWheaterService {
  MAX_DAY=5;
  key = "976136126d553c05d8890ac35365a99f";
  beginUrl ="https://api.openweathermap.org/data/2.5/forecast?q="
  url:string;
  wheatherList:String[][];

  constructor(private http: Http) { 
  }


   getTheWheater(place)
  {
    let result;
  
    this.url= this.beginUrl + place +"&APPID="+this.key;
      this.http.get(this.url).toPromise().then(response => 
    {console.log(response)
    result=response.json();
    for(let i =0;i<this.MAX_DAY;i++)
      {
          getWheaterList(result)
      }
    });

  }

  
}