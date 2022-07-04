import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

export interface FormMessage {
  api_key: string;
  tags?: string;
  text?: string;
  min_upload_date?: number;
  max_upload_date?: number;
  sort?: string;
  safe_search?: number;
  in_gallery?: number;
  page: number;
}

@Injectable({
  providedIn: 'root'
})
export class FormMessageService {

  constructor() { }

  private subject = new Subject<FormMessage>();

  sendMessage(message: FormMessage) {
    this.subject.next(message);
  }

  clearMessage() {
    // @ts-ignore
    this.subject.next();
  }

  onMessage(): Observable<FormMessage> {
    return this.subject.asObservable();
  }
}
