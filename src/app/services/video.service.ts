import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { from, Observable, of } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Video } from '../models/video.model';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  downloadURL: Observable<string>;
  fb;
  vid;

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private router: Router,
    private auth: AngularFireAuth
  ) {}

  getVideoUrl(user, vid) {
    const filePath = `${user.uid}`;
    const fileRef = this.storage.ref(filePath);

    return fileRef.child(`${vid}`).getDownloadURL();
  }

  updateVideoData(value, file, user) {
    this.vid = this.afs.createId();

    if (user) {
      const filePath = `${user.uid}/${this.vid}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`${user.uid}/${this.vid}`, file);
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
              if (this.fb.bytesTransferred == this.fb.totalBytes) {
                const videoRef: AngularFirestoreDocument<Video> = this.afs.doc(
                  `videos/${this.vid}`
                );

                console.log(user.uid);
                const data = {
                  name: file.name,
                  uid: user.uid,
                  category: value.category,
                  views: 0,
                  vid: this.vid,
                  date: new Date(),
                };

                return videoRef.set(data, { merge: true });
              }
            }
          });
        })
      );
      return {
        uploadProgress$: task.percentageChanges(),
        downloadUrl$: this.getDownloadUrl$(task, filePath),
      };
    }
  }

  private getDownloadUrl$(
    uploadTask: AngularFireUploadTask,
    path: string
  ): Observable<string> {
    return from(uploadTask).pipe(
      switchMap((_) => this.storage.ref(path).getDownloadURL())
    );
  }

  getMyvideosDetailsByuid(uid) {
    const filesPath = `${uid}`;
    const filesRef = this.storage.ref(filesPath);
    return filesRef.listAll().pipe(
      map((file) => {
        console.log(file);
        return file.items.forEach((item) => {
          console.log(this.afs.collection('videos').doc(item.name).get());
        });
      })
    );
  }
}
