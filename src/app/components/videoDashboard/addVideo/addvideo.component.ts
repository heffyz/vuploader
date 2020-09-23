import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'addvideo',
  templateUrl: 'addvideo.component.html',
  styleUrls: ['./addvideo.component.css'],
})
export class AddvideoComponent implements OnInit, OnDestroy {
  userSubscription;
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  files: any[] = [];

  constructor(
    private storage: AngularFireStorage,
    private authService: AuthentificationService
  ) {}

  ngOnInit() {}
  onFileSelected(event) {
    this.userSubscription = this.authService.user$.subscribe((user) => {
      if (user) {
        var n = Date.now();
        const file = event.target.files[0];
        const filePath = `${user.uid}/${n}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(`${user.uid}/${n}`, file);
        task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              this.downloadURL = fileRef.getDownloadURL();
              this.downloadURL.subscribe((url) => {
                if (url) {
                  this.fb = url;
                }
                console.log(this.fb);
              });
            })
          )
          .subscribe((url) => {
            if (url) {
              console.log(url);
            }
          });
      }
    });
  }
  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
}
