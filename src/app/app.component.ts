import { Component } from '@angular/core';
import { ImageUploadComponent } from "../../projects/ngx-image-upload-preview/src/lib/image-upload/image-upload.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ImageUploadComponent,
    ReactiveFormsModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      image1: fb.control(null),
      image2: fb.control(null),
    });
  }
}
