import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'myvideos',
  templateUrl: 'myvideos.component.html',
  styleUrls: ['./myvideos.component.css'],
})
export class MyvideosComponent implements OnInit {
  videos$;
  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.videos$ =this.videoService.getAllVideos();
  }
}
