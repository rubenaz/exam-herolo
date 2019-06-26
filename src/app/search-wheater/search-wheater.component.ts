import { Component, OnInit } from '@angular/core';
import { SearchWheaterService } from './search-wheater.service';
import {Http,Response,HttpModule, RequestOptions, Headers,} from '@angular/http';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http'; 
import {formatDate} from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-wheater',
  templateUrl: './search-wheater.component.html',
  styleUrls: ['./search-wheater.component.css']
})
export class SearchWheaterComponent implements OnInit {
  MAX_DAY=5;
  NUM_OF_DETAILS=5
  key = "976136126d553c05d8890ac35365a99f";
  beginUrl ="https://api.openweathermap.org/data/2.5/forecast?q="
  url:string;
  wheatherList:any[];
  loading;
  place;
  placeNotExist;
  placeEmpty




  constructor(public service : SearchWheaterService,private http: Http) { }
getTheWheater(place)
  {
    this.place="";
    this.place=place;
    let result;
    let count=0;
    this.loading=false;
    this.placeNotExist=false;
    //check if the input is empty
        if(place.length==0){
      this.placeEmpty=true;
      return;
     }
  
    this.url= this.beginUrl + place +"&units=metric&APPID="+this.key;
      this.http.get(this.url).toPromise().then(response => 
    {console.log(response.status)
    result=response.json();
    this.wheatherList=this.service.generate(result.list.length)

    let apiDate=result.list[0].dt_txt.split(" ")[0];
    let date = this.service.getDate(count)
    let i =0;
    while(typeof result.list[i] != 'undefined')
    {
      apiDate=result.list[i].dt_txt.split(" ")[0]
      date = this.service.getDate(count)
      if(apiDate!=date)
        count++;
      this.wheatherList=this.service.getWheaterList(result.list[i],count,i,result["city"].id);
      i++;
    }
    this.loading=true;
    console.log(this.wheatherList);
    }).catch((err: HttpErrorResponse) => {
        // simple logging, but you can do a lot more, see below
        this.placeNotExist=true;
        console.error('An error occurred:', err);
      });;
  }

//======================================================================================

  removeFromFavorite(place)
{
    localStorage.removeItem(place);
}
  //======================================================================================

addTofavorite(place)
{
  let myObj = { id: this.wheatherList[0].id, place: this.place, temp:this.wheatherList[0].temp,main:this.wheatherList[0].main};//this.wheatherList[0] is the current wheater
  localStorage.setItem(this.wheatherList[0].id, JSON.stringify(myObj));
}
  ngOnInit() {
  this.getTheWheater("tel aviv");
  }


  }

