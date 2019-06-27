import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-favorite-wheater',
  templateUrl: './favorite-wheater.component.html',
  styleUrls: ['./favorite-wheater.component.css']
})
export class FavoriteWheaterComponent implements OnInit {

  favorite=new Map();
;
  constructor(private router :Router) { }

  deleteFromFavorite(id)
  {
    localStorage.removeItem(id);
    this.favorite.delete(id);
    this.ngOnInit();
  }

  getTheWeather(place)
  {
    this.router.navigate(['/'], { queryParams: { place: place.value.place } });
  }
  correctPlace(fav)
  {
    if(fav.value.place == undefined)
      return false;
      else
      return true;

  }

  ngOnInit() {
    this.favorite.clear();
    for (let i = 0; i < localStorage.length; i++) {
        this.favorite.set(localStorage.key(i),JSON.parse( localStorage.getItem(localStorage.key(i))));   
}
        console.log(this.favorite);

  }

}