import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';

import { Usuario } from '../model/usuario.model'

import { Autenticacao } from '../services/auth/autenticacao.service'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss']
})
export class CadastroPage {

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

  ionViewDidLeave(){
    this.formulario.reset();
  }
  
  public cadastrarUsuario(): void {
    //console.log(this.formulario)
    if(this.formulario.value.nome
      && this.formulario.value.email
      && this.formulario.value.senha
      && this.formulario.value.csenha){

      let usuario: Usuario = new Usuario(
        this.formulario.value.nome,
        this.formulario.value.email,
        this.formulario.value.senha
      )
      this.autenticacao.cadastrarUsuario(usuario)
    }
  }
}