import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaCalificacionesComponent } from './captura-calificaciones.component';

describe('CapturaCalificacionesComponent', () => {
  let component: CapturaCalificacionesComponent;
  let fixture: ComponentFixture<CapturaCalificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaCalificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaCalificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
