import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmCapGeneralComponent } from './frm-cap-general.component';

describe('FrmCapGeneralComponent', () => {
  let component: FrmCapGeneralComponent;
  let fixture: ComponentFixture<FrmCapGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmCapGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmCapGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
