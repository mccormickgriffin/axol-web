import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { endpoints } from 'src/app/lib/endpoints';
import { token } from 'src/app/lib/consts';
import { ILoginResponse } from 'src/app/interfaces/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  login(spotifyCode: string): Observable<boolean> {
    return this.http.post<ILoginResponse>(
      `${environment.apiUrl}${endpoints.login}`,
      { code: spotifyCode }
    ).pipe(
      map(result => {
        this.localStorageService.setItem(token, result.token);
        return true;
      })
    );
  }

  logout(): void {
    this.localStorageService.removeItem(token);
  }

  public get loggedIn(): boolean {
    return (this.localStorageService.getItem(token) !== null);
  }
}
