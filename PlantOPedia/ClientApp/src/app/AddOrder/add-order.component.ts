import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { IOrder } from "../orders/order";
import { Orderservice_api } from "../orders/order.service";
import { SuccessEnum } from "../Shared/models";

@Component({
  selector:'app-add',
  templateUrl:'./add-order.component.html'
})
export class AddOrderComponent implements OnInit {

  dateVal = new Date();
  orderresponse: any;
  
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private OrderService_api:Orderservice_api){}

  orderform:FormGroup=new FormGroup({});

  ngOnInit(): void {
       this.orderform = this.formBuilder.group({
        userId: ["074056a6-a87a-4c58-9388-09bedda8824c"],
        productId:["9df46efd-705c-4c7d-f3b7-08d9e18977b0"],
        orderdate:[this.dateVal],
        address:[undefined],
        price: [300],
        productName: ["BeetRoot"]
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
