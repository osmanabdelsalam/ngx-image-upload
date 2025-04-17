
# ngx-image-upload

🚀 A feature-rich Angular image upload component with preview, validation, **automatic compression**, zoom capabilities, and full form integration.

![ngx-image-upload](https://github.com/osmanabdelsalam/ngx-image-upload/blob/main/public/ngx-image-upload.png?raw=true)

---

## ✨ Features

- 📷 **Image Upload & Preview** with drag-and-drop support  
- 🔍 **Interactive Preview Modal** with zoom/pan capabilities  
- ✅ **Comprehensive Validation** (file type, size, required)  
- 📉 **Automatic Image Compression** before upload *(configurable)*  
- 🎨 **Customizable UI** with CSS Variables and templates  
- 📱 **Responsive Design** with adjustable dimensions  
- ♿ **Accessibility First** (ARIA labels, keyboard navigation)  
- 📦 **Standalone Component** with zero dependencies  
- ⚡ **Smooth Animations** & loading states  

---

## 🚀 Installation

```bash
npm install @osmanabd/ngx-image-upload-preview
```

## 📌 Basic Usage

```ts
import { ImageUploadComponent } from '@osmanabd/ngx-image-upload-preview';
```

### Reactive Forms Example

```html
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
  <ngx-image-upload 
    formControlName="avatar"
    [required]="true"
    [maxSizeMB]="5"
    [compress]="true"
    [compressionOptions]="{ maxSizeMB: 1, maxWidthOrHeight: 1024, initialQuality: 0.8 }"
    [allowedTypes]="['image/jpeg', 'image/png', 'image/webp']"
    previewTitle="Profile Preview"
    requiredMessage="Please upload a profile photo"
    (fileSelected)="handleFile($event)">
  </ngx-image-upload>
  
  <button type="submit">Save Profile</button>
</form>
```

### Template-driven Forms Example

```html
<ngx-image-upload
  [(ngModel)]="user.avatar"
  name="avatar"
  [compress]="true"
  [compressionOptions]="{ maxSizeMB: 1 }"
  [defaultImage]="'assets/default-avatar.png'">
</ngx-image-upload>
```

---

## 📉 Image Compression

To reduce file size and optimize uploads, ngx-image-upload supports automatic client-side image compression.

### 🔧 Compression Options

| Input              | Type     | Default | Description                                                                 |
|--------------------|----------|---------|-----------------------------------------------------------------------------|
| `compress`         | boolean  | `false` | Enable/disable image compression before upload                              |
| `compressionOptions` | object | `{}`     | Compression settings (see below)                                            |

#### Example Options

```ts
compressionOptions = {
  maxSizeMB: 1,             // Target size in MB
  maxWidthOrHeight: 1024,   // Resize image to max width or height
  initialQuality: 0.8       // Quality for JPEG/WebP compression
}
```

> 📱 Images taken from iPhones or modern phones (2–5MB) can be reduced to 500KB–1MB depending on resolution and quality.

> 🖼️ Unsupported formats (e.g., HEIC, SVG) are auto-converted to JPEG before compression.

---

## 🔍 Preview Modal Features

The interactive preview modal includes:

- Zoom In/Out controls (0.5x - 5x)  
- Drag-to-Pan functionality when zoomed  
- Reset to Default view  
- Fullscreen Overlay with blurred backdrop  

---

## 🎨 Customization

```scss
ngx-image-upload {
  --primary-color: #4a90e2;
  --error-color: #ff4757;
  --border-radius: 8px;
  --background-color: #f8f9fa;
  --text-color: #2d3436;
  --box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  --transition-speed: 0.3s;
}
```

---

## ✅ Validation & Error Handling

Built-in Validations:

```html
<ngx-image-upload
  [maxSizeMB]="5"
  [allowedTypes]="['image/jpeg', 'image/png']"
  requiredMessage="Image is required">
</ngx-image-upload>
```

### Validation Scenarios

1. **Required Validation** – Displays custom message when no image is selected  
2. **File Size Validation** – Max size in MB (after compression if enabled)  
3. **MIME Type Validation** – JPEG, PNG, WebP (wildcards not supported yet)  
4. **Custom Error Messages** – For localization or branding  

---

## 📋 API Reference

### Inputs

| Input               | Type     | Default     | Description                           |
|---------------------|----------|--------------|--------------------------------------|
| `requiredMessage`   | string   | -         | Marks field as required with provided message |
| `maxSizeMB`         | number   | 2            | Maximum file size in megabytes       |
| `allowedTypes`      | string[] | `['image/jpeg', 'image/png']`  | Allowed MIME types                   |
| `previewTitle`      | string   | -            | Title shown in preview modal         |
| `showPreviewButton` | boolean  | true         | Toggle preview zoom button           |
| `enablePreviewModal`| boolean  | true         | Enable/disable fullscreen preview    |
| `defaultImage`      | string   | -            | Fallback image for errors            |
| `previewButtonLabel`| string   | "View full size" | Preview Button Label           |
| `width`             | number   | 150          | Preview container width              |
| `height`            | number   | 150          | Preview container height             |
| `src`               | string   | -            | Default preview image                |
| `disabled`          | boolean  | false        | Disable/Enable input                 |
| `compress`          | boolean  | false        | Enable automatic image compression   |
| `compressionOptions`| object   | `{}`         | Options to configure compression     |

### Outputs

| Output              | Type    | Description           |
|---------------------|---------|-----------------------|
| `fileSelected`      | `File`  | Emits selected file after validation & compression |

---

## ♿ Accessibility Features

- ARIA Labels for all interactive elements  
- Focus States for visual feedback  
- Screen Reader optimized:
  - Live error announcements  
  - Modal interaction labels  
  - Status updates during upload  

---

## 🐞 Troubleshooting

**Q:** Preview modal not opening?  
**A:** Ensure `enablePreviewModal` is not set to `false` and check browser CSP for blob URL issues.

**Q:** Custom styles not applying?  
**A:** Make sure styles are global or use `::ng-deep` if ViewEncapsulation is enabled.

**Q:** Drag-and-drop not working?  
**A:** Verify no parent elements are intercepting drag events.

**Q:** Large image not compressing enough?  
**A:** Adjust `initialQuality` or `maxWidthOrHeight` in `compressionOptions`.

---

## 📄 License

MIT License © 2025 Osman.  
Contributions are welcome! Open an issue or PR on [GitHub](https://github.com/osmanabdelsalam/ngx-image-upload). 🚀
