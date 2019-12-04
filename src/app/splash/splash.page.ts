import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage {

  constructor(
    private router: Router
  ) { }

  ionViewWillEnter(){
    const numbers = timer(1000);
    numbers.subscribe(x => this.router.navigate(['/login']));
  }
}