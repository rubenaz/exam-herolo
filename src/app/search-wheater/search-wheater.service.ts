import { Injectable } from '@angular/core';
import {Http,Response,HttpModule, RequestOptions, Headers,} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http'; 
import {formatDate} from '@angular/common';


@Injectable()
export class SearchWheaterService {
  MAX_DAY=5;
  NUM_OF_DETAILS=5
  key = "976136126d553c05d8890ac35365a99f";
  beginUrl ="https://api.openweathermap.org/data/2.5/forecast?q="
  url:string;
  wheatherList:any[][];

  constructor(private http: Http) { 
  }


   getTheWheater(place)
  {
    this.wheatherList= this.generate(this.wheatherList,this.MAX_DAY,this.NUM_OF_DETAILS)
    console.log(this.wheatherList)
    let result;
    let count=0;
  
    this.url= this.beginUrl + place +"&APPID="+this.key;
    console.log(this.url);
      this.http.get(this.url).subscribe(response => 
    {console.log(response.json())
    result=response.json();
    let apiDate=result.list[0].dt_txt.split(" ")[0];
    let date = this.getDate(count)
    let i=0;
    this.getWheaterList(result.list[0],count)
    count++;
    while(count<=5)
    {
       apiDate=result.list[i].dt_txt.split(" ")[0];
       date = this.getDate(count)
      if(apiDate!=date)
      {
            this.getWheaterList(result.list[i],count);
            count++;
      }
      i++;
    }
  
    });

  }
  getWheaterList(result,count)
  {
      this.wheatherList[count]["date"]=2;
  }
  getDate(count)
  {
        var dte = new Date();
    dte.setDate(dte.getDate() - count);
    return formatDate(dte, 'yyyy-MM-dd', 'en');
  }
  generate(array,MAX_DAYS,NUM_OF_DETAILS)//generate the double array (data)
    {
        array=[];
        for(let j=0 ; j< MAX_DAYS;j++){
            array[j]=new array(NUM_OF_DETAILS)
        }
        return array
    }

  
}