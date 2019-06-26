import { Injectable } from '@angular/core';
import {formatDate} from '@angular/common';




@Injectable()
export class SearchWheaterService {
  rows=0;
  wheatherList:any[]

  constructor() {
  }
  getWheaterList(result,count,i,id)
  {
      this.wheatherList[i].id=id;
      this.wheatherList[i].num=count;
      this.wheatherList[i].date=result.dt_txt;
      this.wheatherList[i].temp=result["main"].temp;
      this.wheatherList[i].temp_min=result["main"].temp_min;
      this.wheatherList[i].temp_max=result["main"].temp_max;
      this.wheatherList[i].main=result.weather[0].main;
      return this.wheatherList
  }
  //======================================================================================
  getDate(count)
  {
        var dte = new Date();
    dte.setDate(dte.getDate() + count);
    return formatDate(dte, 'yyyy-MM-dd', 'en');
  }
  //======================================================================================
  generate(rows)//generate the double array (data)
    {
      this.rows=rows;
        this.wheatherList=[];
        for(let j=0 ; j< rows;j++){
           this.wheatherList[j]={id: "",num:"",date: "",temp : "", temp_min: "",temp_max:"",main:""};
        }
        return this.wheatherList;
    }  
}