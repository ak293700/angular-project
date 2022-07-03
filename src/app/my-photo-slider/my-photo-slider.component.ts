import { Component, OnInit, Input, Output} from '@angular/core';
import { PhotoUrlsService } from "../services/photo-urls.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-my-photo-slider',
  templateUrl: './my-photo-slider.component.html',
  styleUrls: ['./my-photo-slider.component.css']
})
export class MyPhotoSliderComponent implements OnInit {

  photoUrls : string[] = [];

  index : number = 0;

  constructor(private photoUrlsService: PhotoUrlsService) { }

  ngOnInit(): void {
    this.photoUrlsService.getPhotoUrls()
      .subscribe((data : any) => {
          this.photoUrls = data.photoUrls;
        }
        , (err: HttpErrorResponse) => {
          if (err.error instanceof Error)
            console.log("Error Client side")
          else
            console.log("Error Server side")
        });
  }

  OnClickCarousel(step : number)
  {
    this.index = (this.index + step) % this.photoUrls.length;
    if (this.index < 0)
      this.index = this.photoUrls.length + this.index;
  }

  OnMouseEnter(idName : string) {
    // @ts-ignore
    document.getElementById("carousel-" + idName)?.style.boxShadow = "inset 0 0 40px 100px cornflowerblue";
  }

  OnMouseExit(idName : string) {
    // @ts-ignore
    document.getElementById("carousel-" + idName)?.style.boxShadow = "inset 0 0 40px 20px cornflowerblue";
  }
}
