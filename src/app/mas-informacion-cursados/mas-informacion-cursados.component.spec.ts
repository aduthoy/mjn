import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasInformacionCursadosComponent } from './mas-informacion-cursados.component';

describe('MasInformacionCursadosComponent', () => {
  let component: MasInformacionCursadosComponent;
  let fixture: ComponentFixture<MasInformacionCursadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasInformacionCursadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasInformacionCursadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
