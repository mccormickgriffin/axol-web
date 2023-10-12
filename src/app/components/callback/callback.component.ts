import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/lib/routes';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const code: string = this.route.snapshot.queryParams['code'];
    this.authService.login(code).subscribe({
      next: (response) => {
        console.log("in next, response: ", response);
        if (response) {
          this.router.navigate([routes.dashboard]);
        } else {
          this.router.navigate([routes.login]);
        }
      },
      error:() => {
        this.router.navigate([routes.login]);
      }
  });
  }
}
