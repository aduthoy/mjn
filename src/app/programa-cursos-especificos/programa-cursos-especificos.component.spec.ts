import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaCursosEspecificosComponent } from './programa-cursos-especificos.component';

describe('ProgramaCursosEspecificosComponent', () => {
  let component: ProgramaCursosEspecificosComponent;
  let fixture: ComponentFixture<ProgramaCursosEspecificosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramaCursosEspecificosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramaCursosEspecificosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
