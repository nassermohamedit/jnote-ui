import { Routes } from '@angular/router';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { CreateModuleComponent } from './components/create-module/create-module.component';
import { LoginComponent } from './components/login/login.component';
import { ModuleGridComponent } from './components/module-grid/module-grid.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';
import { unauthGuard } from './guards/unauth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/modules',
        pathMatch: 'full'
    },
    {
        path: 'modules',
        component: ModuleGridComponent,
        canActivate: [authGuard]
    },
    {
        path: 'create-module',
        component: CreateModuleComponent,
        canActivate: [authGuard]
    },
    {
        path: 'module/:moduleId',
        component: NoteListComponent,
        canActivate: [authGuard]
    },
    {
        path: 'add-note/to/:moduleId',
        component: AddNoteComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [unauthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [unauthGuard]
    },
    {
        path: '**',
        redirectTo: '/'
    }
];
