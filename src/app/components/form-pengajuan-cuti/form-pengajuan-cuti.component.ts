import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { formPengajuanCutiService } from '../../services/form-pengajuan-cuti.service';

@Component({
  selector: 'app-leave-form',
  standalone: true,
  templateUrl: './form-pengajuan-cuti.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./form-pengajuan-cuti.component.css']
})
export class FormPengajuanCutiComponent implements OnInit {
  user: any = {};
  jenisCuti: any[] = [];
  selectedJenis: number = 0;
  suratDokterFile: File | null = null;
  tanggalRange: { start: string; end: string } = { start: '', end: '' };
  interval = 0;
  formErrorMessage: string = '';

  constructor(private cutiService: formPengajuanCutiService) {}

  ngOnInit(): void {
    this.cutiService.getEmployee().subscribe({
      next: (data) => this.user = data
    });

    this.cutiService.getJenisCuti().subscribe({
      next: (data) => {
        this.jenisCuti = data;
        console.log('Jenis cuti:', data);
      }
    });
  }

  onFileChange(event: any) {
    this.suratDokterFile = event.target.files[0];
  }

  hitungInterval() {
    if (this.tanggalRange.start && this.tanggalRange.end) {
      const start = new Date(this.tanggalRange.start);
      const end = new Date(this.tanggalRange.end);
      const diffTime = end.getTime() - start.getTime();
      this.interval = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
  }

  formatToIsoDate(date: string): string {
    return new Date(date).toISOString();
  }

  onSubmit(form: NgForm) {
    this.formErrorMessage = ''; 

    if (form.invalid || !this.tanggalRange.start || !this.tanggalRange.end || this.interval <= 0) {
      this.formErrorMessage = 'Data tidak valid. Pastikan tanggal dan jenis cuti diisi.';
      return;
    }

    if (this.selectedJenis == 3 && this.suratDokterFile) {
      const formData = new FormData();
      formData.append('companyId', this.user.companyId);
      formData.append('officeId', this.user.officeid);
      formData.append('employeeId', this.user.id);
      formData.append('cutiStart', this.formatToIsoDate(this.tanggalRange.start));
      formData.append('cutiEnd', this.formatToIsoDate(this.tanggalRange.end));
      formData.append('interval', this.interval.toString());
      formData.append('jenis', this.selectedJenis.toString());
      formData.append('keterangan', form.value.keterangan || '');
      formData.append('file', this.suratDokterFile);

      this.cutiService.ajukanCuti(formData).subscribe({
        next: () => alert('Cuti berhasil diajukan!'),
        error: (err) => alert('Gagal mengajukan cuti!\n' + err.message)
      });

    } else {
      const body = {
        companyId: this.user.companyId,
        officeId: this.user.officeid,
        employeeId: this.user.id,
        cutiStart: this.formatToIsoDate(this.tanggalRange.start),
        cutiEnd: this.formatToIsoDate(this.tanggalRange.end),
        interval: this.interval,
        jenis: Number(this.selectedJenis),
        keterangan: form.value.keterangan || ''
      };

      this.cutiService.ajukanCuti(body).subscribe({
        next: () => alert('Cuti berhasil diajukan!'),
        error: (err) => alert('Gagal mengajukan cuti!\n' + err.message)
      });
    }
  }
}
