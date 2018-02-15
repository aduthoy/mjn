import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgCapPdmComponent } from './cfg-cap-pdm.component';

describe('CfgCapPdmComponent', () => {
  let component: CfgCapPdmComponent;
  let fixture: ComponentFixture<CfgCapPdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgCapPdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgCapPdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
