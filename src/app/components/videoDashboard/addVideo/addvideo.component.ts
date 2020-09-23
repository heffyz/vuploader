import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'addvideo',
  templateUrl: 'addvideo.component.html',
  styleUrls: ['./addvideo.component.css'],
})
export class AddvideoComponent implements OnInit, OnDestroy {
  destroy$: Subject<null> = new Subject();
  selectedFile: File = null;

  submitted = false;
  uploadProgress$: Observable<number>;
  files: any[] = [];

  constructor(
    private authService: AuthentificationService,
    private videoService: VideoService,
    private router: Router
  ) {}

  ngOnInit() {}
  onFileSelected(event) {
    this.submitted = true;

    this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (user) {
        const {
          downloadUrl$,
          uploadProgress$,
        } = this.videoService.updateVideoData(
          { name: '', category: '' },
          event.target.files[0],
          user
        );

        this.uploadProgress$ = uploadProgress$;

        downloadUrl$.pipe(takeUntil(this.destroy$)).subscribe((downloadUrl) => {
          this.submitted = false;
          console.log(downloadUrl);
          this.router.navigate([
            `/dashboard/myvideos/${this.videoService.vid}`,
          ]);
        });
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next(null);
  }
}
