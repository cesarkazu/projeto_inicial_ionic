import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { Autenticacao } from '../services/auth/autenticacao.service'

import { Usuario } from '../model/usuario.model'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss']
})
export class CadastroPage implements OnInit, OnDestroy {

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

  ngOnInit(){
    if(this.autenticacao.autenticado()){
      this.router.navigate(['/home']);
    }
  }

  ngOnDestroy(){}

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