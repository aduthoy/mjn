import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebasControlesComponent } from './pruebas-controles.component';

describe('PruebasControlesComponent', () => {
  let component: PruebasControlesComponent;
  let fixture: ComponentFixture<PruebasControlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebasControlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebasControlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
