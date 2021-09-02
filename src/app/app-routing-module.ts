import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuiensoyComponent } from './quiensoy/quiensoy.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [  
    { path: 'login', component: LoginComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'quiensoy', component: QuiensoyComponent },
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: 'error', pathMatch: 'full' }  
];


@NgModule({
  declarations: [], 
  imports:[RouterModule.forRoot(routes)], //CommonModule,
  exports: [RouterModule]
})

export class AppRoutingModule { }
