import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { ServiceOffer } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, RouterLink, Navbar, RevealDirective],
  templateUrl: './services-page.html',
  styleUrl: './services-page.css',
})
export class ServicesPage {
  readonly services: ServiceOffer[] = [
    {
      icon: 'fa-solid fa-code',
      title: 'Frontend Development',
      description:
        'Building modern, fast, and fully responsive websites from scratch using HTML5, CSS3, and vanilla JavaScript.',
      features: ['Responsive on all devices', 'Clean & organized code', 'Cross-browser compatible', 'Smooth animations'],
      priceFrom: '$50',
    },
    {
      icon: 'fa-solid fa-palette',
      title: 'UI Design',
      description: 'Designing clean, modern, user-centric interfaces with strong visual hierarchy and outstanding UX.',
      features: ['Wireframes & mockups', 'Figma design files', 'Color & typography system', 'Interactive prototypes'],
      priceFrom: '$40',
    },
    {
      icon: 'fa-solid fa-mobile-screen',
      title: 'Landing Pages',
      description: 'High-converting, visually stunning landing pages that capture attention and turn visitors into clients.',
      features: ['Fast loading speed', 'SEO-friendly structure', 'Contact form integration', 'Fully responsive'],
      priceFrom: '$35',
    },
    {
      icon: 'fa-solid fa-brush',
      title: 'Website Redesign',
      description: 'Revamping outdated websites into modern, professional designs with improved usability and performance.',
      features: ['Modern visual upgrade', 'Improved UX flow', 'Mobile optimization', 'Performance boost'],
      priceFrom: '$60',
    },
    {
      icon: 'fa-solid fa-store',
      title: 'Portfolio Website',
      description: 'A professional personal portfolio to help you stand out and showcase your work to potential clients and employers.',
      features: ['Custom design', 'Projects showcase', 'Contact section', 'Dark / Light mode'],
      priceFrom: '$45',
    },
    {
      icon: 'fa-solid fa-bug',
      title: 'Bug Fixing & Support',
      description: 'Fixing issues in existing websites, improving code quality, and providing ongoing maintenance and technical support.',
      features: ['CSS & layout fixes', 'JavaScript debugging', 'Cross-browser fixes', 'Code cleanup'],
      priceFrom: '$20',
    },
  ];
}
