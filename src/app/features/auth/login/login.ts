import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin(): void {
    if (!this.username.trim()) return;
    this.auth.login(this.username.trim());
    this.router.navigate(['/admin']);
  }
}
