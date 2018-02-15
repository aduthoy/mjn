import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfgCapEspecificaComponent } from './cfg-cap-especifica.component';

describe('CfgCapEspecificaComponent', () => {
  let component: CfgCapEspecificaComponent;
  let fixture: ComponentFixture<CfgCapEspecificaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfgCapEspecificaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfgCapEspecificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
