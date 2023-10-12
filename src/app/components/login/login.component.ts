import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authorizeLink: string = 'https://accounts.spotify.com/authorize' +
                          '?client_id=' + environment.clientId +
                          '&response_type=code' +
                          '&redirect_uri=' + environment.redirectUri +
                          '&scope=' + environment.scopes +
                          '&show_dialog=true';
}
