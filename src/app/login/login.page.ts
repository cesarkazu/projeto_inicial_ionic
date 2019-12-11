import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Autenticacao } from '../services/auth/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit{

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  })

  constructor(
    private autenticacao: Autenticacao
  ) { }

  ngOnInit(){}

  ionViewDidLeave(){
    this.formulario.reset();
  }

  public autenticar(): void{
    //console.log(this.formulario)
    if(this.formulario.value.email
      && this.formulario.value.senha){
        this.autenticacao.autenticar(
          this.formulario.value.email,
          this.formulario.value.senha
        )
      }
  }
}