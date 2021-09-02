import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SalaDeJuegosLucasMarino';

  constructor(private router: Router){ }

  IrALogin(){
    this.router.navigate(['login']);
  }

  IrAHome(){
    this.router.navigate(['home']);
  }

  IrAQuienSoy(){
    this.router.navigate(['quiensoy']);
  }
}
