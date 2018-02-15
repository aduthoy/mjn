import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmCapEspecificaComponent } from './frm-cap-especifica.component';

describe('FrmCapEspecificaComponent', () => {
  let component: FrmCapEspecificaComponent;
  let fixture: ComponentFixture<FrmCapEspecificaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmCapEspecificaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmCapEspecificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
