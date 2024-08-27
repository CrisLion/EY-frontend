import { Component, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { UserApiService } from '../../services/user-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  user: User = new User();
  readonly usernameControl = new FormControl('', [Validators.required]);
  readonly passwordControl = new FormControl('', [Validators.required])
  hide = signal(true);
  errorMessage = signal('');

  constructor(private userApiService: UserApiService, private snackBar: MatSnackBar, private router: Router) {
    
  }
  
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  updateUsernameErrorMessage(){
    if (this.usernameControl.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else {
      this.errorMessage.set('');
    }
  }

  updatePasswordErrorMessage() {
    if (this.passwordControl.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else {
      this.errorMessage.set('');
    }
  }

  registerUser(){
    this.userApiService.registerUser(this.user).subscribe(
      response => {
        console.log('Usuario registrado con éxito', response);
        this.registerUserStatusMessage('User created successfully')
        this.router.navigate(['/login'])
      },
      error => {
        if (error.status == 409){
          this.registerUserStatusMessage('Username already exist')
        } else {
          this.registerUserStatusMessage('Incorrect username or password')
        }  
      }
    )
  }

  registerUserStatusMessage(message: string){
    this.snackBar.open(message, '', { duration: 5000, verticalPosition: 'bottom', horizontalPosition: 'center' })
  }

}

