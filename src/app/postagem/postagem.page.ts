import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import * as firebase from "firebase/app";
import "firebase/auth";

import { Bd } from '../services/bd.service';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.page.html',
  styleUrls: ['./postagem.page.scss'],
})
export class PostagemPage implements OnInit {

  public email: string;

  public formulario: FormGroup = new FormGroup({
    titulo: new FormControl(null),
    descricao: new FormControl(null),
    url_img: new FormControl(null)
  })

  constructor(
    private bd: Bd
  ) { }

  ngOnInit(){
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })
  }

  ionViewDidLeave(){
    this.formulario.reset();
  }

  public publicar(): void{
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      descricao: this.formulario.value.descricao,
      url_img: this.formulario.value.url_img
    })
  }
}