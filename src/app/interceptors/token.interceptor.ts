import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("token")

  if(req.url.includes("/AGeneral/Login")) {
    return next(req)
  }

  const newReq = req.clone({
    setHeaders:{
      Authorization:`Bearer ${token}`
    }
  })
  return next(newReq);
};
