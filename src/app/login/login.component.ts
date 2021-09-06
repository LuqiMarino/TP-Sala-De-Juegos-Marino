import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public pw:string;
  public mail:string;

  constructor(private router: Router) { 
    this.pw = "";
    this.mail = "";
  }

  ngOnInit(): void {
    
  }

  Limpiar(){
    (<HTMLInputElement>document.getElementById("mail")).value = "";
    (<HTMLInputElement>document.getElementById("pw")).value = "";
  }

  Loguearse(){
    this.mail = (<HTMLInputElement>document.getElementById("mail")).value;
    this.pw = (<HTMLInputElement>document.getElementById("pw")).value;
  }

  IrARegistro(){
    this.router.navigate(['registro']);
  }

}
