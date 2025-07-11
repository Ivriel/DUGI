 import { Injectable } from "@angular/core";
 import { HttpClient } from "@angular/common/http";
 import { environment } from "../../environments/environment";
 import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class LocationService {
    private apiUrl:string=environment.apiBase.locationApi

    constructor(private http:HttpClient){}

    getLocations():Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl)
    }
}