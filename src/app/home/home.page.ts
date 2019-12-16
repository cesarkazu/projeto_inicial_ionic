import { Component, OnInit } from '@angular/core';

import * as firebase from "firebase/app";
import "firebase/auth";

import { Bd } from '../services/bd.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public email: string
  public publicacoes: any

  constructor(
    private bd: Bd
  ){}

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.email = user.email;
        this.atualizarTimeLine();
      }
    });
  }

  public atualizarTimeLine(): void{
    this.bd.consultaPublicacoes(this.email)
      .then((publicacoes: any) => {
        this.publicacoes = publicacoes;
      });
  }
}