import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ProductService } from '../products/product.service'
import { FormBuilder } from '@angular/forms'
import { SuccessEnum } from '../Shared/models'

@Component({
  selector: 'app-product',
  templateUrl: './add-product.component.html'
})
export class AddProductComponent implements OnInit {
  productresponse:any;
  

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private ProductService:ProductService){}

  productform:FormGroup=new FormGroup({});

  ngOnInit(): void {
       this.productform = this.formBuilder.group({
        productName: [undefined],
        description:[undefined],
        price:[undefined],
        imageUrl:[undefined],
        productTypeId:["699e02d4-f788-4117-b74b-040019aaec0a"]
      })

  }
  onSubmit():void {
    console.log(this.productform.value);
    this.ProductService.addproduct(this.productform.value).subscribe(
        (productresponse) => {
            this.productresponse = productresponse;
            if (this.productresponse.message === SuccessEnum.message) {
                this.router.navigate(['']);
            }
            else {
                this.router.navigate(['/addproduct']);
            }
        }
    )
  }
}