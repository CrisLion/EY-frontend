import { Component, signal } from '@angular/core';
import { UserApiService } from '../../services/user-api.service';
import { User } from '../../model/user';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  user: User = new User();
  readonly usernameControl = new FormControl('', [Validators.required]);
  readonly passwordControl = new FormControl('', [Validators.required])
  hide = signal(true);
  errorMessage = signal('');

  constructor(private userApiService: UserApiService, private router: Router, private snackBar: MatSnackBar) {
    
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

  loginUser() {
    this.userApiService.loginUser(this.user).subscribe(
      response => {
        window.localStorage.setItem('token',  response.toString());
        this.loginUserStatusMessage('Successful login')
        this.router.navigate(['/suppliers'])
      },
      error => {
        this.loginUserStatusMessage('Incorrect username or password')
      }
    )
  }

  loginUserStatusMessage(message: string){
    this.snackBar.open(message, '', { duration: 5000, verticalPosition: 'bottom', horizontalPosition: 'center' })
  }

}
