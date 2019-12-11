import { Injectable } from '@angular/core'
import { Router } from '@angular/router';
import * as firebase from "firebase/app";

import "firebase/database";
import "firebase/storage";

@Injectable()
export class Bd{

    constructor(
        private router: Router
    ){}

    public publicar(publicacao: any): void {

        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({
                titulo: publicacao.titulo,
                descricao: publicacao.descricao,
                url_img: publicacao.url_img
            })
            .then((resposta: any) => {
                //console.log(resposta);
                //console.log(resposta.key);
                this.router.navigate(['/home']);
            })
    }

    public consultaPublicacoes(emailUsuario: string): Promise<any>{
        
        return new Promise((resolve, reject) => {
            //consultar as publicações (database)
            firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
                .orderByKey()
                .once('value')
                .then((snapshot: any) => {
                    //console.log(snapshot.val())

                    let publicacoes: Array<any> = []

                    snapshot.forEach((childSnapshot: any) => {

                        let publicacao = childSnapshot.val()
                        publicacao.key = childSnapshot.key

                        publicacoes.push(publicacao)
                    })
                    //console.log(publicacoes)
                    //resolve(publicacoes)

                    //return publicacoes.reverse()
                    resolve(publicacoes.reverse())
                })
                /* .then((publicacoes: any) => {

                    publicacoes.forEach((publicacao) =>{
                        //consultar a url da imagem (storage)
                        firebase.storage().ref()
                        .child(`imagens/${publicacao.key}`)
                        .getDownloadURL()
                        .then((url: string) => {

                            publicacao.url_imagem = url

                            //consultar o nome do usuário
                            firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                                .once('value')
                                .then((snapshot: any) => {
                                    
                                    publicacao.nome_usuario = snapshot.val().usuario.nome_usuario
                                })
                        })
                    })

                    resolve(publicacoes)
                    
                }) */
        })
    }
}