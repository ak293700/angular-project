import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule} from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlickrFormComponent } from './flickr-form/flickr-form.component';
import { RoutingAppComponent } from './routing-app/routing-app.component';
import { ButtonModule } from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {ToggleButtonModule} from "primeng/togglebutton";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DropdownModule} from "primeng/dropdown";
import { GalleryComponent } from './gallery/gallery.component';
import {GalleriaModule} from "primeng/galleria";
import {DialogModule} from "primeng/dialog";
import {OrderListModule} from "primeng/orderlist";

const appRoutes: Routes = [
  { path:'', redirectTo: '/form', pathMatch: 'full'},
  { path: 'form', component: FlickrFormComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: '**', redirectTo: '/form' }
];

@NgModule({
  declarations: [
    AppComponent,
    FlickrFormComponent,
    RoutingAppComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    ButtonModule,
    CalendarModule,
    BrowserAnimationsModule,
    ToggleButtonModule,
    InputTextareaModule,
    DropdownModule,
    GalleriaModule,
    DialogModule,
    OrderListModule
  ],
  providers: [],
  bootstrap: [RoutingAppComponent]
})
export class AppModule { }
