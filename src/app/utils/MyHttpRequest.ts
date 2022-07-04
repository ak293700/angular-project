import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class MyHttpRequest
{
  constructor(private http: HttpClient) {}

  public get<T = any>(url: string, params ?: {key: string, value: string | string[]}[], responseType ?: string): Observable<T> {
    // add slash at the end of url if not exist
    if (url.charAt(url.length - 1) !== '/')
      url += '/';

    // let endpoint = params !== undefined ? params.map(e => encodeURIComponent(e)).join('/') : "";

    let queryParams = "";
    if (params !== undefined)
    {
      queryParams = "?";
      for (let i = 0; i < params.length; i++)
      {
        queryParams += params[i].key + "=";
        if (Array.isArray(params[i].value)) // @ts-ignore
          queryParams += params[i].value.map((e: string) => encodeURIComponent(e)).join('+');
        else // @ts-ignore
         queryParams += encodeURIComponent(params[i].value);

        if (i < params.length - 1)
          queryParams += "&";
      }
    }

    // @ts-ignore
    return this.http.get<T>(url + queryParams, { responseType: responseType });
  }
}

