import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { from, Observable, of } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { Video } from '../models/video.model';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { AuthentificationService } from './authentification.service';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  fb;
  vid;

  videosCollection: AngularFirestoreCollection<Video>;
  videos$: Observable<any>;
  videoDoc: AngularFirestoreDocument<Video>;
  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private auth: AuthentificationService
  ) {
    this.videosCollection = this.afs.collection('videos', (ref) =>
      ref.orderBy('date', 'asc').where('uid', '==', this.auth.uid)
    );
    this.videos$ = this.videosCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as Video;
          return data;
        });
      })
    );
  }

  getAllVideos() {
    return this.videos$;
  }
  addVideo(video: Video) {
    this.videoDoc = this.afs.doc(`videos/${video.vid}`);
    this.videoDoc.set(video, { merge: true });
  }

  incrementViews(vid) {
    const vidRef = this.afs.collection('videos').doc(`${vid}`);
    const increment = firestore.FieldValue.increment(1);
    vidRef.update({ views: increment });
  }
}
