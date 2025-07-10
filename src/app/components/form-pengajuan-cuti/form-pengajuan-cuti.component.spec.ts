import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPengajuanCutiComponent } from './form-pengajuan-cuti.component';

describe('FormPengajuanCutiComponent', () => {
  let component: FormPengajuanCutiComponent;
  let fixture: ComponentFixture<FormPengajuanCutiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPengajuanCutiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPengajuanCutiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
