import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasInformacionProgramadosComponent } from './mas-informacion-programados.component';

describe('MasInformacionProgramadosComponent', () => {
  let component: MasInformacionProgramadosComponent;
  let fixture: ComponentFixture<MasInformacionProgramadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasInformacionProgramadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasInformacionProgramadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
