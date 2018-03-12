import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelcapgenAreaspuestosComponent } from './relcapgen-areaspuestos.component';

describe('RelcapgenAreaspuestosComponent', () => {
  let component: RelcapgenAreaspuestosComponent;
  let fixture: ComponentFixture<RelcapgenAreaspuestosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelcapgenAreaspuestosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelcapgenAreaspuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
