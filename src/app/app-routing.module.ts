import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SigninComponent } from './components/signin/signin.component';
import { AddvideoComponent } from './components/videoDashboard/addVideo/addvideo.component';
import { DashboardComponent } from './components/videoDashboard/dashboard.component';
import { MyvideosComponent } from './components/videoDashboard/myvideos/myvideos.component';
import { VideoComponent } from './components/videoDashboard/myvideos/video/video.component';

const routes: Routes = [
  {
    path: 'login',
    component: SigninComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'add',
        pathMatch: 'prefix',
      },
      {
        path: 'add',
        component: AddvideoComponent,
      },
      {
        path: 'myvideos',
        component: MyvideosComponent,
      },
      {
        path: 'myvideos/:vid',
        component: VideoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
