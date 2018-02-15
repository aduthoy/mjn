import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgCapGeneralComponent } from './cfg-cap-general.component';

describe('CfgCapGeneralComponent', () => {
  let component: CfgCapGeneralComponent;
  let fixture: ComponentFixture<CfgCapGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgCapGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgCapGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
