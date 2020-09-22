import { Component } from '@angular/core';
import { User } from './models/user.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthentificationService } from './services/authentification.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'vuploader';

  name = new FormControl('');
  constructor(public auth: AuthentificationService) {
  }
}
