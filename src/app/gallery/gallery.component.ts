import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {PhotoUrlsService} from "../services/photo-urls.service";
import {FormMessage, FormMessageService} from "../form-message.service";
import {lastValueFrom, Subscription} from "rxjs";
import {MyHttpRequest} from "../utils/MyHttpRequest";

export interface FlickrPhotoSearchResponse {
  photos: {
    page: number;
    pages: number;
    perpage: number;
    total: number;
    photo: {
      id?: string;
      owner?: string;
      secret?: string;
      server?: string;
      farm?: number;
      title?: string;
      ispublic?: number;
      isfriend?: number;
      isfamily?: number;
    };
  }
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  // The form
  formMessage: FormMessage | undefined;
  pageNumber: number = 1;

  // Gallery
  images : string[] = [];
  activeIndex: number = 0;
  displayCustom: boolean = false;
  responsiveOptions:any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  formSubscription: Subscription;
  constructor(private photoUrlsService: PhotoUrlsService, private formMessageService: FormMessageService, private http: MyHttpRequest ) {
    this.formSubscription = this.formMessageService.onMessage().subscribe((message : FormMessage) => {
      console.log('OnMessage')
      if (message !== undefined) {
        this.formMessage = message;
        this.loadData();
      }
    });
  }

  ngOnInit(): void {
    this.photoUrlsService.getPhotoUrls()
      .subscribe((data : any) => {
          this.images = data.photoUrls;
        }
        , (err: HttpErrorResponse) => {
          if (err.error instanceof Error)
            console.log("Error Client side")
          else
            console.log("Error Server side")
        });
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }

  async loadData() {
    let queryParams: any = [
       { key: "method", value: "flickr.photos.search" }
      ,{ key: "format", value: "json" }
      ,{ key: "nojsoncallback", value: 1 }
      ,{ key: "per_page", value: 1 }
    ];
    for (let key in this.formMessage) // @ts-ignore
      queryParams.push({key: key, value: this.formMessage[key]});

    console.log('queryParams: ', queryParams);

    let response = await lastValueFrom(this.http.get<FlickrPhotoSearchResponse>('https://www.flickr.com/services/rest/'
      , queryParams, 'json'));

    if (response === undefined) {
      console.log('response is undefined');
      return;
    }

    console.log('response', response);

    // @ts-ignore
    for (let photo of response.photos.photo)
    {
      console.log('photo', photo);
      // https://live.staticflickr.com/{server-id}/{id}_{secret}.jpg
      let img = await lastValueFrom(this.http.get<any>(`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
        [], 'text'));
      this.images.push(img);
      this.images = [...this.images];
    }
  }

  previousPage() {
    console.log("Previous page");
    // @ts-ignore
    this.formMessage?.page -= 1
    this.loadData()
  }

  nextPage() {
    // @ts-ignore
    this.formMessage?.page += 1
    this.loadData()
  }

}
