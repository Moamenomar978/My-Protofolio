import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollEffectsService } from '../../core/services/scroll-effects.service';
import { ThemeService } from '../../core/services/theme.service';

const HOME_SECTION_IDS = ['home', 'about', 'skills', 'projects', 'contact'];

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  /** Set to true on the home page so in-page anchor links + scrollspy work. */
  @Input() isHomePage = false;
  /** Which top-level page is active, for non-anchor nav items (services / cv). */
  @Input() activePage: 'home' | 'services' | 'cv' = 'home';

  menuOpen = false;

  constructor(public theme: ThemeService, public scrollFx: ScrollEffectsService) {}

  ngOnInit(): void {
    this.scrollFx.onWindowScroll(this.isHomePage ? HOME_SECTION_IDS : []);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrollFx.onWindowScroll(this.isHomePage ? HOME_SECTION_IDS : []);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  isAnchorActive(section: string): boolean {
    return this.isHomePage && this.scrollFx.activeSection() === section;
  }
}
