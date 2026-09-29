import { Injectable, signal } from '@angular/core';

/**
 * Minimal placeholder auth service so the guard / features/auth/user/admin
 * scaffolding has something real to call. Swap the internals for a real
 * backend (JWT, session cookie, Firebase Auth, etc.) when you build it out.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly loggedIn = signal(!!localStorage.getItem('demo_user'));

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  login(username: string): void {
    localStorage.setItem('demo_user', username);
    this.loggedIn.set(true);
  }

  logout(): void {
    localStorage.removeItem('demo_user');
    this.loggedIn.set(false);
  }

  get currentUser(): string | null {
    return localStorage.getItem('demo_user');
  }
}
