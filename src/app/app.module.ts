import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { QuiensoyComponent } from './quiensoy/quiensoy.component';
import { ErrorComponent } from './error/error.component';
import { AppRoutingModule } from './app-routing-module';
import { RegistroComponent } from './registro/registro.component';
import { environment } from 'src/environments/environment';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
//import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { MayorMenorComponent } from './juegos/mayor-menor/mayor-menor.component';
import { AhorcadoComponent } from './juegos/ahorcado/ahorcado.component';
import { PokerComponent } from './juegos/poker/poker.component';
import { PreguntadosComponent } from './juegos/preguntados/preguntados.component';
import { HttpClientModule } from '@angular/common/http';
import { RankingComponent } from './ranking/ranking.component';
import { ChatComponent } from './chat/chat.component';

const app = initializeApp(environment.firebaseConfig);
const db = getFirestore();

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    QuiensoyComponent,
    ErrorComponent,
    RegistroComponent,
    MayorMenorComponent,
    AhorcadoComponent,
    PokerComponent,
    PreguntadosComponent,
    RankingComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    //AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
