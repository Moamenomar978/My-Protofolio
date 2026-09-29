import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../core/directives/reveal.directive';

interface AboutInfoItem {
  icon: string;
  text: string;
  delay: number;
}

interface AboutCard {
  icon: string;
  title: string;
  text: string;
  delay: number;
}

@Component({
  selector: 'app-about-as',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective],
  templateUrl: './about-as.html',
  styleUrl: './about-as.css',
})
export class AboutAs {
  readonly infoItems: AboutInfoItem[] = [
    { icon: 'fa-solid fa-user', text: 'Moamen Fathy', delay: 2 },
    { icon: 'fa-solid fa-envelope', text: 'moamenfathy279@gmail.com', delay: 3 },
    { icon: 'fa-solid fa-location-dot', text: 'Egypt 🇪🇬', delay: 4 },
    { icon: 'fa-solid fa-graduation-cap', text: 'CS Student', delay: 5 },
  ];

  readonly cards: AboutCard[] = [
    {
      icon: 'fa-solid fa-code',
      title: 'Web Development',
      text: 'Modern, responsive websites built from scratch with HTML, CSS & JS.',
      delay: 1,
    },
    {
      icon: 'fa-solid fa-palette',
      title: 'UI Design',
      text: 'Clean, user-focused interfaces with strong visual hierarchy.',
      delay: 2,
    },
    {
      icon: 'fa-solid fa-mobile-screen',
      title: 'Responsive Design',
      text: 'Pixel-perfect across all screen sizes and devices.',
      delay: 3,
    },
    {
      icon: 'fa-solid fa-wand-magic-sparkles',
      title: 'Animations',
      text: 'Smooth transitions and micro-interactions that delight users.',
      delay: 4,
    },
  ];
}
