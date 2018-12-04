import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public auth: LoginService) {
    // Comment out this method call if using
    // hash-based routing
    auth.handleAuthentication();

    // Uncomment this method call if using
    // hash-based routing
    // auth.handleAuthenticationWithHash();
  }
  
}
