import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDespesaComponent } from './list-despesa.component';

describe('ListDespesaComponent', () => {
  let component: ListDespesaComponent;
  let fixture: ComponentFixture<ListDespesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDespesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDespesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
