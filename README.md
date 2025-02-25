# ngx-image-upload

🚀 A feature-rich Angular image upload component with preview, validation, zoom capabilities, and full form integration.

![ngx-image-upload](https://github.com/osmanabdelsalam/ngx-image-upload/blob/main/public/ngx-image-upload.png?raw=true)

---

## ✨ Features

- 📷 **Image Upload & Preview** with drag-and-drop support
- 🔍 **Interactive Preview Modal** with zoom/pan capabilities
- ✅ **Comprehensive Validation** (file type, size, required)
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
* Reactive Forms Example
```HTML
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
  <ngx-image-upload 
    formControlName="avatar"
    [required]="true"
    [maxSizeMB]="5"
    [allowedTypes]="['image/jpeg', 'image/png', 'image/webp']"
    previewTitle="Profile Preview"
    requiredMessage="Please upload a profile photo"
    (fileSelected)="handleFile($event)">
  </ngx-image-upload>
  
  <button type="submit">Save Profile</button>
</form>
```
* Template-driven Forms Example
```HTML
<ngx-image-upload
  [(ngModel)]="user.avatar"
  name="avatar"
  [width]="200"
  [height]="200"
  [defaultImage]="'assets/default-avatar.png'">
</ngx-image-upload>
```
## 🔍 Preview Modal Features
The interactive preview modal includes:
* Zoom In/Out controls (0.5x - 5x)
* Drag-to-Pan functionality when zoomed
* Reset to Default view
* Fullscreen Overlay with blurred backdrop

## 🎨 Customization
```SCSS
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
| Variable             | Default   | Description                     |
| -------------------- | --------- | ------------------------------- |
| `--primary-color`    | `#007bff` | Main accent color               |
| `--secondary-color`  | `#f0f8ff` | Hover background color          |
| `--error-color`      | `red`     | Error messages/borders          |
| `--border-radius`    | `10px`    | Border radius of upload box     |
| `--background-color` | `#f9f9f9` | Upload area background          |
| `--transition-speed` | `0.3s`    | Animation speed                 |

## Content Projection
```HTML
<ngx-image-upload>
  <div #defaultText>
    <i class="upload-icon"></i>
    Click to upload or drag files
  </div>
</ngx-image-upload>
```
## ✅ Validation & Error Handling

Built-in Validations
```HTML
<ngx-image-upload
  [maxSizeMB]="5"
  [allowedTypes]="['image/jpeg', 'image/png']"
  requiredMessage="Image is required">
</ngx-image-upload>
```
### Validation Scenarios
    1. Required Validation - Shows when requiredMessage input passed with message.
    2. File Size Validation - Configurable in MB.
    3. MIME Type Validation - Wildcards not supported yet.
    4. Custom Error Messages - Localize or style as needed.

## 📋 API Reference
### Inputs
| Input               | Type     | Default     | Description                           |
|---------------------|----------|--------------|--------------------------------------|
| requiredMessage     | string   | -         | Marks field as required with provided message |
| maxSizeMB           | number   | 2            | Maximum file size in megabytes       |
| allowedTypes        | string[] | ['image/jpeg', 'image/png']  | Allowed MIME types                   |
| previewTitle        | string   | -            | Title shown in preview modal         |
| showPreviewButton   | boolean  | true         | Toggle preview zoom button           |
| enablePreviewModal  | boolean  | true         | Enable/disable fullscreen preview    |
| defaultImage        | string   | -            | Fallback image for errors            |
| previewButtonLabel  | string   | View full size | Preview Button Label               |
| width               | number   | 150          | Preview container width              |
| height              | number   | 150          | Preview container height             |
| src                 | string   | -            | Default preview image                |

### Outputs
| Output              | Type    | Description           |
----------------------|---------|-----------------------|
| fileSelected        | `File`  | Emits selected file after validation |

## ♿ Accessibility Features
* ARIA Labels for all interactive elements
* Focus States for visual feedback
* Screen Reader optimized:
    * Live error announcements
    * Modal interaction labels
    * Status updates during upload

## 🐞 Troubleshooting
    Q: Preview modal not opening?
    A: Ensure enablePreviewModal isn't set to false and check console for CSP issues with blob URLs
---
    Q: Custom styles not applying?
    A: Make sure your styles are either global or using ::ng-deep (when using ViewEncapsulation)
---
    Q: Drag-and-drop not working?
    A: Verify no parent elements are intercepting drag events
---
# 📄 License
MIT License © 2025 Osman.
Contributions are welcome! Feel free to open an issue or PR on [GitHub](https://github.com/osmanabdelsalam/ngx-image-upload). 🚀
