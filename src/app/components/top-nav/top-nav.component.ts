import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent {
  loggedIn: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(private authService: AuthService, private router: Router) {
    this.router.events
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => (this.loggedIn = this.authService.loggedIn));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
