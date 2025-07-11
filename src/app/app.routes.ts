import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormAbsenManualComponent } from './components/form-absen-manual/form-absen-manual.component';
import { FormPengajuanCutiComponent } from './components/form-pengajuan-cuti/form-pengajuan-cuti.component';
import { ListApprovalCutiComponent } from './components/list-approval-cuti/list-aprroval-cuti.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'form-absen-manual',
    component: FormAbsenManualComponent,
    canActivate: [authGuard],
  },
  {
    path: 'form-pengajuan-cuti',
    component: FormPengajuanCutiComponent,
    canActivate: [authGuard],
  },
  {
    path: 'list-approval-cuti',
    component: ListApprovalCutiComponent,
    canActivate: [authGuard],
  },
];
