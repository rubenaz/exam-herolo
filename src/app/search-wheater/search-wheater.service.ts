import { Injectable } from '@angular/core';
import {Http,Response,HttpModule, RequestOptions, Headers,} from '@angular/http';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http'; 
import {formatDate} from '@angular/common';


@Injectable()
export class SearchWheaterService {
  MAX_DAY=5;
  NUM_OF_DETAILS=5
  key = "976136126d553c05d8890ac35365a99f";
  beginUrl ="https://api.openweathermap.org/data/2.5/forecast?q="
  url:string;
  wheatherList:any[];
  loading;
  place;
  placeNotExist;

  constructor(private http: Http) { 
    this.getTheWheater("tel aviv");
  }

   getTheWheater(place)
  {
    this.place=place;
    let result;
    let count=0;
    this.loading=false;
    this.placeNotExist=false;
  
    this.url= this.beginUrl + place +"&units=metric&APPID="+this.key;
      this.http.get(this.url).toPromise().then(response => 
    {console.log(response.status)
    result=response.json();
    this.generate(this.wheatherList,result.list.length)

    let apiDate=result.list[0].dt_txt.split(" ")[0];
    let date = this.getDate(count)
    let i =0;
    while(typeof result.list[i] != 'undefined')
    {
      apiDate=result.list[i].dt_txt.split(" ")[0]
      date = this.getDate(count)
      if(apiDate!=date)
        count++;
      this.getWheaterList(result.list[i],count,i);
      i++;
    }
    this.loading=true;
    }).catch((err: HttpErrorResponse) => {
        // simple logging, but you can do a lot more, see below
        this.placeNotExist=true;
        console.error('An error occurred:', err.error);
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
    localStorage.setItem(place,place);
    console.log(localStorage.length);

}
  
  //======================================================================================
  //===============================HELP FUNCTIONS=========================================
  //======================================================================================
  getWheaterList(result,count,i)
  {
      this.wheatherList[i].id=count;
      this.wheatherList[i].date=result.dt_txt;
      this.wheatherList[i].temp=result["main"].temp;
      this.wheatherList[i].temp_min=result["main"].temp_min;
      this.wheatherList[i].temp_max=result["main"].temp_max;
      this.wheatherList[i].main=result.weather[0].main;
  }
  //======================================================================================
  getDate(count)
  {
        var dte = new Date();
    dte.setDate(dte.getDate() + count);
    return formatDate(dte, 'yyyy-MM-dd', 'en');
  }
  //======================================================================================
  generate(array,rows,)//generate the double array (data)
    {
        this.wheatherList=[];
        for(let j=0 ; j< rows;j++){
            this.wheatherList[j]={id:"",date: "",temp : "", temp_min: "",temp_max:"",main:""};
        }
    }  
}