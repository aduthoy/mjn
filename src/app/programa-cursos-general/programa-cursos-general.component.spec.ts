import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaCursosGeneralComponent } from './programa-cursos-general.component';

describe('ProgramaCursosGeneralComponent', () => {
  let component: ProgramaCursosGeneralComponent;
  let fixture: ComponentFixture<ProgramaCursosGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramaCursosGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramaCursosGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
