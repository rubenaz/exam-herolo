import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-day-component',
  templateUrl: './day-component.component.html',
  styleUrls: ['./day-component.component.css']
})
export class DayComponentComponent implements OnInit {

  @Input() private day;
  @Input() private temp;
  @Input() private temp_max;
  @Input() private temp_min;
  @Input() private weather;


  constructor() { }

  ngOnInit() {
  }

}