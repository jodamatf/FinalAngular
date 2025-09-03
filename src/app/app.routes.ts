import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users' },
  {
    path: 'users',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/users/pages/users-list/users-list.component')
            .then(m => m.UsersListComponent)
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./features/users/pages/user-create/user-create.component')
            .then(m => m.UserCreateComponent)
      }
    ]
  },
  { path: '**', redirectTo: 'users' }
];
