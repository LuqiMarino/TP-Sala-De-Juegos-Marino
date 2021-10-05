import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuiensoyComponent } from './quiensoy/quiensoy.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { MayorMenorComponent } from './juegos/mayor-menor/mayor-menor.component';
import { AhorcadoComponent } from './juegos/ahorcado/ahorcado.component';
import { PokerComponent } from './juegos/poker/poker.component'
import { GuardGuard } from './servicios/guard.guard'
import { PreguntadosComponent } from './juegos/preguntados/preguntados.component';
import { RankingComponent } from './ranking/ranking.component';
const routes: Routes = [  
    { path: 'quiensoy', component: QuiensoyComponent,},
    { path: 'home', component: HomeComponent },
    { path: '', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'mayormenor', component: MayorMenorComponent, canActivate: [GuardGuard]  },
    { path: 'ahorcado', component: AhorcadoComponent },
    { path: 'poker', component: PokerComponent },
    { path: 'preguntados', component: PreguntadosComponent },
    { path: 'ranking', component: RankingComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];


@NgModule({
  declarations: [], 
  imports:[RouterModule.forRoot(routes)], //CommonModule,
  exports: [RouterModule]
})

export class AppRoutingModule { }
