import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ngx-image-upload',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ImageUploadComponent implements ControlValueAccessor {

  @Input() maxSizeMB = 2;
  @Input() allowedTypes = ['image/jpeg', 'image/png'];
  @Output() fileSelected = new EventEmitter<File>();

  public uniqueId = this.generateUniqueId();
  public errorId = `${this.uniqueId}-error`;

  previewUrl: string | ArrayBuffer | null = null;
  error: string | null = null;
  private file: File | null = null;


  uploading = false;
  uploadProgress = 0;
  isDragging = false;

  onChange: (file: File | null) => void = () => {};
  onTouched: () => void = () => {};

  private generateUniqueId(): string {
    try {
      return crypto.randomUUID();
    } catch (e) {
      return `file-input-${Math.random().toString(36).substr(2, 9)}`;
    }
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.uploadFile(file);
    }
  }

  writeValue(value: any): void {
    this.file = value;
    if (value instanceof File) {
      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(value);
    } else {
      this.previewUrl = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.uploadFile(file);
    }
  }

  uploadFile(file: File) {
    if (!this.allowedTypes.includes(file.type)) {
      this.error = 'Invalid file type!';
      return;
    }

    if (file.size > this.maxSizeMB * 1024 * 1024) {
      this.error = 'File size exceeds limit!';
      return;
    }

    this.error = null;
    this.uploading = true;
    this.uploadProgress = 0;

    const interval = setInterval(() => {
      this.uploadProgress += 10;
      if (this.uploadProgress >= 100) {
        clearInterval(interval);
        this.uploading = false;
        this.fileSelected.emit(file);
        this.onChange(file);
        const reader = new FileReader();
        reader.onload = () => (this.previewUrl = reader.result);
        reader.readAsDataURL(file);
      }
    }, 50);
  }
}
