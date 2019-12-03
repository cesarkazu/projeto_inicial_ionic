import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { AlertController } from '@ionic/angular';

import { Autenticacao } from '../services/auth/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [ Autenticacao ]
})
export class LoginPage implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  })

  constructor(
    private autenticacao: Autenticacao,
    public alertController: AlertController
  ) { }

  ngOnInit() {}

  public autenticar(): void{
    this.autenticacao.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha
    )
  }
}