
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { SignUpUserResponse } from 'src/app/models/interfaces/user/SignUpUserResponse';
import { SignUpUserResquest } from 'src/app/models/interfaces/user/SignUpUserResquest';
import { UserService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

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
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router
  ) { }

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
        .subscribe({
          next: (response) => {
            if (response) {
              this.cookieService.set('token', response?.token);
              this.loginForm.reset();
              this.router.navigate(['/dashboard']);

              this.messageService.add({
                severity: 'success',
                summary: 'Logado com sucesso!',
                detail: `Bem vindo ${response?.name}`,
                life: 2000
              });

            }

          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro ao logar!',
              detail: `Email ou senha inválidos`,
              life: 2000
            });
            console.log('ERRO AO LOGAR', error);
          }
        })
    }
  }

  onSubmitSignupForm(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService.signupUser(this.signupForm.value as SignUpUserResquest)
      .pipe(
        takeUntil(this.destroy$)
      )
        .subscribe({
          next: (response) => {
            if (response) {
              alert('Usuário cadastrado com sucesso!');
            }
            this.signupForm.reset();
            this.loginCard = true;
            this.messageService.add({
              severity: 'success',
              summary: 'Usuario criado com sucesso!',
              detail: `Bem vindo ${response?.name}`,
              life: 2000
            });
          },
          error: (error) => {
            console.log('ERRO AO CADASTRAR USUÁRIO', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro ao Criar usuario!',
              detail: `erro ao criar usuario`,
              life: 2000
            });
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
