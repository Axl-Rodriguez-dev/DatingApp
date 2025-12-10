import { Component, inject } from '@angular/core';
import { Nav } from '../layout/nav/nav';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  protected router = inject(Router);
}
