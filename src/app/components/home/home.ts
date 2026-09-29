import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AboutAs } from '../about-as/about-as';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { ContactService } from '../../core/services/contact.service';
import { Project, ProjectCategory, Skill } from '../../core/models/portfolio.models';

interface DotStyle {
  width: string;
  height: string;
  left: string;
  animationDuration: string;
  animationDelay: string;
  opacity: string;
}

interface Stat {
  target: number;
  label: string;
  value: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AboutAs, RevealDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  /* ---------- Hero ---------- */
  private readonly typingWords = ['Frontend Developer', 'Web Designer', 'UI Creator', 'Freelancer'];
  typingText = '';
  private typingTimer?: ReturnType<typeof setTimeout>;

  heroDots: DotStyle[] = [];

  stats: Stat[] = [
    { target: 10, label: 'Projects Done', value: 0 },
    { target: 8, label: 'Happy Clients', value: 0 },
    { target: 2, label: 'Years Exp.', value: 0 },
  ];
  private statsAnimated = false;
  @ViewChild('statsRow') statsRow?: ElementRef<HTMLElement>;

  /* ---------- Skills ---------- */
  readonly skillRings: Skill[] = [
    { name: 'HTML5', percent: 95 },
    { name: 'CSS3', percent: 90 },
    { name: 'JavaScript', percent: 80 },
    { name: 'Responsive', percent: 92 },
    { name: 'UI Design', percent: 85 },
    { name: 'Git / GitHub', percent: 75 },
  ];
  private ringsAnimated = false;
  @ViewChildren('ringFill') ringFillEls!: QueryList<ElementRef<SVGCircleElement>>;

  readonly tools = [
    { icon: 'fa-brands fa-git-alt', label: 'Git' },
    { icon: 'fa-brands fa-github', label: 'GitHub' },
    { icon: 'fa-solid fa-code', label: 'VS Code' },
    { icon: 'fa-brands fa-html5', label: 'HTML5' },
    { icon: 'fa-brands fa-css3-alt', label: 'CSS3' },
    { icon: 'fa-brands fa-js', label: 'JavaScript' },
    { icon: 'fa-solid fa-layer-group', label: 'Flexbox' },
    { icon: 'fa-solid fa-table-cells', label: 'CSS Grid' },
    { icon: 'fa-solid fa-mobile-screen', label: 'Media Queries' },
    { icon: 'fa-solid fa-pen-nib', label: 'Figma' },
  ];

  readonly softSkills = [
    'Problem Solving',
    'Attention to Detail',
    'Fast Learner',
    'Team Collaboration',
    'Time Management',
    'Communication',
  ];

  /* ---------- Projects ---------- */
  readonly projects: Project[] = [
    {
      image: 'project1.png',
      title: 'Eduplatform Website',
      description:
        'A modern, fully responsive education landing page featuring smooth animations and a clean professional layout built with pure HTML & CSS.',
      tags: ['Landing Page', 'Education'],
      category: 'landing',
      liveUrl: 'https://moamenomar978.github.io/Eduplatform-landing/',
    },
    {
      image: 'project2.png',
      title: 'LUXE Store',
      description:
        'A premium e-commerce UI for a luxury fashion store, featuring product galleries, cart interactions, and an elegant dark aesthetic.',
      tags: ['E-Commerce', 'Fashion'],
      category: 'ecommerce',
      liveUrl: 'https://moamenomar978.github.io/LUXE-STORE/',
    },
    {
      image: 'project3.png',
      title: 'Volt Tech Store',
      description:
        'A sleek electronics e-commerce front-end with product filtering, interactive cart, and a bold modern visual identity.',
      tags: ['E-Commerce', 'Tech'],
      category: 'ecommerce',
      liveUrl: 'https://moamenomar978.github.io/volt-techstore/',
    },
    {
      image: 'project4.png',
      title: 'Cafe-Manager',
      description:
        'Complete Point-of-Sale & Business Management System for Cafes, Restaurants, Bakeries, and Retail Stores — runs directly in the browser, no installation needed.',
      tags: ['E-Commerce', 'Tech'],
      category: 'ecommerce',
      liveUrl: 'https://moamenomar978.github.io/Cafe-Manager/',
    },
    {
      image: 'project5.png',
      title: 'Lara-Beauty',
      description:
        'An integrated online appointment booking system for beauty centers and small clinics (booking + management panel + cloud database).',
      tags: ['E-Commerce', 'Tech'],
      category: 'ecommerce',
      liveUrl: 'https://moamenomar978.github.io/lara-beauty/#/home',
    },
    {
      image: '',
      title: 'This Portfolio',
      description:
        "The very site you're viewing — designed and coded from scratch with scroll animations, theme toggling, and a fully responsive layout, now rebuilt in Angular.",
      tags: ['Portfolio', 'Personal'],
      category: 'portfolio',
      isCurrentSite: true,
    },
  ];

  readonly filters: { key: ProjectCategory; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'ecommerce', label: 'E-Commerce' },
    { key: 'landing', label: 'Landing Page' },
    { key: 'portfolio', label: 'Portfolio' },
  ];
  activeFilter: ProjectCategory = 'all';

  get filteredProjects(): Project[] {
    return this.activeFilter === 'all'
      ? this.projects
      : this.projects.filter((p) => p.category === this.activeFilter);
  }

  setFilter(filter: ProjectCategory): void {
    this.activeFilter = filter;
  }

  /* ---------- Contact form ---------- */
  private fb = inject(FormBuilder);
  private contact = inject(ContactService);

  contactForm = this.fb.group({
    from_name: ['', [Validators.required, Validators.minLength(2)]],
    reply_to: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
    project_type: [''],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
  });

  submitting = false;
  submitted = false;
  formError = '';

  readonly projectTypes = [
    'Frontend Development',
    'Landing Page',
    'UI Design',
    'Website Redesign',
    'Portfolio Website',
    'Other',
  ];

  get messageLength(): number {
    return this.contactForm.get('message')?.value?.length ?? 0;
  }

  ngOnInit(): void {
    this.heroDots = Array.from({ length: 22 }, () => {
      const size = Math.random() * 4 + 2;
      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 12 + 8}s`,
        animationDelay: `${Math.random() * 10}s`,
        opacity: `${Math.random() * 0.5 + 0.1}`,
      };
    });

    this.startTyping();
  }

  ngAfterViewInit(): void {
    // Handle content already in view on first paint (e.g. small screens).
    this.animateStats();
    this.animateRings();
  }

  ngOnDestroy(): void {
    if (this.typingTimer) clearTimeout(this.typingTimer);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.animateStats();
    this.animateRings();
  }

  private startTyping(): void {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const word = this.typingWords[wordIndex];
      charIndex = deleting ? charIndex - 1 : charIndex + 1;
      this.typingText = word.substring(0, charIndex);

      if (!deleting && charIndex === word.length) {
        deleting = true;
        this.typingTimer = setTimeout(type, 1400);
        return;
      }
      if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % this.typingWords.length;
      }
      this.typingTimer = setTimeout(type, deleting ? 55 : 110);
    };

    type();
  }

  private animateStats(): void {
    if (this.statsAnimated || !this.statsRow) return;
    const rect = this.statsRow.nativeElement.getBoundingClientRect();
    if (rect.top >= window.innerHeight - 80) return;

    this.statsAnimated = true;
    this.stats.forEach((stat) => {
      const step = Math.ceil(stat.target / 40);
      const interval = setInterval(() => {
        stat.value = Math.min(stat.value + step, stat.target);
        if (stat.value >= stat.target) clearInterval(interval);
      }, 40);
    });
  }

  private animateRings(): void {
    if (this.ringsAnimated || !this.ringFillEls?.length) return;
    const first = this.ringFillEls.first?.nativeElement;
    if (!first) return;
    const rect = first.getBoundingClientRect();
    if (rect.top >= window.innerHeight - 60) return;

    this.ringsAnimated = true;
    const circumference = 2 * Math.PI * 35;
    this.ringFillEls.forEach((ref, i) => {
      const pct = this.skillRings[i].percent;
      const offset = circumference * (1 - pct / 100);
      const el = ref.nativeElement;
      el.style.strokeDasharray = `${circumference}`;
      el.style.strokeDashoffset = `${circumference}`;
      requestAnimationFrame(() => {
        el.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)';
        el.style.strokeDashoffset = `${offset}`;
      });
    });
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.formError = '';
    try {
      await this.contact.submit(this.contactForm.getRawValue() as any);
      this.submitted = true;
    } catch (err) {
      console.error('Contact form error:', err);
      this.formError = "Couldn't send right now. Please email me at moamenfathy279@gmail.com";
    } finally {
      this.submitting = false;
    }
  }

  sendAnother(): void {
    this.submitted = false;
    this.contactForm.reset({ from_name: '', reply_to: '', project_type: '', message: '' });
  }
}
