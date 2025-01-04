import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrls: ['./toolbar-navigation.component.scss']
})
export class ToolbarNavigationComponent {

  constructor(
    private CookieService: CookieService,
    private router: Router
  ) { }

  logout(): void {
    this.CookieService.delete('token');
    this.router.navigate(['/home']);
  }
}
