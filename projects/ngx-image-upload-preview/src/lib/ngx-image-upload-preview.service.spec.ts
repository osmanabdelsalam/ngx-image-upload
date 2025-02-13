import { TestBed } from '@angular/core/testing';

import { NgxImageUploadPreviewService } from './ngx-image-upload-preview.service';

describe('NgxImageUploadPreviewService', () => {
  let service: NgxImageUploadPreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxImageUploadPreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
