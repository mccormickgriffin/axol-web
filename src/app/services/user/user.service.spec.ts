import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { IProfile } from 'src/app/interfaces/profile';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/app/lib/endpoints';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get profile', () => {
    const mockProfile: IProfile = { displayName: 'Display Name', imageUrl: 'test.image.url' };

    service.getProfile().subscribe((profile) => {
      expect(profile).toEqual(mockProfile);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${endpoints.profile}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProfile);
  });
});
