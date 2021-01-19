import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDespesaComponent } from './form-despesa.component';

describe('FormDespesaComponent', () => {
  let component: FormDespesaComponent;
  let fixture: ComponentFixture<FormDespesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDespesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDespesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
