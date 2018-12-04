import { TestBed, getTestBed } from '@angular/core/testing';

import { LoginService, User } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('LoginService', () => {
  let injector: TestBed;
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService],
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    service = injector.get(LoginService);
    httpMock = injector.get(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });

  it('should authenticate user', () => {
    const dummyUser: User = {
      username: 'test',
      password: 'test'
    }

    service.authenticate(dummyUser).subscribe(result => {
      expect(Array.isArray(result.roles)).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.LOGIN_URL}`);
    expect(req.request.url).toBe(`${environment.LOGIN_URL}`);
    expect(req.request.method).toBe("POST");

    req.flush({
      roles: ['ADMIN', 'USER']
    });
  });

  it('should fail on incorrect username and password', () => {
    const mockErrorResponse = {
      status: 401, statusText: 'Bad Request'
    };

    service.authenticate(null).subscribe(() => {}, err => {
      expect(err).toContain('Something bad happened');
    });
    
    const req = httpMock.expectOne(`${environment.LOGIN_URL}`);
    req.flush(null, mockErrorResponse)
  });

  
});
