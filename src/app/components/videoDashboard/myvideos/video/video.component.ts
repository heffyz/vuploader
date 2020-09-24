import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { StorageService } from 'src/app/services/storage.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'videoplayer',
  templateUrl: 'video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit, OnDestroy {
  destroy$: Subject<null> = new Subject();
  downloadUrl;
  videos$;
  api;
  currentVid;
  constructor(
    private router: Router,
    public authService: AuthentificationService,
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.currentVid =  this.activatedRoute.snapshot.params.vid;
    this.videoService.incrementViews(this.activatedRoute.snapshot.params.vid);
    this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.storageService
        .getVideoUrl(user,this.currentVid)
        .subscribe((url) => {
          if (url) this.downloadUrl = url;
        });
    });
    this.videos$ = this.videoService.getAllVideos();
  }

  onPlayerReady(api) {
    this.api = api;

    this.api
      .getDefaultMedia()
      .subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
  }

  playVideo() {
    this.api.play();
  }
  gotoVideo(video) {
    this.currentVid = video.vid;
    this.router.navigateByUrl('/dashboard/myvideos/' + video.vid);
    this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.storageService.getVideoUrl(user, video.vid).subscribe((url) => {
        if (url) this.downloadUrl = url;
      });
    });
    
    this.videoService.incrementViews(video.vid);
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }
}
