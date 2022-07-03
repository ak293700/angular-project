import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule} from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyPhotoSliderComponent } from './my-photo-slider/my-photo-slider.component';
import { MyPhotoComponent } from './my-photo/my-photo.component';
import { FlickrFormComponent } from './flickr-form/flickr-form.component';
import { RoutingAppComponent } from './routing-app/routing-app.component';

const appRoutes: Routes = [
  { path:'', redirectTo: '/form', pathMatch: 'full'},
  { path: 'form', component: FlickrFormComponent },
  { path: 'slideshow', component: MyPhotoSliderComponent },
  { path: '**', redirectTo: '/form' }
];

@NgModule({
  declarations: [
    AppComponent,
    MyPhotoSliderComponent,
    MyPhotoComponent,
    FlickrFormComponent,
    RoutingAppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  // bootstrap: [AppComponent]
  bootstrap: [RoutingAppComponent]
})
export class AppModule { }
