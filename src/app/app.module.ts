import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/storage'; 
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { SigninComponent } from './components/signin/signin.component';
import { DashboardComponent } from './components/videoDashboard/dashboard.component';
import { MyvideosComponent } from './components/videoDashboard/myvideos/myvideos.component';
import { AddvideoComponent } from './components/videoDashboard/addVideo/addvideo.component';
import { VideoComponent } from './components/videoDashboard/myvideos/video/video.component';
import { DndDirective } from './directives/dnd.directive';
import { VgCoreModule } from '@videogular/ngx-videogular/core';

import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    DashboardComponent,
    MyvideosComponent,
    AddvideoComponent,
    VideoComponent,
    DndDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCV5LV1ltPNCVaxAvSko1fmufmpJVXJAhA',
      authDomain: 'vuploader-a50a8.firebaseapp.com',
      databaseURL: 'https://vuploader-a50a8.firebaseio.com',
      projectId: 'vuploader-a50a8',
      storageBucket: 'vuploader-a50a8.appspot.com',
      messagingSenderId: '865449249329',
      appId: '1:865449249329:web:a26d5ec30bc6cbb55ce310',
      measurementId: 'G-GJH436MYPZ',
    }),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  providers: [AngularFireStorage],
  bootstrap: [AppComponent],
})
export class AppModule {}
