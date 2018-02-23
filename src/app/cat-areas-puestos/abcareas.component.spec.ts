import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcareasComponent } from './abcareas.component';

describe('AbcareasComponent', () => {
  let component: AbcareasComponent;
  let fixture: ComponentFixture<AbcareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbcareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbcareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
