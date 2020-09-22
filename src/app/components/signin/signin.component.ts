import { Component } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  title = 'vuploader';

  name = new FormControl('',Validators.required);
  constructor(public auth: AuthentificationService) {
  }
}
