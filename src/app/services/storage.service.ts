import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  downloadURL: Observable<string>;
  fb;
  vid;
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore
  ) {}

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
              console.log(url);
              if (this.fb.bytesTransferred == this.fb.totalBytes) {
                const videoRef: AngularFirestoreDocument<Video> = this.afs.doc(
                  `videos/${this.vid}`
                );

                const data = {
                  name: file.name,
                  uid: user.uid,
                  category: value.category,
                  views: 0,
                  vid: this.vid,
                  date: new Date(),
                };
                console.log(user.uid);
                videoRef.set(data, { merge: true });
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
  getVideoUrl(user, vid) {
    const filePath = `${user.uid}`;
    const fileRef = this.storage.ref(filePath);

    return fileRef.child(`${vid}`).getDownloadURL();
  }
}
