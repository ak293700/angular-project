import {Component, OnInit, ViewChild} from '@angular/core';
import { FormMessage, FormMessageService } from "../form-message.service";
import { lastValueFrom, Subscription } from "rxjs";
import { MyHttpRequest } from "../utils/MyHttpRequest";
import api_key from "../../assets/api_key.json";


export interface FlickrPhotoSearchResponse {
  photos: {
    page: number;
    pages: number;
    perpage: number;
    total: number;
    photo: {
      id: string;
      owner: string;
      secret: string;
      server: string;
      farm: number;
      title: string;
      ispublic: number;
      isfriend: number;
      isfamily: number;
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

  // Gallery
  images: string[] = [];
  photoResponse: FlickrPhotoSearchResponse | undefined;

  // Overlay
  overlayVisible: boolean = false;
  overlayElement: {property: string, field: string}[] = [];
  overlayDescription: string = "";


  formSubscription: Subscription;
  constructor(public formMessageService: FormMessageService, private http: MyHttpRequest ) {
    this.formSubscription = this.formMessageService
      .onMessage().subscribe((message : FormMessage) => {
      if (message !== undefined) {
        this.formMessage = message;
        this.loadData();
        formMessageService.clearMessage();
      }
    });
  }

  ngOnInit(): void {}


  async imageClick(index: number) {
    this.overlayElement = [];
    this.overlayDescription = "";

    if (index < 1 || index > this.images.length)
      return;

    let queryParams: any = [
        { key: "method", value: "flickr.photos.getInfo" }
      , { key: "format", value: "json" }
      , { key: "nojsoncallback", value: 1 }
      , { key: "api_key", value: api_key.api_key }
      // @ts-ignore
      , { key: "photo_id", value: this.photoResponse.photos.photo[index].id }
    ];
    let infos = await lastValueFrom(this.http.get<any>('https://www.flickr.com/services/rest/', queryParams, 'json'));

    if (infos === undefined || infos.photo === undefined) {
      console.log('infos is undefined');
      return;
    }

    let photo = infos.photo;

    if (photo.dateuploaded !== undefined)
      this.overlayElement.push({property: "Date d'upload", field: new Date(photo.dateuploaded * 1000).toLocaleString()});

    if (photo.location !== undefined && photo.location.country !== undefined)
      this.overlayElement.push({property: "Pays", field: photo.location.country._content});

    if (photo.comments !== undefined)
      this.overlayElement.push({property: "Nombre de commentaires", field: photo.comments._content});

    if (photo.description !== undefined)
      this.overlayDescription = '<div>' + photo.description._content + '</div>';

    this.overlayVisible = true;
  }

  async loadData() {
    let queryParams: any = [
       { key: "method", value: "flickr.photos.search" }
      ,{ key: "format", value: "json" }
      ,{ key: "nojsoncallback", value: 1 }
    ];

    for (let key in this.formMessage) // @ts-ignore
      queryParams.push({key: key, value: this.formMessage[key]});

    let response = await lastValueFrom(this.http.get<FlickrPhotoSearchResponse>('https://www.flickr.com/services/rest/'
      , queryParams, 'json'));


    if (response === undefined) {
      console.log('response is undefined');
      return;
    }

    this.photoResponse = response;
    let images = [];

    // @ts-ignore
    for (let photo of response.photos.photo) {
      // https://live.staticflickr.com/{server-id}/{id}_{secret}.jpg
      let src = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
      images.push(src);
    }

    this.images = images;
  }

  async previousPage() {
    if (this.photoResponse === undefined || this.formMessage === undefined)
      return;

    if (this.formMessage.page === 1)
      return;

    this.formMessage.page -= 1
    await this.loadData()
  }

  async nextPage() {
    if (this.photoResponse === undefined || this.formMessage === undefined)
      return;

    if (this.formMessage.page === this.photoResponse.photos.pages)
      return;

    this.formMessage.page += 1
    await this.loadData();
  }
}
