import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcreditaProcedimientosComponent } from './acredita-procedimientos.component';

describe('AcreditaProcedimientosComponent', () => {
  let component: AcreditaProcedimientosComponent;
  let fixture: ComponentFixture<AcreditaProcedimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcreditaProcedimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcreditaProcedimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
