import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptinviteComponent } from './acceptinvite.component';

describe('AcceptinviteComponent', () => {
  let component: AcceptinviteComponent;
  let fixture: ComponentFixture<AcceptinviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptinviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptinviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
