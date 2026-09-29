import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly mode = signal<ThemeMode>('dark');

  constructor() {
    const saved = (localStorage.getItem('theme') as ThemeMode | null) ?? 'dark';
    this.setMode(saved, false);
  }

  toggle(): void {
    this.setMode(this.mode() === 'light' ? 'dark' : 'light');
  }

  setMode(mode: ThemeMode, persist = true): void {
    this.mode.set(mode);
    document.body.classList.toggle('light-mode', mode === 'light');
    if (persist) localStorage.setItem('theme', mode);
  }
}
