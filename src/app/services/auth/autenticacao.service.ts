import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';

import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

import { Usuario } from '../../model/usuario.model';

@Injectable()
export class Autenticacao{

    public token_id: string;

    subject = new Subject<Object>();

    constructor(
        private router: Router,
        public alertController: AlertController
    ){}

    public cadastrarUsuario(usuario: Usuario): Promise<any>{
        //console.log('chegamos', usuario)

        return firebase.auth().createUserWithEmailAndPassword(
            usuario.email,
            usuario.senha
        )
            .then((resposta: any) => {

                //remover a senha do atributo senha do objeto usuário
                delete usuario.senha;

                //registrando dados complementares do usuário no path email na base64
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set({ usuario });
                this.router.navigate(['/login']);
            })
            .catch((erro: Error) => {
                this.presentAlertConfirm(erro['code'], erro['message']);
                //console.log(erro)
            })
    }

    public autenticar(email: string, senha: string): void{
        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((resposta: any) => {
            firebase.auth().currentUser.getIdToken()
                .then((idToken: string) => {
                    this.token_id = idToken;
                    localStorage.setItem('idToken', idToken);
                    this.subject.next();
                    this.router.navigate(['/home']);
                })
        })
        .catch((erro: Error) => {
            this.presentAlertConfirm(erro['code'], erro['message']);
            //console.log(erro);
        })
    }

    public autenticado(): boolean{
        if(this.token_id === undefined
            && localStorage.getItem('idToken') != null){
            this.token_id = localStorage.getItem('idToken');
        }

        if(this.token_id === undefined){
            //this.router.navigate(['/']);
        }
        
        return this.token_id !== undefined;
    }

    public autenticadoGuard(): boolean{
        if(this.token_id === undefined
            && localStorage.getItem('idToken') != null){
            this.token_id = localStorage.getItem('idToken');
        }

        if(this.token_id === undefined){
            this.router.navigate(['/']);
        }
        
        return this.token_id !== undefined;
    }

    public sair(): void {

        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('idToken');
                this.token_id = undefined;
                this.subject.next();
                this.router.navigate(['/']);
            })
    }

    async presentAlertConfirm(header:string, message: string) {
        const alert = await this.alertController.create({
          header: header.toUpperCase(),
          message: message,
          buttons: [
            {
              text: 'Try again',
              handler: () => {
                //console.log('Confirm Okay');
              }
            }
          ]
        });
    
        await alert.present();
    }
}