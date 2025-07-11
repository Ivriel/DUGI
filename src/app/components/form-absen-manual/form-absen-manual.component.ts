import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbsenManualService } from '../../services/absen-manual.service';
import { LocationService } from '../../services/location.service';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-form-absen-manual',
  imports: [FormsModule,CommonModule],
  templateUrl: './form-absen-manual.component.html',
  styleUrl: './form-absen-manual.component.css',
})
export class FormAbsenManualComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private title: Title,
    private absenManualService:AbsenManualService,
    private locationService:LocationService,
    private employeeService:EmployeeService
  ) {
    this.title.setTitle('Form Absen Manual');
  }

  employeeData:any =null;
  locations:any[]=[]
  isLoading:boolean=false;
  currentTime:string = ''
  selectedDate:string = ''
  selectedTime:string = ''
  isTimeTouched:boolean = false // buat update display waktu kalau belum dipilih


  absenManualObj: any = {
    companyId: 0,
    officeId: 0,
    employeeId: 0,
    inOut: '', // masum / keluar (valuenya 'In'/'Out')
    checkInOut: '', // Bisa diinput manual sendiri
    remark: '',
    locationId: '',
    photo: '', // buat sekarang kasih string kosong aja
    latitude: 0,
    longitude: 0,
  };


  ngOnInit(): void {
    this.loadEmployeeData()
    this.loadLocations()
    this.getCurrentLocation()
    this.initiateDateTimeForUpdate()

    this.updateCurrentTime() // buat ngeset waktu sekarang
    setInterval(() => { // biar keupdate setiap detik gausah refresh web
      this.updateCurrentTime()
    }, 1000);

  }

  addAbsenManual(form:NgForm){
    this.absenManualObj.locationId= Number(this.absenManualObj.locationId) // ubah ke number dulu soalnya dari value select selalu string hasilnya 
    this.setAbsenTime() // ubah ke string ISO dulu datenya
    this.isLoading= true

    this.absenManualService.addAbsenManual(this.absenManualObj).subscribe({
      next:()=> {
        alert("Absen manual berhasil tekirim")
        console.log("Payload yang dikirim:", this.absenManualObj);
        this.isLoading = false
        form.resetForm({
          inOut:'', // biar option yang jadi placeholder masih muncul pas udah dikirim isi form nya 
          locationId:''
        })
      },
      error:(err:any)=> {
        alert("Gagal mengirim absen manual")
        console.error("Gagal mengirim absen manual: ",err)
        this.isLoading = false
      }
    })
  }

  loadLocations(){
    this.locationService.getLocations().subscribe({
      next:(res:any[])=> {
        this.locations = res
        console.log(this.locations)
      },
      error:(err:any)=> {
        console.error("Error gtting location: ",err)
      }
    })
  }

  loadEmployeeData(){
    this.employeeService.getEmployeeData().subscribe({
      next:(res:any)=> {
        this.employeeData = res
        this.absenManualObj.companyId = res.companyId
        this.absenManualObj.officeId = res.officeid
        this.absenManualObj.employeeId = res.id
        console.log(this.employeeData)
      },
      error:(err:any)=> {
        console.error("Error getting employee data: ",err)
      }
    })
  }

  getCurrentLocation(){
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position)=> {
          this.absenManualObj.latitude = position.coords.latitude
          this.absenManualObj.longitude = position.coords.longitude
        },
        (error)=> {
          switch(error.code) {
            case error.PERMISSION_DENIED:
              console.error("Izin akses ditolak")
            break;
            case error.POSITION_UNAVAILABLE:
              console.error("Informasi lokasi tidak tersedia")
            break;
            case error.TIMEOUT:
              console.error("Permintaan lokasi melebihi batas waktu")
            break;
            default:
              console.error("Terjadi kesalahan")
          }
        }
      )
    } else {
      alert("Geo location tidak didukung di browser ini")
    }
  }

  updateCurrentTime(){
    const dateTimeNow = new Date()
    this.currentTime = dateTimeNow.toLocaleString('id-ID',{
      year:'numeric',
      month:'2-digit',
      day:'2-digit',
      hour:'2-digit',
      minute:'2-digit',
      second:'2-digit'
    })

    if(!this.isTimeTouched) {
      const hour = String(dateTimeNow.getHours()).padStart(2,'0')
      const minute = String(dateTimeNow.getMinutes()).padStart(2,'0')
      this.selectedTime = `${hour}:${minute}`
    }

  }

  initiateDateTimeForUpdate(){
    const dateTimeNow = new Date()
     // buat set defaultnya di input (jadi kaya placeholder)
     this.selectedDate = dateTimeNow.toISOString().split('T')[0]
     this.selectedTime = dateTimeNow.toTimeString().slice(0,5)
  }

  setAbsenTime() {
  
    if (this.selectedDate && this.selectedTime) {
      const [hour,minute] = this.selectedTime.split(":").map(Number)
      const secondNow = new Date().getSeconds()

      const attendanceDate = new Date(this.selectedDate)
      attendanceDate.setHours(hour,minute,secondNow)

      // formatting manual ke datetime dd:MM/yyyy HH:mm:ss
      const dd = String(attendanceDate.getDate()).padStart(2,'0')
      const MM = String(attendanceDate.getMonth()+1).padStart(2,'0') // plus  1 soalnya bulan dari 0
      const yyyy = attendanceDate.getFullYear()
      const HH = String(attendanceDate.getHours()).padStart(2,'0')
      const mm = String(attendanceDate.getMinutes()).padStart(2,'0')
      const ss = String(attendanceDate.getSeconds()).padStart(2,'0')

      const formattedLocalDatetime = `${dd}/${MM}/${yyyy} ${HH}:${mm}:${ss}`
      this.absenManualObj.checkInOut = formattedLocalDatetime
      console.log("Waktu dikirim ke backend (lokal): ",formattedLocalDatetime)

    } 
  }
  

  logout() {
    const isLogout = confirm('Are you sure you wanna to logout?');
    if (isLogout) {
      this.authService.logout();
      this.router.navigateByUrl('login');
    }
  }


}
