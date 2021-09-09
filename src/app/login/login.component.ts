import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../clases/Usuario';
import { AuthServiceService } from '../servicios/auth-service.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public pw:string;
  public mail:string;

  constructor(private router: Router, private authService:AuthServiceService, private app:AppComponent) { 
    this.pw = "";
    this.mail = "";
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.app.RefrescarUsuarioLogueado();  
    }, 0);
    
  }

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
      this.authService.register(usuario);    
      this.authService.signIn(usuario);
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

  IrARegistro(){
    //this.router.navigate(['registro']);
  }

}
