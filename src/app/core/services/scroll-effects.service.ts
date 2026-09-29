import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollEffectsService {
  readonly scrolled = signal(false);
  readonly progress = signal(0);
  readonly showBackToTop = signal(false);
  readonly activeSection = signal('home');

  onWindowScroll(sectionIds: string[] = []): void {
    const doc = document.documentElement;

    this.scrolled.set(window.scrollY > 60);

    const max = doc.scrollHeight - doc.clientHeight;
    this.progress.set(max > 0 ? (doc.scrollTop / max) * 100 : 0);

    this.showBackToTop.set(window.scrollY > 400);

    let current = this.activeSection();
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 150) current = id;
    }
    this.activeSection.set(current);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
