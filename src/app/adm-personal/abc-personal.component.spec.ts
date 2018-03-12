import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcPersonalComponent } from './abc-personal.component';

describe('AbcPersonalComponent', () => {
  let component: AbcPersonalComponent;
  let fixture: ComponentFixture<AbcPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbcPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbcPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
