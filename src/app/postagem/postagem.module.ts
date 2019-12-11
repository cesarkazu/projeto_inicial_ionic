import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular';

import { PostagemPageRoutingModule } from './postagem-routing.module';

import { PostagemPage } from './postagem.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    PostagemPageRoutingModule
  ],
  declarations: [PostagemPage]
})
export class PostagemPageModule {}
