import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  const isLoggedin = localStorage.getItem('token')

  if(isLoggedin) {
    return true
  } else {
    alert("Silahkan login terlebih dahulu")
    router.navigateByUrl("login")
    return false
  }
};
