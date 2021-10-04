import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../clases/Usuario';
import { AuthServiceService } from '../servicios/auth-service.service';
import { DbService } from '../servicios/db.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public alias:string;
  public pw:string;
  public mail:string;
  public mostrarError = false;
  public error = "";

  constructor(private router: Router, private authService:AuthServiceService, private app:AppComponent, private db:DbService) { 
    this.pw = "";
    this.mail = "";
    this.alias = "";
  }

  ngOnInit(): void {  
    setTimeout(() => {
      if (this.authService.mailAux != null){
        (<HTMLInputElement>document.getElementById("mail")).value = this.authService.mailAux;
        this.mail = this.authService.mailAux;  
      }
      if (this.authService.pwAux != null){
        (<HTMLInputElement>document.getElementById("pw")).value = this.authService.pwAux;
        this.pw = this.authService.pwAux;
      }  
    }, 0);
  }

  Limpiar(){
    (<HTMLInputElement>document.getElementById("mail")).value = "";
    (<HTMLInputElement>document.getElementById("pw")).value = "";
    (<HTMLInputElement>document.getElementById("alias")).value = "";
  }

  Registrarse(){
    this.mail = (<HTMLInputElement>document.getElementById("mail")).value;
    this.pw = (<HTMLInputElement>document.getElementById("pw")).value;
    this.alias = (<HTMLInputElement>document.getElementById("alias")).value;
    if (this.pw != "" && this.mail != "" && this.alias != "")
    {      
      (<HTMLInputElement>document.getElementById("mail")).style.border = "1px solid grey";
      (<HTMLInputElement>document.getElementById("pw")).style.border = "1px solid grey";
      (<HTMLInputElement>document.getElementById("alias")).style.border = "1px solid grey";
      var usuario = new Usuario(this.mail, this.pw, this.alias);
      this.db.validarUsuarioRegistrado(usuario)
        .then(()=>{          
            this.mostrarError = true;
            this.error = "¡El usuario ya se encuentra registrado!";
            setTimeout(() => {
              this.mostrarError = false;
              this.error = "";
            }, 3500);
          
        })
        .catch(()=>{
          this.db.agregarUsuario(usuario).then(()=>{
          this.authService.signIn(usuario);
        });
      });
      
      
    }
    else{
      if (this.mail == ""){
        (<HTMLInputElement>document.getElementById("mail")).style.border = "1px solid red";
      }        
      if (this.pw == ""){
        (<HTMLInputElement>document.getElementById("pw")).style.border = "1px solid red";
      }
      if (this.alias == ""){
        (<HTMLInputElement>document.getElementById("alias")).style.border = "1px solid red";
      }
        
    }
    
  }

  IrALogin(){
    this.router.navigate(['']);
  }

}
