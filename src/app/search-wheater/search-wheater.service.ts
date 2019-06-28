import { Injectable } from '@angular/core';
import {formatDate} from '@angular/common';
import {Http,Response,HttpModule, RequestOptions, Headers,} from '@angular/http';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';




@Injectable()
export class SearchWheaterService {
  private rows=0;
  private DEFAULT_PLACE="tel aviv"
  private wheatherList:any[]
  private weatherMap = new Map();
  private key = "976136126d553c05d8890ac35365a99f";
  private beginUrl ="https://api.openweathermap.org/data/2.5/forecast?q="
  private url:string;
  private loading;
  private place:string="";
  private placeNotExist;
  private placeEmpty;
  private id

  constructor(private router :Router,private http: Http) {
  }
getTheWheater(place)
  {
    this.place="";
    this.place=place;
    let result;
    let count=0;
    this.loading=false;
    this.placeNotExist=false;
    this.placeEmpty=false;
    this.id="";

    //check if the input is empty
        if(place.length==0){
      this.placeEmpty=true;
      return;
     }
  this.router.navigate(['/'], { queryParams: { place: place } });
    this.url= this.beginUrl + place +"&units=metric&APPID="+this.key;
      this.http.get(this.url).toPromise().then(response => 
    {console.log(response.status)
    result=response.json();
    this.id=result["city"].id;
    this.generateTheMap(result.list);
  /*  this.wheatherList=this.generate(result.list.length)

    let apiDate=result.list[0].dt_txt.split(" ")[0];
    let date = this.getDate(count)
    let i =0;
    while(typeof result.list[i] != 'undefined')
    {
      apiDate=result.list[i].dt_txt.split(" ")[0]
      date = this.getDate(count)
      if(apiDate!=date)
        count++;
      this.wheatherList=this.getWheaterList(result.list[i],count,i,result["city"].id);
      i++;
    }*/
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
  if(place=="")
  place=this.DEFAULT_PLACE;
    
    if(localStorage.getItem(this.id) != undefined)
    localStorage.removeItem(this.id);
}
  //======================================================================================

addTofavorite(place)
{
   if(place=="")
    place=this.DEFAULT_PLACE;
  let myObj = { id: this.id, place: this.place, temp:this.weatherMap.get(this.getDate())[0].temp,main:this.weatherMap.get(this.getDate())[0].main};//this.wheatherList[0] is the current wheater
  
  localStorage.setItem(this.id, JSON.stringify(myObj));
  console.log(localStorage);
}
getDate()
  {
        var dte = new Date();
    dte.setDate(dte.getDate());
    return formatDate(dte, 'yyyy-MM-dd', 'en');
  }
    generateTheMap(resultApi){
        let tempArray = [];
        let i=0;
        let apiDate=resultApi[0].dt_txt.split(" ")[0];
        while(typeof resultApi[i] != 'undefined')
        {
          let currentDate = resultApi[i].dt_txt.split(" ")[0];
          if(apiDate!=currentDate)
          {
            this.weatherMap.set(apiDate,tempArray);
            tempArray=[];
            apiDate=currentDate;
          }
          tempArray.push(this.addDay(resultApi[i]))
            i++;
        }
                    this.weatherMap.set(apiDate,tempArray);

                    console.log(this.weatherMap);

    }
    addDay(resultApi)
    {
      return {date: this.translatetheDate(resultApi.dt_txt.split(" ")[0]),temp : resultApi["main"].temp, temp_min: resultApi["main"].temp_min,temp_max:resultApi["main"].temp_max,main:resultApi.weather[0].main}
    }

    getWeatherImage(weather_status)
    {
        switch(weather_status.toLowerCase()) {
        case "clear":
        return "https://i.ibb.co/Jnk6k8w/sun-157126-640.png"
        case "clouds":
            return "https://i.ibb.co/MshBkf8/clouds-37009-640.png"
        case "rain":
            return "https://i.ibb.co/YLT4BGN/rain-98538-640.png"
        default:
        return "";
}
    }
    translatetheDate(date)
    {
      let currentDate=date.split("-")
      let day =currentDate[2];
      let month=currentDate[1]-1;
      let year =currentDate[0];
      let d = new Date(year, month, day);
      return d.toDateString();
      console.log(d.toDateString()); // écrit Wed Jul 28 1993

    }
}