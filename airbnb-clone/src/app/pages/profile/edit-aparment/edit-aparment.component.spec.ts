import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAparmentComponent } from './edit-aparment.component';

describe('EditAparmentComponent', () => {
  let component: EditAparmentComponent;
  let fixture: ComponentFixture<EditAparmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAparmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAparmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
