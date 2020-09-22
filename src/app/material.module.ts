import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [MatButtonModule, MatCardModule, MatInputModule, MatDividerModule],
  exports: [MatButtonModule, MatCardModule, MatInputModule, MatDividerModule],
})
export class MaterialModule {}
