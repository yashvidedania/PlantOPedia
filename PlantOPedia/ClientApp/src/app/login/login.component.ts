import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
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
        this.loginresponce = loginresponse;
        console.log("Responce from api" , this.loginresponce);
        if (this.loginresponce == "Success") {
          debugger
          this.router.navigate(['']);
        }
        else {
          debugger
          this.router.navigate(['/login']);
        }
      },
      (errorResponce) => {
        alert(errorResponce);
      }
    )
  }




}
