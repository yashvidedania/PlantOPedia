import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { isNotNullOrUndefine } from "../Shared/methods";
import { SuccessEnum } from "../Shared/models";
import { IUser } from "./login";
import { LoginService } from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  title: string = 'Login';
  // loginresponce: IUser[] = [];
  loginresponce: any;


  loginform : FormGroup = new FormGroup({});
  //   email: new FormControl(''),
  //   password: new FormControl('')
  // });

  constructor(private LoginService: LoginService,
              private router: Router,
              private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email: [undefined, Validators.email],
      password:  [undefined , Validators.maxLength(15)]
    })
  }

  onSubmit(): void {
    console.log(this.loginform.value);
    this.LoginService.checkLogin( this.loginform.value ).subscribe(
      (loginresponse) => {
        if(isNotNullOrUndefine(loginresponse))
        {
          this.loginresponce = loginresponse;
          // console.log("Responce from api" , this.loginresponce);
          if (this.loginresponce.message === SuccessEnum.message ) {
            this.router.navigate(['']);
          }
          else {
            alert("Invalid Email or Password ");
            this.router.navigate(['/login']);
          }
        }
        
      },
      (errorResponce) => {
        alert(errorResponce + "Invalid Email or Password");
      }
    )
  }

  
}

