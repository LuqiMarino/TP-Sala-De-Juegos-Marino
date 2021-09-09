import { Component, OnInit } from '@angular/core';
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
  constructor(private app:AppComponent, private auth:AuthServiceService) {
    this.usuarioLogueado = this.auth.getUsuarioLogueado();
   }

  ngOnInit(): void {
    setTimeout(() => {
      this.app.RefrescarUsuarioLogueado();
    }, 0);
  }

}
