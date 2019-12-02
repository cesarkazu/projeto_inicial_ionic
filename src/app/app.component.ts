import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase/app";

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Login',
      url: '/login',
      icon: ''
    },
    {
      title: 'Cadastro',
      url: '/cadastro',
      icon: ''
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit(): void{

    var firebaseConfig = {
      apiKey: "AIzaSyAk12MhdPHNcvwi6pTzc0_aaH-38kjdIG4",
      authDomain: "flow-cbc81.firebaseapp.com",
      databaseURL: "https://flow-cbc81.firebaseio.com",
      projectId: "flow-cbc81",
      storageBucket: "flow-cbc81.appspot.com",
      messagingSenderId: "1097226443018",
      appId: "1:1097226443018:web:39b0dec393a4586bb5c2f3",
      measurementId: "G-QYNCHGMW1W"
    };

    firebase.initializeApp(firebaseConfig)
  }
}
