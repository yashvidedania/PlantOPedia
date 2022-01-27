import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUser } from "./login";

@Injectable({
  providedIn: "root"
})

export class LoginService {

  private loginUrl: string = "https://localhost:7258/api/login";

  constructor(private http: HttpClient) { }

  checkLogin(loginObj: any): Observable<any> {
    return this.http.post(this.loginUrl, loginObj);
  }
}
