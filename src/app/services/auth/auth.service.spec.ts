import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/app/lib/endpoints';
import { token } from 'src/app/lib/consts';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, LocalStorageService],
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    localStorageService = TestBed.inject(LocalStorageService);
  });

  afterEach(() => {
    // Ensure that there are no outstanding HTTP requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should log in a user', () => {
    const mockToken = 'mock-token';
    const spotifyCode = 'mock-code';

    authService.login(spotifyCode).subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}${endpoints.login}`);
    expect(req.request.method).toBe('POST');
    req.flush({ token: mockToken });

    // Verify that the token was stored in local storage
    expect(localStorageService.getItem(token)).toBe(mockToken);
  });

  it('should log out a user', () => {
    localStorageService.setItem(token, 'mock-token');
    authService.logout();

    // Verify that the token was removed from local storage
    expect(localStorageService.getItem(token)).toBeNull();
  });

  it('should determine if a user is logged in', () => {
    // User is logged in if the token is present in local storage
    localStorageService.setItem(token, 'mock-token');
    expect(authService.loggedIn).toBeTruthy();

    // User is not logged in if the token is not present in local storage
    localStorageService.removeItem(token);
    expect(authService.loggedIn).toBeFalsy();
  });
});