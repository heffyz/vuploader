import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { SigninComponent } from './components/signin/signin.component';
import { DashboardComponent } from './components/videoDashboard/dashboard.component';
import { MyvideosComponent } from './components/videoDashboard/myvideos/myvideos.component';
import { AddvideoComponent } from './components/videoDashboard/addVideo/addvideo.component';
import { VideoComponent } from './components/videoDashboard/myvideos/video/video.component';
import { AuthGuard } from './auth.guard';
import { DndDirective } from './directives/dnd.directive';

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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
