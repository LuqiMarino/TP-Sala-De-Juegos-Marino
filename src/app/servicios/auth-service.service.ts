import { Injectable } from '@angular/core';
//import { Auth } from 'firebase/auth';
import { Usuario } from './../clases/Usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private router:Router) { }

  public async signIn(usuario: Usuario){
    var mail = localStorage.getItem("mail");
    var contraseña = localStorage.getItem("contraseña");
    if (mail == usuario.mail && contraseña == usuario.contraseña){
      this.router.navigate(['home']);
    }
    // return this.auth.signIn(usuario.mail, usuario.contraseña); signInWithEmailAndPassword(usuario.mail, usuario.contraseña);
  }

  public async signOut(){
    localStorage.setItem("mail", "");
    localStorage.setItem("contraseña", "");
    // await this.auth.signOut();
  }

  public async register(usuario:Usuario){
    localStorage.setItem("mail", usuario.mail);
    localStorage.setItem("contraseña", usuario.contraseña);
    //return this.fireAuth.createUserWithEmailAndPassword(usuario.mail, usuario.contraseña);
  }

  public ValidaHayUsuarioLogueado(){
    var mail = localStorage.getItem("mail");
    if (mail == null || mail == "")
      return false;
    else
      return true;
  }

  public getUsuarioLogueado(){
    var mail = localStorage.getItem("mail") as string;
    var contraseña = localStorage.getItem("contraseña") as string;
    if (mail != null && contraseña != null)
      return new Usuario(mail, contraseña);
    else
      return new Usuario("", "");
    
  }
}
