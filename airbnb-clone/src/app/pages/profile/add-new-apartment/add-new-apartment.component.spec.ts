import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewApartmentComponent } from './add-new-apartment.component';

describe('AddNewApartmentComponent', () => {
  let component: AddNewApartmentComponent;
  let fixture: ComponentFixture<AddNewApartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewApartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewApartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
