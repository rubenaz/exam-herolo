import { Component, OnInit } from '@angular/core';
import { SearchWheaterService } from './search-wheater.service';


@Component({
  selector: 'app-search-wheater',
  templateUrl: './search-wheater.component.html',
  styleUrls: ['./search-wheater.component.css']
})
export class SearchWheaterComponent implements OnInit {

  constructor(public service : SearchWheaterService) { }

  ngOnInit() {
  
  }


  }

