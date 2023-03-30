import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signinForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });

    this.auth.errorEmitter.subscribe((error: string) => {
      this.errorMessage = error;
    });
  }

  onLogin() {
    this.auth.login(this.signinForm.value);
  }
}
