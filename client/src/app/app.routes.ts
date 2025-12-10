import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../features/home/home').then((m) => m.Home),
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'members',
        loadComponent: () =>
          import('../features/members/member-list/member-list').then((m) => m.MemberList),
        canActivate: [authGuard],
      },
      {
        path: 'members/:id',
        loadComponent: () =>
          import('../features/members/member-detailed/member-detailed').then(
            (m) => m.MemberDetailed
          ),
      },
      {
        path: 'lists',
        loadComponent: () => import('../features/lists/lists').then((m) => m.Lists),
      },
      {
        path: 'messages',
        loadComponent: () => import('../features/messages/messages').then((m) => m.Messages),
      },
    ],
  },

  {
    path: '**',
    loadComponent: () => import('../features/home/home').then((m) => m.Home),
  },
];
