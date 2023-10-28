import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { IProfile } from 'src/app/interfaces/profile';
import { endpoints } from 'src/app/lib/endpoints';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private profile = new BehaviorSubject<IProfile | null>(null);
  profile$: Observable<IProfile | null> = this.profile.asObservable();

  constructor(private http: HttpClient) {}

  getProfile(): Observable<IProfile> {
    return this.http
      .get<IProfile>(`${environment.apiUrl}${endpoints.profile}`)
      .pipe(
        tap((profile) => this.profile.next(profile)),
        shareReplay()
      );
  }
}
