import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';

import { Usuario } from '../model/usuario.model'

import { Autenticacao } from '../services/auth/autenticacao.service'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  providers: [ Autenticacao ]
})
export class CadastroPage implements OnInit {

  public formulario: FormGroup = new FormGroup({
    nome: new FormControl(null),
    email: new FormControl(null),
    senha: new FormControl(null),
    csenha: new FormControl(null)
  })

  constructor(
    private autenticacao: Autenticacao,
    private router: Router
  ) { }

  ngOnInit() {}

  OnDestroy() {
    this.formulario.reset()
  }
  
  public cadastrarUsuario(): void {
    if(this.formulario.value.nome
      && this.formulario.value.email
      && this.formulario.value.senha){
      //console.log(this.formulario)

      let usuario: Usuario = new Usuario(
        this.formulario.value.nome,
        this.formulario.value.email,
        this.formulario.value.senha
      )

      this.autenticacao.cadastrarUsuario(usuario)
    }
  }
}