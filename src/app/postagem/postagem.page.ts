import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { MenuController } from '@ionic/angular';

import * as firebase from "firebase/app";
import "firebase/auth";

import { Bd } from '../services/bd.service';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.page.html',
  styleUrls: ['./postagem.page.scss'],
})
export class PostagemPage implements OnInit, OnDestroy {

  public email: string;

  public formulario: FormGroup = new FormGroup({
    titulo: new FormControl(null),
    descricao: new FormControl(null),
    url_img: new FormControl(null)
  });

  constructor(
    private bd: Bd,
    public menuCtrl: MenuController
  ){}

  ngOnInit(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.email = user.email;
      }
    })
  }

  ngOnDestroy(){}

  ionViewWillEnter(){
    this.menuCtrl.enable(true);
  }

  ionViewDidLeave(){
    this.formulario.reset();
  }

  public publicar(): void{
    //console.log(this.formulario);
    if(this.email
      && this.formulario.value.titulo
      && this.formulario.value.descricao
      && this.formulario.value.url_img){
      this.bd.publicar({
        email: this.email,
        titulo: this.formulario.value.titulo,
        descricao: this.formulario.value.descricao,
        url_img: this.formulario.value.url_img
      });
    }
  }
}