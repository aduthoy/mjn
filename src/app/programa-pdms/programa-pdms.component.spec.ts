import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaPdmsComponent } from './programa-pdms.component';

describe('ProgramaPdmsComponent', () => {
  let component: ProgramaPdmsComponent;
  let fixture: ComponentFixture<ProgramaPdmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramaPdmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramaPdmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
