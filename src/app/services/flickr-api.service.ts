import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FlickrApiService {


  token : string = "";
  constructor(private http : HttpClient) { }


}
