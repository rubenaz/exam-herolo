import { Component, OnInit } from '@angular/core';
import { SearchWheaterService } from './search-wheater.service';
 
import {formatDate} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import 'rxjs/add/operator/filter';



@Component({
  selector: 'app-search-wheater',
  templateUrl: './search-wheater.component.html',
  styleUrls: ['./search-wheater.component.css']
})
export class SearchWheaterComponent implements OnInit {
  DEFAULT_PLACE="tel aviv"
  place :string ="";

  constructor(public service : SearchWheaterService,private route: ActivatedRoute,private router :Router) { 
    //this.router.navigate(['/'], { queryParams: { place: 'tel aviv' } });
  
  }

//======================================================================================

  ngOnInit() {
    
    this.route.queryParams
      .filter(params => params.place)
      .subscribe(params => {
        console.log(params); // {order: "popular"}

        this.place = params.place;
        console.log(this.place); // popular
        this.service.getTheWheater(this.place);
      });
      if(this.place.length==0)
            this.router.navigate(['/'], { queryParams: { place: this.DEFAULT_PLACE } });


      
  }


  }

