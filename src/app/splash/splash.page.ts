import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

import { Autenticacao } from '.././services/auth/autenticacao.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit{

  constructor(
    private autenticacao: Autenticacao,
    private router: Router
  ){}

  ngOnInit(){}

  ionViewDidEnter(){
    if(this.autenticacao.autenticado()){
      const numbers = timer(1000);
      numbers.subscribe(x => this.router.navigate(['/home']));
    }
    else{
      const numbers = timer(1000);
      numbers.subscribe(x => this.router.navigate(['/login']));
    }
  }
}