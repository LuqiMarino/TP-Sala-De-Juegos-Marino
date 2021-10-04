import { Injectable } from '@angular/core';
//import { Auth } from 'firebase/auth';
import { Usuario } from './../clases/Usuario';
import { Router } from '@angular/router';
import { DbService } from './db.service'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public mailAux?:string;
  public pwAux?:string;

  constructor(private router:Router, private db:DbService) { }


  public async signIn(usuario: Usuario){

    return new Promise((resolve,reject)=>{
      this.db.validarUsuarioRegistrado(usuario).then((data) => {
        var str = JSON.stringify(data);
        var json = JSON.parse(str);
        var user = new Usuario(json["mail"], json["password"], json["alias"]);
        var estaRegistrado = user.mail.length > 0 && user.password.length > 0 && user.alias.length > 0
        if (estaRegistrado){
          this.db.usuarioLogueado = user;
          this.db.grabarLogUsuario(user);
          resolve(true);
          this.router.navigate(['home']);          
        }
      }).catch((err) =>{
        reject(err);
      });
      

    });
    
    
  }

  public async signOut(){
    this.db.usuarioLogueado = new Usuario("", "");
  }

  public async register(usuario:Usuario){
    this.db.validarUsuarioRegistrado(usuario).then((estaRegistrado) => {
      if (!estaRegistrado)
        this.db.agregarUsuario(usuario);
      // else
      //   MOSTRAR ERROR
    });
    
  }

  public getUsuarioLogueado(){
    var mail = this.db.usuarioLogueado.mail;
    var contraseña = this.db.usuarioLogueado.password;
    var alias = this.db.usuarioLogueado.alias;
    if (mail != "" && contraseña != "")
      return new Usuario(mail, contraseña, alias);
    else
      return new Usuario("", "");
  }
}
