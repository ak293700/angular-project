import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PhotoUrlsService {

  constructor(private httpClient : HttpClient) { }

  getPhotoUrls() : Observable<any>
  {
    return this.httpClient.get("http://localhost:4200/assets/photoUrls.json");
  }
}
