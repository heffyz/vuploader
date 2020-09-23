import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  folders = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];
  notes = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];

  destroy$: Subject<null> = new Subject();
  downloadUrl;
  constructor(
    public authService: AuthentificationService,
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
      
    this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.storageService
        .getVideoUrl(user, this.activatedRoute.snapshot.params.vid)
        .subscribe((url) => {
          if (url) this.downloadUrl = url;
        });
    });
  }

  currentIndex = 0;
  api;

  onPlayerReady(api) {
    this.api = api;

    this.api
      .getDefaultMedia()
      .subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
  }

  playVideo() {
    this.api.play();
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }
}
