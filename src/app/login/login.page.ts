import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MenuController } from '@ionic/angular';

import { Autenticacao } from '../services/auth/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit, OnDestroy{

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  });

  constructor(
    private autenticacao: Autenticacao,
    private router: Router,
    public menuCtrl: MenuController
  ){}

  ngOnInit(){
    if(this.autenticacao.autenticado()){
      this.router.navigate(['/home']);
    }
  }

  ngOnDestroy(){}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewDidLeave(){
    this.formulario.reset();
  }

  public autenticar(): void{
    //console.log(this.formulario);
    if(this.formulario.value.email
      && this.formulario.value.senha){
      this.autenticacao.autenticar(
        this.formulario.value.email,
        this.formulario.value.senha
      );
    }
  }
}