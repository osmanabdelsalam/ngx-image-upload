# ngx-image-upload

🚀 A lightweight, customizable Angular library for image uploads with preview, validation, and smooth animations.\
Supports **Reactive Forms** and `ngTemplate` for full flexibility.

---

## ✨ Features

- 📷 **Image Upload & Preview**
- ✅ **File Size & MIME Type Validation**
- 🎨 **Customizable with CSS Variables**
- 👜 **Supports Reactive Forms (**`FormControl` / `FormGroup`**)**
- 💻 **ngTemplate Support for Custom UI**
- ⚡ **Smooth Animations & Drag-and-Drop Support**

---

## 🚀 Installation

```sh
npm i ngx-image-upload-preview
```

---

## 📌 Usage

### **1️⃣ Basic Usage**

Simply add `ngx-image-upload` inside your Angular form:

```html
<form [formGroup]="form">
  <ngx-image-upload formControlName="image1"></ngx-image-upload>
  <ngx-image-upload formControlName="image2"></ngx-image-upload>
</form>
```

### **2️⃣ Component Code**

```ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      image1: [null],
      image2: [null]
    });
  }
}
```

---

## 🎨 Customization

You can customize styles using **CSS variables**:

```scss
ngx-image-upload {
  --primary-color: #ff9800;
  --border-radius: 6px;
  --text-color: #333;
}
```

| Variable             | Default   | Description                     |
| -------------------- | --------- | ------------------------------- |
| `--primary-color`    | `#007bff` | Primary color (border, buttons) |
| `--error-color`      | `red`     | Error messages color            |
| `--border-radius`    | `10px`    | Border radius of upload box     |
| `--transition-speed` | `0.3s`    | Animation speed                 |

---

## 🎭 **Using **`ngTemplate`** for Custom UI**

If you need **custom UI**, use an `ng-template` inside `ngx-image-upload`:

```html
<ngx-image-upload formControlName="profileImage">
  <ng-template #customPreview let-file>
    <div class="custom-preview">
      <img [src]="file | imagePreview" />
      <span>{{ file.name }}</span>
    </div>
  </ng-template>
</ngx-image-upload>
```

---

## 🌟 Validation (File Size & MIME Type)

To restrict uploads to **JPEG/PNG** and a **max file size of 2MB**, set these properties:

```html
<ngx-image-upload
  formControlName="profileImage"
  [maxFileSize]="2 * 1024 * 1024"
  [allowedMimeTypes]="['image/jpeg', 'image/png']">
</ngx-image-upload>
```

---

## 📦 **API Reference**

| Input              | Type               | Description                   |
| ------------------ | ------------------ | ----------------------------- |
| `formControlName`  | `string`           | Reactive Form control name    |
| `maxFileSize`      | `number`           | Max allowed file size (bytes) |
| `allowedMimeTypes` | `string[]`         | Allowed MIME types            |
| `customTemplate`   | `TemplateRef<any>` | Custom preview template       |

---

## 🐝 **License**

MIT License © 2025 Osman (Oko).

Contributions are welcome! Feel free to open an issue or PR on [GitHub](https://github.com/osmanabdelsalam/ngx-image-upload). 🚀
