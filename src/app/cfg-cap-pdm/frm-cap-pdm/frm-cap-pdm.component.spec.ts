import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmCapPdmComponent } from './frm-cap-pdm.component';

describe('FrmCapPdmComponent', () => {
  let component: FrmCapPdmComponent;
  let fixture: ComponentFixture<FrmCapPdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmCapPdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmCapPdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
