import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController } from '@ionic/angular';

import { timer } from 'rxjs';

import { Autenticacao } from '.././services/auth/autenticacao.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss']
})
export class SplashPage implements OnInit{

  constructor(
    private autenticacao: Autenticacao,
    private router: Router,
    public menuCtrl: MenuController
  ){}

  ngOnInit(){}

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }

  ionViewDidEnter(){
    const redirecionamento = timer(1000);
    if(this.autenticacao.autenticado()){
      redirecionamento.subscribe(x => this.router.navigate(['/home']));
    }
    else{
      redirecionamento.subscribe(x => this.router.navigate(['/login']));
    }
  }
}