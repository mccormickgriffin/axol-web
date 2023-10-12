import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CallbackComponent } from './callback.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

describe('CallbackComponent', () => {
  let component: CallbackComponent;
  let fixture: ComponentFixture<CallbackComponent>;
  let authService: AuthService;
  let router: Router;

  // Mock ActivatedRoute with a dummy query parameter
  const fakeActivatedRoute = {
    snapshot: {
      queryParams: {
        code: 'dummy-code',
      },
    },
  };

  // Mock AuthService and Router
  const authServiceMock = {
    login: jasmine.createSpy('login'),
  };
  const routerMock = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallbackComponent],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CallbackComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.login with the code from the query parameters', () => {
    authServiceMock.login.and.returnValue(of(true));
    component.ngOnInit();
    expect(authService.login).toHaveBeenCalledWith('dummy-code');
  });

  it('should navigate to the dashboard on successful login', () => {
    authServiceMock.login.and.returnValue(of(true));
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should navigate to the login page on login error', () => {
    authServiceMock.login.and.returnValue(of(null)); // Simulate login error
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
