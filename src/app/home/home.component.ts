import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Usuario } from '../clases/Usuario';
import { AuthServiceService } from './../servicios/auth-service.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuarioLogueado:Usuario = new Usuario("", "");
  constructor(private app:AppComponent, private auth:AuthServiceService, private router: Router) {
    this.usuarioLogueado = this.auth.getUsuarioLogueado();
   }

  ngOnInit(): void {
    this.app.RefrescarUsuarioLogueado();
  }

  AbrirMayorMenor(){
    this.router.navigate(['mayormenor']);
  }

  AbrirAhorcado(){
    this.router.navigate(['ahorcado']);
  }
  
  AbrirPoker(){
    this.router.navigate(['poker']);
  }

  AbrirPreguntados(){
    this.router.navigate(['preguntados']);
  }

  IrARanking(){
    this.router.navigate(['ranking']);
  }

  IrAChat(){
    this.router.navigate(['chat']);
  }

}
