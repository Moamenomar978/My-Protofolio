import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Home } from '../../components/home/home';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [Navbar, Home],
  templateUrl: './home-page.html',
})
export class HomePage {}
