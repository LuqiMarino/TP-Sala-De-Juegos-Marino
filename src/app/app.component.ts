import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { textChangeRangeIsUnchanged } from 'typescript';
import { AuthServiceService } from './servicios/auth-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SalaDeJuegosLucasMarino';
  hayUsuarioLogueado:boolean = false;
  constructor(private router: Router, private auth:AuthServiceService){ }

  IrALogin(){
    this.auth.signOut();
    this.router.navigate(['login']);
  }

  IrAHome(){
    this.router.navigate(['home']);
  }

  IrAQuienSoy(){
    this.router.navigate(['quiensoy']);
  }

  RefrescarUsuarioLogueado(){
    this.hayUsuarioLogueado = this.auth.getUsuarioLogueado().mail != "";
  }
}
