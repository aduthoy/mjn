import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmPersonalComponent } from './adm-personal.component';

describe('AdmPersonalComponent', () => {
  let component: AdmPersonalComponent;
  let fixture: ComponentFixture<AdmPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
