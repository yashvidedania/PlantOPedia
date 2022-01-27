import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {catchError,tap} from 'rxjs/operators';
import { IProduct } from "./product";

@Injectable({
    providedIn:'root'
})
export class ProductService{
  private productUrl = 'https://localhost:7258/api/product';

  constructor(private http:HttpClient){}

    getProducts() : Observable <IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl)
    }
    
}