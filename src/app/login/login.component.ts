import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../clases/Usuario';
import { AuthServiceService } from '../servicios/auth-service.service';
import { DbService } from '../servicios/db.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public pw:string;
  public mail:string;
  public mostrarError = false;
  public error = "";

  constructor(private router: Router, private authService:AuthServiceService, private app:AppComponent, private db:DbService) { 
    this.pw = "";
    this.mail = "";
    
  }

  ngOnInit(): void {}

  Limpiar(){
    (<HTMLInputElement>document.getElementById("mail")).value = "";
    (<HTMLInputElement>document.getElementById("pw")).value = "";        
  }

  Loguearse(){
    this.mail = (<HTMLInputElement>document.getElementById("mail")).value;
    this.pw = (<HTMLInputElement>document.getElementById("pw")).value;
    if (this.pw != "" && this.mail != "")
    {
      (<HTMLInputElement>document.getElementById("mail")).style.border = "1px solid grey";
      (<HTMLInputElement>document.getElementById("pw")).style.border = "1px solid grey";
      var usuario = new Usuario(this.mail, this.pw);
      this.authService.signIn(usuario).then(()=>{}).catch(()=>{
        this.mostrarError = true;
        this.error = "¡El usuario no esta registrado!";
        setTimeout(() => {
          this.mostrarError = false;
          this.error = "";
        }, 3500);
      });
    }
    else{
      if (this.mail == ""){
        (<HTMLInputElement>document.getElementById("pw")).style.border = "1px solid grey";
        (<HTMLInputElement>document.getElementById("mail")).style.border = "1px solid red";
      }        
      else{
        (<HTMLInputElement>document.getElementById("mail")).style.border = "1px solid grey";
        (<HTMLInputElement>document.getElementById("pw")).style.border = "1px solid red";
      }
        
    }
    
  }

  Administrador(){
    (<HTMLInputElement>document.getElementById("mail")).value = "admin@admin.com";
    (<HTMLInputElement>document.getElementById("pw")).value = "admin";
  }

  Tester(){
    (<HTMLInputElement>document.getElementById("mail")).value = "tester@tester.com";
    (<HTMLInputElement>document.getElementById("pw")).value = "tester";
  }

  Lucas(){
    (<HTMLInputElement>document.getElementById("mail")).value = "lucas@lucas.com";
    (<HTMLInputElement>document.getElementById("pw")).value = "lucas";
  }

  UnBebe(){
    (<HTMLInputElement>document.getElementById("mail")).value = "unbebe@unbebe";
    (<HTMLInputElement>document.getElementById("pw")).value = "unbebe";
  }

  IrARegistro(){
    this.authService.mailAux = (<HTMLInputElement>document.getElementById("mail")).value;
    this.authService.pwAux = (<HTMLInputElement>document.getElementById("pw")).value;
    this.router.navigate(['registro']);
  }

}
