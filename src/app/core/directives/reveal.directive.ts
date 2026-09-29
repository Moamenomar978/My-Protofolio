import { AfterViewInit, Directive, ElementRef, HostBinding, Input, OnDestroy } from '@angular/core';

/**
 * Usage: <div appReveal [revealDelay]="2" revealDirection="left">...</div>
 * Adds "reveal" / "reveal-left" / "reveal-right" plus "revealed" once the
 * element scrolls into the viewport, mirroring the original script.js
 * IntersectionObserver-based scroll reveal.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  @Input() revealDirection: 'up' | 'left' | 'right' = 'up';
  @Input() revealDelay: number | null = null;

  @HostBinding('class.reveal') get isUp() { return this.revealDirection === 'up'; }
  @HostBinding('class.reveal-left') get isLeft() { return this.revealDirection === 'left'; }
  @HostBinding('class.reveal-right') get isRight() { return this.revealDirection === 'right'; }
  @HostBinding('attr.data-delay') get delay() { return this.revealDelay; }

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
