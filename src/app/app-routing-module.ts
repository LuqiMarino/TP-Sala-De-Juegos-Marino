import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuiensoyComponent } from './quiensoy/quiensoy.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { MayorMenorComponent } from './juegos/mayor-menor/mayor-menor.component';
import { AhorcadoComponent } from './juegos/ahorcado/ahorcado.component';
import { PokerComponent } from './juegos/poker/poker.component'
const routes: Routes = [  
    { path: 'login', component: LoginComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'quiensoy', component: QuiensoyComponent },
    { path: 'home', component: HomeComponent },
    { path: '', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'mayormenor', component: MayorMenorComponent },
    { path: 'ahorcado', component: AhorcadoComponent },
    { path: 'poker', component: PokerComponent },
    { path: '**', redirectTo: 'error', pathMatch: 'full' }
];


@NgModule({
  declarations: [], 
  imports:[RouterModule.forRoot(routes)], //CommonModule,
  exports: [RouterModule]
})

export class AppRoutingModule { }
