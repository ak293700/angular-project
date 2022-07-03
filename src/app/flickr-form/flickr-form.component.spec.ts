import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlickrFormComponent } from './flickr-form.component';

describe('FlickrFormComponent', () => {
  let component: FlickrFormComponent;
  let fixture: ComponentFixture<FlickrFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlickrFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlickrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
