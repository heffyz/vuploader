import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from 'src/app/models/video.model';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css'],
})
export class ThumbnailComponent implements OnInit {
  @Input() video: Video;
  uid;
  constructor(private router: Router,
    private auth: AuthentificationService) {
        this.uid= this.auth.uid;
    }

  ngOnInit() {}
  goToVideo() {
    this.router.navigate([`/dashboard/myvideos/${this.video.vid}`]);
  }
}
