import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IProfile } from 'src/app/interfaces/profile';
import { routes } from 'src/app/lib/routes';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.scss']
})
export class ProfileNavComponent {
  @ViewChild('profileContainer') profileContainer!: ElementRef;

  profile: IProfile | null = null;
  showDropdown = false;

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.userService.profile$.subscribe(profile => {
      this.profile = profile;
    });
    document.addEventListener('click', this.offClickHandler.bind(this));
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([routes.login]);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  offClickHandler(event: Event) {
    if (!this.profileContainer.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }
}
