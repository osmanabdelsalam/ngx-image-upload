import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxImageUploadPreviewComponent } from './ngx-image-upload-preview.component';

describe('NgxImageUploadPreviewComponent', () => {
  let component: NgxImageUploadPreviewComponent;
  let fixture: ComponentFixture<NgxImageUploadPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxImageUploadPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxImageUploadPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
