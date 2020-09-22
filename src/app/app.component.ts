import { Component } from '@angular/core';
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
