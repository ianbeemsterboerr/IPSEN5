import { HttpModule } from '@angular/http';
import { ApiService } from './../shared/api.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppModule } from './../app.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent,
       ],
       imports: [ FormsModule, RouterModule, HttpModule ],
       providers: [ApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log in and out', () => {
    spyOn(component, 'login').and.callFake(function(username, password) {
      localStorage.setItem('activeUserId', '10');
      localStorage.setItem('bearer', 'fakebearer');
    });

    expect(localStorage.getItem('activeUserId')).toBeNull();
    expect(localStorage.getItem('bearer')).toBeNull();

    component.login('testuser', 'password');

    expect(localStorage.getItem('activeUserId')).not.toBe(null);
    expect(localStorage.getItem('bearer')).not.toBe(null);

    component.logout();

    expect(localStorage.getItem('activeUserId')).toBeNull();
    expect(localStorage.getItem('bearer')).toBeNull();
  });
});
