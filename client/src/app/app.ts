import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected readonly title = signal('client');
  protected members = signal<any[]>([]);

  async ngOnInit() {
    this.members.set((await this.getMembers()) as any[]);
  }

  async getMembers() {
    try {
      return await lastValueFrom(this.http.get('https://localhost:5001/api/members'));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
