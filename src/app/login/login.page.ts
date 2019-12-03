import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { AlertController } from '@ionic/angular';

import { Autenticacao } from '../services/auth/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit, OnDestroy {

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  })

  constructor(
    private autenticacao: Autenticacao,
    public alertController: AlertController
  ) { }

  ngOnInit() {}

  ngOnDestroy() {
    this.formulario.reset()
  }

  public autenticar(): void{
    if(this.formulario.value.email
      && this.formulario.value.senha){
        this.autenticacao.autenticar(
          this.formulario.value.email,
          this.formulario.value.senha
        )
      }
  }
}