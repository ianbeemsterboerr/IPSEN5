import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FifaEliminationComponent } from './fifa-elimination.component';

describe('FifaEliminationComponent', () => {
  let component: FifaEliminationComponent;
  let fixture: ComponentFixture<FifaEliminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FifaEliminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FifaEliminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
