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
  public mostrarSpinner = false;

  constructor(private router: Router, private authService:AuthServiceService, private app:AppComponent, private db:DbService) { 
    this.pw = "";
    this.mail = "";
    
  }

  ngOnInit(): void {}

  Limpiar(){
    (<HTMLInputElement>document.getElementById("mail")).value = "";
    (<HTMLInputElement>document.getElementById("pw")).value = "";        
  }
  MostrarSpinner(){
    this.mostrarSpinner = true;
    (<HTMLInputElement>document.getElementById("principal")).style.opacity = "0.5";
    setTimeout(() => {
      this.mostrarSpinner = false;
      (<HTMLInputElement>document.getElementById("principal")).style.opacity = "1";
    }, 2100);
  }

  Loguearse(){
    this.mail = (<HTMLInputElement>document.getElementById("mail")).value;
    this.pw = (<HTMLInputElement>document.getElementById("pw")).value;
    if (this.pw != "" && this.mail != "")
    {
      (<HTMLInputElement>document.getElementById("mail")).style.border = "1px solid grey";
      (<HTMLInputElement>document.getElementById("pw")).style.border = "1px solid grey";
      this.MostrarSpinner();
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
    (<HTMLInputElement>document.getElementById("mail")).value = "unbebe@unbebe.com";
    (<HTMLInputElement>document.getElementById("pw")).value = "unbebe";
  }

  IrARegistro(){
    this.MostrarSpinner();
    setTimeout(() => {
      this.authService.mailAux = (<HTMLInputElement>document.getElementById("mail")).value;
      this.authService.pwAux = (<HTMLInputElement>document.getElementById("pw")).value;
      this.router.navigate(['registro']);
    }, 1000);
    
  }

}
