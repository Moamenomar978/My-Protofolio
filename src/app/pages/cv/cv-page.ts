import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { CvEducation, CvExperience, Skill } from '../../core/models/portfolio.models';

interface LangLevel {
  name: string;
  dots: boolean[];
  label: string;
}

@Component({
  selector: 'app-cv-page',
  standalone: true,
  imports: [CommonModule, RouterLink, Navbar, RevealDirective],
  templateUrl: './cv-page.html',
  styleUrl: './cv-page.css',
})
export class CvPage implements AfterViewInit {
  readonly education: CvEducation[] = [
    {
      period: '2022 – Present',
      title: "Bachelor's Degree in Computer Science",
      subtitle: 'Faculty of Computer Science',
      description:
        'Studying software engineering, web development, data structures, algorithms, and databases with a strong focus on practical projects and real-world problem solving.',
    },
  ];

  readonly experience: CvExperience[] = [
    {
      period: '2023 – Present',
      title: 'Freelance Frontend Developer',
      subtitle: 'Self-Employed',
      description:
        'Designing and building responsive websites and landing pages for clients using HTML, CSS, and JavaScript. Focused on clean code, modern UI, and delivering on-time results that exceed client expectations.',
    },
  ];

  readonly languages: LangLevel[] = [
    { name: 'Arabic', dots: [true, true, true, true, true], label: 'Native' },
    { name: 'English', dots: [true, true, true, true, false], label: 'Professional' },
  ];

  readonly technicalSkills: Skill[] = [
    { name: 'HTML5', percent: 95 },
    { name: 'CSS3', percent: 90 },
    { name: 'JavaScript', percent: 80 },
    { name: 'Responsive Design', percent: 92 },
    { name: 'UI Design', percent: 85 },
    { name: 'Git / GitHub', percent: 75 },
  ];

  readonly tools = [
    { icon: 'fa-brands fa-git-alt', label: 'Git' },
    { icon: 'fa-brands fa-github', label: 'GitHub' },
    { icon: 'fa-solid fa-code', label: 'VS Code' },
    { icon: 'fa-solid fa-pen-nib', label: 'Figma' },
    { icon: 'fa-brands fa-html5', label: 'HTML5' },
    { icon: 'fa-brands fa-css3-alt', label: 'CSS3' },
  ];

  readonly softSkills = [
    'Problem Solving',
    'Attention to Detail',
    'Fast Learner',
    'Team Work',
    'Communication',
    'Time Management',
  ];

  private barsAnimated = false;
  @ViewChildren('skillBar') skillBarEls!: QueryList<ElementRef<HTMLElement>>;

  ngAfterViewInit(): void {
    this.animateBars();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.animateBars();
  }

  private animateBars(): void {
    if (this.barsAnimated || !this.skillBarEls?.length) return;
    const first = this.skillBarEls.first.nativeElement;
    const rect = first.getBoundingClientRect();
    if (rect.top >= window.innerHeight - 60) return;

    this.barsAnimated = true;
    this.skillBarEls.forEach((ref, i) => {
      ref.nativeElement.style.width = `${this.technicalSkills[i].percent}%`;
    });
  }

  downloadPdf(): void {
    window.print();
  }
}
