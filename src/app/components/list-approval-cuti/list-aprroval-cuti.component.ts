import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CutiService } from '../../services/list-approval-cuti.service';
import { AuthService } from '../../services/auth.service';

import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-approval-cuti',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './list-approval-cuti.component.html',
  styleUrls: ['./list-approval-cuti.component.css'],
  providers: [DatePipe],
})
export class ListApprovalCutiComponent implements OnInit {
  filterForm: FormGroup;
  listCuti: any[] = [];

  constructor(
    private fb: FormBuilder,
    private cutiService: CutiService,
    private authService: AuthService
  ) {
    const today = new Date().toISOString().split('T')[0];

    this.filterForm = this.fb.group({
      keyword: [''],
      start: [today],
      end: [today],
      companyId: [0],
      employeeId: [0],
      status: ['All'],
      pageSize: [10],
      pageNumber: [1],
    });
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    const today = new Date().toISOString().split('T')[0];

    if (userData) {
      const parsedUser = JSON.parse(userData);
      console.log('✅ userData ditemukan:', parsedUser);

      this.authService
        .getUserInfo(parsedUser.userName)
        .subscribe((res: any) => {
          console.log('📥 Data user info:', res);

          this.filterForm.patchValue({
            start: '2025-07-01',
            end: '2025-07-31',
            companyId: res.companyId,
            employeeId: res.id,
            status: 'All',
          });
          this.getListCuti();
        });
    } else {
      this.getListCuti();
    }
  }

  getListCuti(): void {
    const raw = this.filterForm.value;

    const start = new Date(raw.start + 'T00:00:00').toISOString();
    const end = new Date(raw.end + 'T23:59:59').toISOString();

    const body: any = {
      ...raw,
      start,
      end,
      status: raw.status === 'All' || raw.status === null ? '' : raw.status,
    };

    if (raw.status !== 'All' && raw.status !== '') {
      body.status = raw.status;
    }

    console.log('📤 Mengirim filter:', body);

    this.cutiService.getRiwayatCuti(body).subscribe({
      next: (res: any) => {
        console.log('📥 Response:', res);
        this.listCuti = res || [];

        console.log('✅ Data listCuti:', this.listCuti);
      },
      error: (err) => {
        console.error('❌ Error:', err);
      },
    });
  }

  resetForm(): void {
    const today = new Date().toISOString().split('T')[0];
    this.filterForm.patchValue({
      keyword: '',
      start: today,
      end: today,
      status: 'All',
    });
    this.getListCuti();
  }

  setStatus(status: string): void {
    this.filterForm.patchValue({ status });
    this.getListCuti();
  }
}
