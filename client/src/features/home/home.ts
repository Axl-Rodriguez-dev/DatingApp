import { Component, Input, signal } from '@angular/core';
import { Register } from '../account/register/register';
import { Members } from '../../types/user';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
})
export class Home {
  protected registerMode = signal(false);

  showRegister(value: boolean) {
    this.registerMode.set(value);
  }
}
