import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, forwardRef, Input, OnChanges, Output, QueryList, SimpleChanges, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import imageCompression from 'browser-image-compression';

@Component({
  selector: 'ngx-image-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ImageUploadComponent implements ControlValueAccessor, OnChanges {
  @Input() maxSizeMB = 2;
  @Input() allowedTypes = ['*'];
  @Input() src: string | null = null;
  @Input() defaultImage = '';
  @Input() width = 150;
  @Input() height = 150;
  @Input() previewTitle: string | null = null;
  @Input() showErrorMessage: boolean = true;
  @Input() showPreviewButton = true;
  @Input() previewButtonLabel = 'View full size';
  @Input() enablePreviewModal = true;
  @Input() requiredMessage = '';
  @Input() compress = false;
  @Input() compressionOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
    initialQuality: 0.8,
  };
  @Input() showCompressDebugging = false;
  @Output() fileSelected = new EventEmitter<File>();

  @ContentChild('defaultText') defaultText!: ElementRef;

  public uniqueId = this.generateUniqueId();
  public errorId = `${this.uniqueId}-error`;

  previewUrl: string | null = null;
  error: string | null = null;
  private file: File | null = null;
  showDefaultText = true;

  uploading = false;
  uploadProgress = 0;
  isDragging = false;
  hasDefaultText = false;

  showFullScreen = false;
  zoomLevel = 1;
  panPosition = { x: 0, y: 0 };
  isPanning = false;
  startPanPosition = { x: 0, y: 0 };
  isDisabled = false;

  onChange: (file: File | null) => void = () => {};
  onTouched: () => void = () => {};

  @Input() set disabled(value: boolean) {
    this.isDisabled = value;
    this.cd.markForCheck();
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.cd.markForCheck();
  }

  ngAfterContentInit() {
    if (this.defaultText) {
      this.hasDefaultText = true;
    } else this.hasDefaultText = false;
  }

  private generateUniqueId(): string {
    try {
      return crypto.randomUUID();
    } catch (e) {
      return `file-input-${Math.random().toString(36).substr(2, 9)}`;
    }
  }

  constructor(private cd: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['src']) {
      this.handleSrcChange();
    }

    if (changes['requiredMessage']) {
      this.error = this.requiredMessage;
    }
  }

  private handleSrcChange() {
    if (this.src) {
      this.loadInitialImage(this.src);
    } else {
      this.previewUrl = null;
      this.showDefaultText = true;
      this.cd.detectChanges();
    }
  }

  ngOnInit() {
    if (this.src) {
      this.loadInitialImage(this.src);
    }
  }

  private loadInitialImage(src: string) {
    this.previewUrl = null;
    this.showDefaultText = true;
    this.cd.detectChanges();

    const img = new Image();
    img.src = src;

    img.onload = () => {
      this.previewUrl = src;
      this.showDefaultText = false;
      this.cd.detectChanges();
    };

    img.onerror = () => {
      this.previewUrl = this.defaultImage;
      this.showDefaultText = false;
      this.cd.detectChanges();
    };
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
      reader.onload = () => {
        this.previewUrl = reader.result as string;
        this.showDefaultText = false;
      };
      reader.readAsDataURL(value);
    } else if (typeof value === 'string') {
      this.loadInitialImage(value);
    } else {
      this.previewUrl = null;
      this.showDefaultText = true;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onDragOver(event: DragEvent) {
    if (this.isDisabled) return;
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    if (this.isDisabled) return;
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.uploadFile(file);
    }
  }

  // uploadFile(file: File) {
  //   if (!this.allowedTypes.includes('*')) {
  //     if (!this.allowedTypes.includes(file.type)) {
  //       this.error = 'Invalid file type!';
  //       return;
  //     }
  //   }

  //   if (file.size > this.maxSizeMB * 1024 * 1024) {
  //     this.error = 'File size exceeds limit!';
  //     return;
  //   }

  //   this.error = null;
  //   this.uploading = true;
  //   this.uploadProgress = 0;

  //   const interval = setInterval(() => {
  //     this.uploadProgress += 10;
  //     if (this.uploadProgress >= 100) {
  //       clearInterval(interval);
  //       this.uploading = false;
  //       this.fileSelected.emit(file);
  //       this.onChange(file);
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         this.previewUrl = reader.result as string;
  //         this.showDefaultText = false;
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   }, 50);
  // }

  async uploadFile(file: File) {
    if (!this.allowedTypes.includes('*')) {
      if (!this.allowedTypes.includes(file.type)) {
        this.error = 'Invalid file type!';
        return;
      }
    }

    if (file.size > this.maxSizeMB * 1024 * 1024) {
      this.error = 'File size exceeds limit!';
      return;
    }

    this.error = null;
    this.uploading = true;
    this.uploadProgress = 0;
    const originalSize = (file.size / 1024 / 1024).toFixed(2);

    try {
      // Compress the file if enabled
      if (this.compress) {
        file = await this.compressImage(file);
        const compressedSize = (file.size / 1024 / 1024).toFixed(2);
        if (this.showCompressDebugging) {
          console.log(`Original size: ${originalSize} MB`);
          console.log(`Compressed size: ${compressedSize} MB`);
        }
      }

      const interval = setInterval(() => {
        this.uploadProgress += 10;
        if (this.uploadProgress >= 100) {
          clearInterval(interval);
          this.uploading = false;

          this.file = file;
          this.fileSelected.emit(file);
          this.onChange(file);

          const reader = new FileReader();
          reader.onload = () => {
            this.previewUrl = reader.result as string;
            this.showDefaultText = false;
          };
          reader.readAsDataURL(file);
        }
      }, 50);
    } catch (err) {
      console.error('File upload/compression error:', err);
      this.error = 'Failed to process the image.';
      this.uploading = false;
    }
  }


  openFullScreen() {
    if (this.previewUrl || this.defaultImage) {
      if (this.isDisabled || !this.previewUrl) return;
      this.showFullScreen = true;
      document.body.style.overflow = 'hidden';
    }
  }

  closeFullScreen() {
    this.showFullScreen = false;
    document.body.style.overflow = '';
  }

  zoomIn() {
    this.zoomLevel = Math.min(5, this.zoomLevel + 0.2);
  }

  zoomOut() {
    this.zoomLevel = Math.max(0.5, this.zoomLevel - 0.2);
  }

  resetZoom() {
    this.zoomLevel = 1;
    this.panPosition = { x: 0, y: 0 };
  }

  startPan(event: MouseEvent) {
    this.isPanning = true;
    this.startPanPosition = {
      x: event.clientX - this.panPosition.x,
      y: event.clientY - this.panPosition.y
    };
  }

  doPan(event: MouseEvent) {
    if (!this.isPanning) return;
    this.panPosition.x = event.clientX - this.startPanPosition.x;
    this.panPosition.y = event.clientY - this.startPanPosition.y;
  }

  endPan() {
    this.isPanning = false;
  }

  async compressImage(file: File): Promise<File> {

    const supportedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    let finalFile = file;

    if (!supportedTypes.includes(file.type)) {
      finalFile = await this.convertToSupportedFormat(file);
    }

    const options = this.compressionOptions;

    try {
      const compressedFile = await imageCompression(finalFile, options);
      return compressedFile;
    } catch (error) {
      console.error('Image compression error:', error);
      return file;
    }
  }

  async convertToSupportedFormat(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext('2d');
          if (!ctx) return reject('Canvas not supported');

          ctx.drawImage(img, 0, 0);

          canvas.toBlob(blob => {
            if (blob) {
              const originalName = file.name;
              const nameWithExtension = originalName.includes('.')
                ? originalName.replace(/\.\w+$/, '.jpeg')
                : originalName + '.jpeg';

              const newFile = new File([blob], nameWithExtension, {
                type: 'image/jpeg',
                lastModified: Date.now()
              });

              resolve(newFile);
            } else {
              reject('Failed to convert image to JPEG.');
            }
          }, 'image/jpeg', 0.95);
        };
        img.onerror = reject;
        img.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }


  // async convertToSupportedFormat(file: File): Promise<File> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const img = new Image();
  //       img.onload = () => {
  //         const canvas = document.createElement('canvas');
  //         canvas.width = img.width;
  //         canvas.height = img.height;

  //         const ctx = canvas.getContext('2d');
  //         if (!ctx) return reject('Canvas not supported');

  //         ctx.drawImage(img, 0, 0);

  //         canvas.toBlob(blob => {
  //           if (blob) {
  //             const newFile = new File([blob], file.name.replace(/\.\w+$/, '.jpeg'), {
  //               type: 'image/jpeg',
  //               lastModified: Date.now()
  //             });
  //             resolve(newFile);
  //           } else {
  //             reject('Failed to convert image to JPEG.');
  //           }
  //         }, 'image/jpeg', 0.95);
  //       };
  //       img.onerror = reject;
  //       img.src = reader.result as string;
  //     };
  //     reader.onerror = reject;
  //     reader.readAsDataURL(file);
  //   });
  // }


}
