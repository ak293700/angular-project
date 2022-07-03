import { Component, OnInit, Input, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-flickr-form',
  templateUrl: './flickr-form.component.html',
  styleUrls: ['./flickr-form.component.css']
})
export class FlickrFormComponent implements OnInit {

  searchForm: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.searchForm = formBuilder.group({
      'first_name': [null, Validators.required],
      'last_name': [null, Validators.required],
      'min_date': null,
      'max_date': null
    })

  }

  ngOnInit(): void {
  }

  OnSubmit(form: FormGroup): void {
    console.log("Form data :")
    console.log(form)
  }
}
