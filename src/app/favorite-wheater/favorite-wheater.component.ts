import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-favorite-wheater',
  templateUrl: './favorite-wheater.component.html',
  styleUrls: ['./favorite-wheater.component.css']
})
export class FavoriteWheaterComponent implements OnInit {

  favorite=new Map();
;
  constructor() { }

  deleteFromFavorite(id)
  {
    localStorage.removeItem(id);
    this.favorite.delete(id);
    this.ngOnInit();
  }

  ngOnInit() {
    for (let i = 0; i < localStorage.length; i++) {
        this.favorite.set(localStorage.key(i),JSON.parse( localStorage.getItem(localStorage.key(i))));   
}
        console.log(this.favorite);
        
  }

}