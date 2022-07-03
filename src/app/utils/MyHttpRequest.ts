import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class MyHttpRequest
{
  constructor(private http: HttpClient) {}

  public get<T = any>(url: string, params ?: string[], responseType ?: string): Observable<T> {
    // add slash at the end of url if not exist
    if (url.charAt(url.length - 1) !== '/')
      url += '/';

    let endpoint = params !== undefined ? params.map(e => encodeURIComponent(e)).join('/') : "";

    // @ts-ignore
    return this.http.get<T>(url + endpoint, { responseType: responseType });
  }
}

