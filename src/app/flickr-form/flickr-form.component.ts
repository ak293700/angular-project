import { Component, OnInit, Input, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormMessage, FormMessageService} from "../form-message.service";
import api_key from "../../assets/api_key.json";
import {Router} from "@angular/router";


@Component({
  selector: 'app-flickr-form',
  templateUrl: './flickr-form.component.html',
  styleUrls: ['./flickr-form.component.css']
})
export class FlickrFormComponent implements OnInit {

  searchForm: FormGroup;

  constructor(formBuilder: FormBuilder, private formMessageService: FormMessageService, private router: Router) {
    this.searchForm = formBuilder.group({
      'tags': 'Sport, Home',
      'text': null,
      'min_upload_date': null,
      'max_upload_date': null,
      'safe_search': false,
      'sort': null,
      'in_gallery': false,
    })
  }

  ngOnInit(): void {
  }

  OnSubmit(form: any): void {
    console.log("Form data :")

    let formMessage: FormMessage = {api_key: api_key.api_key};

    if (form.tags)
      formMessage.tags = form.tags.split(",").map((tag: string) => tag.trim());

    if (form.text)
      formMessage.text = form.text;

    if (form.min_upload_date)
      formMessage.min_upload_date = form.min_upload_date.toLocaleDateString();

    if (form.max_upload_date)
      formMessage.max_upload_date = form.max_upload_date.toLocaleDateString()


    formMessage.safe_search = form.safe_search ? 3 : 1;

    if (form.sort)
      formMessage.sort = form.sort.toLowerCase().replace(" ", "-");

    formMessage.in_gallery = form.in_gallery ? 1 : 0;

    formMessage.page = 1;

    console.log('formMessage', formMessage);

    this.formMessageService.sendMessage(formMessage);

    this.router.navigate(['/gallery']);
  }
}
