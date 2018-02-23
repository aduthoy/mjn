import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatAreasPuestosComponent } from './cat-areas-puestos.component';

describe('CatAreasPuestosComponent', () => {
  let component: CatAreasPuestosComponent;
  let fixture: ComponentFixture<CatAreasPuestosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatAreasPuestosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatAreasPuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
