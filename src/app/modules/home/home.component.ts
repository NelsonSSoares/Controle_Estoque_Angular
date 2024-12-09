
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthRequest } from 'src/app/models/interfaces/auth/AuthRequest';
import { SignUpUserResponse } from 'src/app/models/interfaces/SignUpUserResponse';
import { SignUpUserResquest } from 'src/app/models/interfaces/SignUpUserResquest';
import { UserService} from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService
   ) { }

  onSubmitLoginForm():void {
    if(this.loginForm.value && this.loginForm.valid){
     this.userService.authUser(this.loginForm.value as AuthRequest)
     .subscribe({
        next: (response)=>{
          if(response){
            this.cookieService.set('token', response?.token);
            alert('Usuário logado com sucesso!');
            this.loginForm.reset();
          }

        },
        error: (error)=>{
          console.log('ERRO AO LOGAR USUÁRIO', error);
        }
     })
    }
  }

  onSubmitSignupForm():void {
   if(this.signupForm.value && this.signupForm.valid){
    this.userService.signupUser(this.signupForm.value as SignUpUserResquest)
    .subscribe({
      next: (response)=>{
        if(response){
          alert('Usuário cadastrado com sucesso!');
        }
        this.signupForm.reset();
        this.loginCard = true;
      },
      error: (error)=>{
       console.log('ERRO AO CADASTRAR USUÁRIO', error);

      }
    });
   }
  }


}
