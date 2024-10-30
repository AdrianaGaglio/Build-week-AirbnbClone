import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextReviewComponent } from './text-review.component';

describe('TextReviewComponent', () => {
  let component: TextReviewComponent;
  let fixture: ComponentFixture<TextReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
