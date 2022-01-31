import { Route } from "@angular/compiler/src/core";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Orderservice_api } from "../orders/order.service";
import { IProduct } from "../products/product";
import { ProductService } from "../products/product.service";
import { SuccessEnum } from "../Shared/models";

@Component({
  selector:'app-add',
  templateUrl:'./add-order.component.html'
})
export class AddOrderComponent implements OnInit {

  dateVal = new Date();
  orderresponse: any;
  product!: IProduct; 

  
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private OrderService_api:Orderservice_api,
              private productService: ProductService){}

  orderform:FormGroup=new FormGroup({});

  ngOnInit(): void {

    const productId = this.route.snapshot.paramMap.get('id');

    this.initilizeformgroup();
    this.productDetail(productId);  
  }

  initilizeformgroup() {
    this.orderform = this.formBuilder.group({
     userId: ["074056a6-a87a-4c58-9388-09bedda8824c"],
     productId:[undefined],
     orderdate:[this.dateVal],
     address:[undefined],
     price: [undefined],
     productName: [undefined]
   })
 }


  productDetail(pid: any) {
    this.productService.getProductById(pid).subscribe({
      next: (product) => {
        this.product = product;
        console.log("Product detail method - ", product);
        this.orderform.patchValue({
          productId: this.product.productId,
          productName: this.product.productName,
          price: this.product.price
        })
      }
    })
  }

  onSubmit():void {
      console.log(this.orderform.value);
      this.OrderService_api.addOrder(this.orderform.value).subscribe(
          (orderresponse) => {
              this.orderresponse = orderresponse;
              if (this.orderresponse.message === SuccessEnum.message ) {
                  this.router.navigate(['']);
              }
              else {
                  this.router.navigate(['/addorder']);
              }
          }
      )
  }
  

}
