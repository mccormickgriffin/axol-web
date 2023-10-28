import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CallbackComponent } from './components/callback/callback.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { ProfileNavComponent } from './components/profile-nav/profile-nav.component';
import { JwtModule } from '@auth0/angular-jwt';
import { token } from './lib/consts';
import { environment } from 'src/environments/environment';
import { endpoints } from './lib/endpoints';
import { LocalStorageService } from './services/local-storage/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CallbackComponent,
    DashboardComponent,
    TopNavComponent,
    ProfileNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          const localStorageService = new LocalStorageService();
          return localStorageService.getItem(token);
        },
        allowedDomains: [environment.apiDomain],
        disallowedRoutes: [`${environment.apiUrl}${endpoints.login}`],
      }
    }),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
