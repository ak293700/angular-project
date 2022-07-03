import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-my-photo',
  templateUrl: './my-photo.component.html',
  styleUrls: ['./my-photo.component.css']
})
export class MyPhotoComponent implements OnInit {

  constructor() { }

  @Input() imgUrl : string = "";

  ngOnInit(): void {
  }
}
