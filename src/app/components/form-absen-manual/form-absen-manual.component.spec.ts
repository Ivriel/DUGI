import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAbsenManualComponent } from './form-absen-manual.component';

describe('FormAbsenManualComponent', () => {
  let component: FormAbsenManualComponent;
  let fixture: ComponentFixture<FormAbsenManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAbsenManualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAbsenManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
