import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector:'product-detail',
    templateUrl:'./product-detail.component.html',
    styleUrls:['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
    pageTitle: string ='Product Detail';
    product!:IProduct;


    constructor(private route:ActivatedRoute,
                private router:Router,
                private ProductService:ProductService) { }

    productDetail(pid:any){
        this.ProductService.getProductByid(pid).subscribe({
            next:(product)=>{
                this.product=product;
                console.log("Getting Product detail",this.product);
            }
        })
    }
    ngOnInit(): void {
        const id =this.route.snapshot.paramMap.get('id');
        this.productDetail(id);
        
    }
}