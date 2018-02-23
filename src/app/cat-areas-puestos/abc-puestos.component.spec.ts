import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcPuestosComponent } from './abc-puestos.component';

describe('AbcPuestosComponent', () => {
  let component: AbcPuestosComponent;
  let fixture: ComponentFixture<AbcPuestosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbcPuestosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbcPuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
